import prismaClient from "@majoexe/database";
import { getGuild, getGuildPreview, getGuildFromMemberGuilds } from "@majoexe/util/functions/guild";
import { fillMissingDates, sumArray } from "@majoexe/util/functions/util";
import clsx from "clsx";
import { getSession } from "lib/session";
import Link from "next/link";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { Block } from "@/components/Block";
import { CategoryBar } from "@/components/CategoryBar";
import { Leaderboard } from "@/components/client/lists/Leaderboard";
import Image from "@/components/client/shared/Image";
import { SparkLineChart } from "@/components/client/shared/SparkChart";
import { Tooltip } from "@/components/client/shared/Tooltip";
import Header, { headerVariants } from "@/components/Headers";
import { Icons, iconVariants } from "@/components/Icons";
import { buttonVariants } from "@/components/Buttons";
import { twMerge } from "tailwind-merge";

export const metadata = {
 title: "Server Overview",
 description: "View the overview of your server.",
};

export default async function Page(props: { params: Promise<{ server: string }> }) {
 const params = await props.params;
 const session = await getSession();
 if (!session || !session.access_token) redirect("/auth/login");

 const { server } = params;
 const serverDownload = await getGuild(server);
 if (!serverDownload || !serverDownload.bot) return notFound();
 const serverMember = await getGuildFromMemberGuilds(serverDownload.id, session.access_token);
 if (
  // prettier
  !serverMember ||
  !serverMember.permissions_names ||
  !serverMember.permissions_names.includes("ManageGuild") ||
  !serverMember.permissions_names.includes("Administrator")
 )
  return notFound();
 const guildPreview = await getGuildPreview(serverDownload.id);
 if (!guildPreview) return notFound();

 const guild = await prismaClient.guild.upsert({
  where: {
   guildId: serverDownload.id,
  },
  update: {},
  create: {
   guildId: serverDownload.id,
  },
  include: {
   guildXp: {
    orderBy: {
     xp: "desc",
    },
    take: 5,
    include: {
     user: {
      select: {
       discordId: true,
       global_name: true,
       name: true,
       avatar: true,
       discriminator: true,
      },
     },
    },
   },
   autoMod: true,
   guildJoin: {
    where: {
     date: {
      gte: new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000),
     },
    },
   },
   guildLeave: {
    where: {
     date: {
      gte: new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000),
     },
    },
   },
   guildMessage: {
    where: {
     date: {
      gte: new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000),
     },
    },
   },
  },
 });

 const data =
  guild.guildXp?.map((x, i) => {
   return {
    id: i + 1,
    user: x.user,
    xp: x.xp,
    level: Math.floor(0.1 * Math.sqrt(x.xp || 0)),
   };
  }) || [];

 let guildScore = 0;

 if (guild.autoMod && guild.autoMod.length > 0) guildScore += 25;
 if (guild.enableXP) guildScore += 25;
 if (guild.publicPage) guildScore += 25;
 if (guild.vanity) guildScore += 25;

 const mapGuildData = (data: any[], key: string) =>
  data.map((item) => ({
   date: item.date.toISOString().split("T")[0],
   [key]: item[key.toLowerCase()],
  }));

 const guildJoin = mapGuildData(guild.guildJoin, "Joins");
 const guildLeave = mapGuildData(guild.guildLeave, "Leaves");
 const guildMessage = mapGuildData(guild.guildMessage, "Messages");

 const guildJoinData = fillMissingDates(guildJoin, "Joins");
 const guildLeaveData = fillMissingDates(guildLeave, "Leaves");
 const guildMessageData = fillMissingDates(guildMessage, "Messages");

 const newMembers = sumArray(guildJoin, "Joins");
 const membersLeft = sumArray(guildLeave, "Leaves");
 const newMessages = sumArray(guildMessage, "Messages");

 return (
  <>
   <div className="mb-4 flex flex-col items-center justify-normal gap-2 sm:flex-row">
    {guildPreview.icon ? <Image src={`https://cdn.discordapp.com/icons/${guildPreview.id}/${guildPreview.icon}.${guildPreview.icon.startsWith("a_") ? "gif" : "png"}`} alt={guildPreview.name} quality={95} width={64} height={64} className="size-16 shrink-0 rounded-full" /> : <div className="size-16 shrink-0 rounded-full bg-button-secondary" />}
    <div className="flex flex-col justify-center text-center sm:ml-4 sm:justify-start sm:text-left">
     <Header className={twMerge(headerVariants({ variant: "h1" }))}>{guildPreview.name || "Unnamed server"}</Header>
     <p className="text-center text-base md:text-xl opacity-60 sm:text-left">{guildPreview.description || "This server has no description, maybe you should add one?"}</p>
    </div>
   </div>

   <div className="mb-4 grid grid-cols-1 gap-0 md:grid-cols-1 md:gap-4 lg:grid-cols-2 xl:grid-cols-3">
    <Link href={`/dashboard/${serverDownload.id}/statistics`} className="mt-4 cursor-pointer overflow-auto rounded-lg border border-neutral-800 bg-background-secondary p-4">
     <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-4">
       <Icons.userAdd className={iconVariants({ variant: "extraLarge" })} />
       <div className="flex flex-col">
        <Header className={twMerge(headerVariants({ variant: "h4" }), "justify-start whitespace-nowrap")}>
         New members
         <span className="rounded-md bg-accent-primary px-2 text-sm font-normal text-white">+{newMembers}</span>
        </Header>
        <p className="text-sm text-gray-400">Amount of new members that joined your server in the last 7 days.</p>
       </div>
      </div>
      <div className="ml-2 flex flex-row items-center gap-4">
       <SparkLineChart data={guildJoinData} categories={["Joins"]} index="date" />
      </div>
     </div>
    </Link>

    <Link href={`/dashboard/${serverDownload.id}/statistics`} className="mt-4 cursor-pointer overflow-auto rounded-lg border border-neutral-800 bg-background-secondary p-4">
     <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-4">
       <Icons.commentAdd className={iconVariants({ variant: "extraLarge" })} />
       <div className="flex flex-col">
        <Header className={twMerge(headerVariants({ variant: "h4" }), "justify-start whitespace-nowrap")}>
         Messages sent
         <span className="rounded-md bg-accent-primary px-2 text-sm font-normal text-white">+{newMessages}</span>
        </Header>
        <p className="text-sm text-gray-400">Amount of messages that were sent in your server in the last 7 days.</p>
       </div>
      </div>
      <div className="ml-2 flex flex-row items-center gap-4">
       <SparkLineChart data={guildMessageData} categories={["Messages"]} index="date" />
      </div>
     </div>
    </Link>

    <Link href={`/dashboard/${serverDownload.id}/statistics`} className="mt-4 cursor-pointer overflow-auto rounded-lg border border-neutral-800 bg-background-secondary p-4">
     <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-4">
       <Icons.userMinus className={iconVariants({ variant: "extraLarge" })} />
       <div className="flex flex-col">
        <Header className={twMerge(headerVariants({ variant: "h4" }), "justify-start whitespace-nowrap")}>
         Members left
         <span className="rounded-md bg-accent-primary px-2 text-sm font-normal text-white">-{membersLeft}</span>
        </Header>
        <p className="text-sm text-gray-400">Amount of members that left your server in the last 7 days.</p>
       </div>
      </div>
      <div className="ml-2 flex flex-row items-center gap-4">
       <SparkLineChart data={guildLeaveData} categories={["Leaves"]} index="date" />
      </div>
     </div>
    </Link>
   </div>

   <div className="mt-6 block gap-6 lg:flex lg:items-start">
    <div className="flex flex-col justify-start gap-6 overflow-x-scroll [flex:3_1_0]">
     <Block>
      <Header className={twMerge(headerVariants({ variant: "h4", margin: "normal" }), "block")}>
       <span className="flex flex-row flex-wrap items-center gap-2">
        <Icons.Gauge className={iconVariants({ variant: "normal", className: "!stroke-2" })} />
        <span className="opacity-80">Server Score: </span>
        <span
         className={clsx({
          "text-rose-500": guildScore <= 10,
          "text-orange-500": guildScore > 10 && guildScore <= 30,
          "text-yellow-500": guildScore > 30 && guildScore <= 60,
          "text-emerald-500": guildScore > 60,
         })}
        >
         {guildScore}% ({guildScore <= 10 ? "Bad" : guildScore > 10 && guildScore <= 30 ? "Okay" : guildScore > 30 && guildScore <= 60 ? "Good" : guildScore > 60 && guildScore <= 90 ? "Great" : guildScore > 90 ? "Perfect!" : "Unknown"})
        </span>
       </span>
      </Header>

      {guildScore !== 100 ? <p className="text-left text-base opacity-60">Your server score is not 100%, this means that you are missing some features that could be useful for your server.</p> : <p className="text-left text-base opacity-60">Your server score is 100%, this means that you have all the features that could be useful to your server! Good job!</p>}

      <CategoryBar percent={guildScore} className="my-4" />

      {guildScore !== 100 && (
       <>
        <Header className={twMerge(headerVariants({ variant: "h4", margin: "wide" }), "items-start pt-4 justify-normal opacity-80")}>
         <Icons.Lightbulb className={iconVariants({ variant: "normal", className: "!stroke-2" })} />
         Ways to improve your score:
        </Header>
        <div className="mt-2 space-y-1">
         {(!guild.autoMod || guild.autoMod.length === 0) && (
          <div>
           <span className="gap-1 font-bold">
            <Icons.Minus className={iconVariants({ variant: "normal", className: "mr-1 inline !stroke-2" })} />
            Enable AutoMod:
           </span>{" "}
           <span className="font-normal text-gray-400">
            Enable AutoMod to protect your server from spam and other malicious content.{" "}
            <Link href={`/dashboard/${server}/automod`} className="text-accent-primary">
             Enable (+25% score)
            </Link>
           </span>
          </div>
         )}
         {!guild.enableXP && (
          <div>
           <span className="gap-1 font-bold">
            <Icons.Minus className={iconVariants({ variant: "normal", className: "mr-1 inline !stroke-2" })} />
            Enable XP:
           </span>{" "}
           <span className="font-normal text-gray-400">
            Enable XP to give your users a reason to chat.{" "}
            <Link href={`/dashboard/${server}/settings`} className="text-accent-primary">
             Enable (+25% score)
            </Link>
           </span>
          </div>
         )}
         {!guild.publicPage && (
          <div>
           <span className="gap-1 font-bold">
            <Icons.Minus className={iconVariants({ variant: "normal", className: "mr-1 inline !stroke-2" })} />
            Enable Public Page:
           </span>{" "}
           <span className="font-normal text-gray-400">
            Enable Public Page to show your server on the server list.{" "}
            <Link href={`/dashboard/${server}/settings`} className="text-accent-primary">
             Enable (+25% score)
            </Link>
           </span>
          </div>
         )}
         {!guild.vanity && (
          <div>
           <span className="gap-1 font-bold">
            <Icons.Minus className={iconVariants({ variant: "normal", className: "mr-1 inline !stroke-2" })} />
            Set Vanity URL:
           </span>{" "}
           <span className="font-normal text-gray-400">
            Set Vanity URL to give your server a custom URL.{" "}
            <Link href={`/dashboard/${server}/settings`} className="text-accent-primary">
             Enable (+25% score)
            </Link>
           </span>
          </div>
         )}
        </div>
       </>
      )}
     </Block>

     <Block className="scrollbar-show">
      <Header className={twMerge(headerVariants({ variant: "h4", margin: "wide" }), "items-start justify-normal opacity-80")}>Leaderboard</Header>
      {data.length > 0 ? <Leaderboard data={data} showSearch={false} showControls={false} /> : <span className="opacity-50">No users found. Maybe you should try talking in chat?</span>}
     </Block>
    </div>
    <div className="mt-6 flex flex-col justify-start gap-6 [flex:2_1_0%] lg:mt-0">
     <Block>
      <Header className={twMerge(headerVariants({ variant: "h4", margin: "wide" }), "items-start justify-normal opacity-80")}>
       Quick Stats
       {guild.publicPage ? (
        <Link href={`/server/${guild.vanity || serverDownload.id}`} target="_blank" rel="noreferrer noopener" className={twMerge(buttonVariants({ variant: "primary" }), "mx-auto font-normal w-fit !flex flex-row whitespace-nowrap text-base sm:ml-auto sm:mr-0")}>
         <Icons.ExternalLink className={iconVariants({ variant: "button" })} aria-hidden="true" role="img" />
         Server page
        </Link>
       ) : null}
      </Header>
      <div className="flex flex-row flex-wrap gap-2">
       <div className="flex items-center">
        <div className="mr-2 size-3 shrink-0 rounded-full bg-[#81848f]" />
        {guildPreview.approximate_member_count || "0"} members
       </div>
       <div className="flex items-center">
        <div className="mr-2 size-3 shrink-0 rounded-full bg-[#22a55b]" />
        {guildPreview.approximate_presence_count || "0"} online
       </div>
      </div>
     </Block>
     <Block>
      <Header className={twMerge(headerVariants({ variant: "h4", margin: "wide" }), "items-start justify-normal opacity-80")}>
       Emojis
       <span className="ml-auto font-medium opacity-60">{guildPreview.emojis.length || "0"}</span>
      </Header>
      {guildPreview.emojis && guildPreview.emojis.length > 0 ? (
       <div className="flex flex-row flex-wrap gap-4">
        {guildPreview.emojis.map((emoji) => (
         <Tooltip key={emoji.id || "" + emoji.name} content={emoji.name || "Unnamed emoji"}>
          <>
           <Link className="flex flex-col items-center justify-center gap-2" href={`https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? "gif" : "png"}`} target="_blank" rel="noreferrer noopener">
            <Image src={`https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? "gif" : "png"}`} alt={emoji.name || ""} quality={95} width={32} height={32} className="size-8 shrink-0" />
           </Link>
          </>
         </Tooltip>
        ))}
       </div>
      ) : (
       <span className="opacity-50">No emojis found.</span>
      )}
     </Block>

     <Block>
      <Header className={twMerge(headerVariants({ variant: "h4", margin: "wide" }), "items-start justify-normal opacity-80")}>
       Stickers
       <span className="ml-auto font-medium opacity-60">{guildPreview.stickers.length || "0"}</span>
      </Header>
      {guildPreview.stickers && guildPreview.stickers.length > 0 ? (
       <div className="flex flex-row flex-wrap gap-4">
        {guildPreview.stickers.map((sticker) => (
         <Tooltip key={sticker.id + sticker.name} content={sticker.name || "Unnamed sticker"}>
          <>
           <Link className="flex flex-col items-center justify-center gap-2" href={`https://cdn.discordapp.com/stickers/${sticker.id}.${sticker.format_type === 1 ? "png" : sticker.format_type === 2 ? "apng" : sticker.format_type === 3 ? "lottie" : "gif"}`} target="_blank" rel="noreferrer noopener">
            <Image unoptimized src={`https://cdn.discordapp.com/stickers/${sticker.id}.${sticker.format_type === 1 ? "png" : sticker.format_type === 2 ? "apng" : sticker.format_type === 3 ? "lottie" : "gif"}`} alt={sticker.name} quality={95} width={95} height={95} className="size-24" />
           </Link>
          </>
         </Tooltip>
        ))}
       </div>
      ) : (
       <span className="opacity-50">No stickers found.</span>
      )}
     </Block>
    </div>
   </div>
  </>
 );
}
