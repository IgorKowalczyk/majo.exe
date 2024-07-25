
import prismaClient from "@nyxia/database";
import { getServer, getGuildPreview, getGuildMember } from "@nyxia/util/functions/guild";
import { fillMissingDates } from "@nyxia/util/functions/util";
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
import { Header1, Header4, Header5 } from "@/components/Headers";
import { Icons, iconVariants } from "@/components/Icons";

export const metadata = {
 title: "Server Overview",
 description: "View the overview of your server.",
};

export default async function OverviewPage({ params }) {
 const session = await getSession();
 if (!session || !session.access_token) redirect("/auth/login");

 const { server } = params;
 const serverDownload = await getServer(server);
 if (!serverDownload || serverDownload.code === 10004 || !serverDownload.bot) return notFound();
 const serverMember = await getGuildMember(serverDownload.id, session.access_token);
 if (
  // prettier
  !serverMember ||
  !serverMember.permissions_names ||
  !serverMember.permissions_names.includes("ManageGuild") ||
  !serverMember.permissions_names.includes("Administrator")
 )
  return notFound();
 const guildPreview = await getGuildPreview(serverDownload.id);

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

 const sumArray = (array, metric) => array.reduce((accumulator, currentValue) => accumulator + currentValue[metric], 0);

 let guildJoin = guild.guildJoin.map((guildJoinData) => ({
  date: guildJoinData.date.toISOString().split("T")[0],
  Joins: guildJoinData.joins,
 }));

 let guildLeave = guild.guildLeave.map((guildLeaveData) => ({
  date: guildLeaveData.date.toISOString().split("T")[0],
  Leaves: guildLeaveData.leaves,
 }));

 let guildMessage = guild.guildMessage.map((guildMessageData) => ({
  date: guildMessageData.date.toISOString().split("T")[0],
  Messages: guildMessageData.messages,
 }));

 guildJoin = fillMissingDates(guildJoin, "Joins");
 guildLeave = fillMissingDates(guildLeave, "Leaves");
 guildMessage = fillMissingDates(guildMessage, "Messages");

 const newMembers = sumArray(guildJoin, "Joins");
 const membersLeft = sumArray(guildLeave, "Leaves");
 const newMessages = sumArray(guildMessage, "Messages");

 return (
  <>
   <div className="mb-4 flex flex-col items-center justify-normal gap-4 sm:flex-row">
    {guildPreview.icon ? <Image src={`https://cdn.discordapp.com/icons/${guildPreview.id}/${guildPreview.icon}.${guildPreview.icon.startsWith("a_") ? "gif" : "png"}`} alt={guildPreview.name} quality={95} width={64} height={64} className="h-16 min-h-16 w-16 min-w-16 rounded-full" /> : <div className="bg-button-secondary h-16 min-h-16 w-16 min-w-16 rounded-full" />}
    <div className="flex flex-col justify-center text-center sm:ml-4 sm:justify-start sm:text-left">
     <Header1 className="mb-0">{guildPreview.name || "Unnamed server"}</Header1>
     <Header5 className="mt-2 text-center opacity-60 sm:text-left">
      <p>{guildPreview.description || "This server has no description, maybe you should add one?"}</p>
     </Header5>
    </div>
   </div>

   <div className="mb-4 grid grid-cols-1 gap-0 md:grid-cols-1 md:gap-4 lg:grid-cols-2 xl:grid-cols-3">
    <Link href={`/dashboard/${serverDownload.id}/statistics`} className="bg-background-secondary mt-4 cursor-pointer overflow-auto rounded-lg border border-neutral-800 p-4">
     <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-4">
       <Icons.userAdd className={iconVariants({ variant: "extraLarge" })} />
       <div className="flex flex-col">
        <Header4 className="!justify-start whitespace-nowrap">
         New members
         <span className="bg-accent-primary rounded-md px-2 text-sm font-normal text-white">+{newMembers}</span>
        </Header4>
        <p className="text-sm text-gray-400">Amount of new members that joined your server in the last 7 days.</p>
       </div>
      </div>
      <div className="ml-2 flex flex-row items-center gap-4">
       <SparkLineChart data={guildJoin} categories={["Joins"]} index="date" />
      </div>
     </div>
    </Link>

    <Link href={`/dashboard/${serverDownload.id}/statistics`} className="bg-background-secondary mt-4 cursor-pointer overflow-auto rounded-lg border border-neutral-800 p-4">
     <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-4">
       <Icons.commentAdd className={iconVariants({ variant: "extraLarge" })} />
       <div className="flex flex-col">
        <Header4 className="!justify-start whitespace-nowrap">
         Messages sent
         <span className="bg-accent-primary rounded-md px-2 text-sm font-normal text-white">+{newMessages}</span>
        </Header4>
        <p className="text-sm text-gray-400">Amount of messages that were sent in your server in the last 7 days.</p>
       </div>
      </div>
      <div className="ml-2 flex flex-row items-center gap-4">
       <SparkLineChart data={guildMessage} categories={["Messages"]} index="date" />
      </div>
     </div>
    </Link>

    <Link href={`/dashboard/${serverDownload.id}/statistics`} className="bg-background-secondary mt-4 cursor-pointer overflow-auto rounded-lg border border-neutral-800 p-4">
     <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-4">
       <Icons.userMinus className={iconVariants({ variant: "extraLarge" })} />
       <div className="flex flex-col">
        <Header4 className="!justify-start whitespace-nowrap">
         Members left
         <span className="bg-accent-primary rounded-md px-2 text-sm font-normal text-white">-{membersLeft}</span>
        </Header4>
        <p className="text-sm text-gray-400">Amount of members that left your server in the last 7 days.</p>
       </div>
      </div>
      <div className="ml-2 flex flex-row items-center gap-4">
       <SparkLineChart data={guildLeave} categories={["Leaves"]} index="date" />
      </div>
     </div>
    </Link>
   </div>

   <div className="mt-6 block gap-6 lg:flex lg:items-start">
    <div className="flex flex-col justify-start gap-6 overflow-x-scroll [flex:3_1_0]">
     <Block>
      <Header4 className="mb-2 !block !text-left">
       <span className="flex flex-row flex-wrap items-center gap-2">
        <Icons.gauge className={iconVariants({ variant: "normal", className: "!stroke-2" })} />
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
      </Header4>

      {guildScore !== 100 ? <Header5 className="!text-left !text-base opacity-60">Your server score is not 100%, this means that you are missing some features that could be useful for your server.</Header5> : <Header5 className="!text-left !text-base opacity-60">Your server score is 100%, this means that you have all the features that could be useful to your server! Good job!</Header5>}

      <CategoryBar percent={guildScore} className="my-4" />

      {guildScore !== 100 && (
       <>
        <Header4 className="!items-center !justify-normal !gap-2 pt-4 opacity-80">
         <Icons.lightBulb className={iconVariants({ variant: "normal", className: "!stroke-2" })} />
         Ways to improve your score:
        </Header4>
        <div className="mt-2 space-y-1">
         {(!guild.autoMod || guild.autoMod.length === 0) && (
          <div>
           <span className="gap-1 font-bold">
            <Icons.plus className={iconVariants({ variant: "normal", className: "mr-1 inline !stroke-2" })} />
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
            <Icons.plus className={iconVariants({ variant: "normal", className: "mr-1 inline !stroke-2" })} />
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
            <Icons.plus className={iconVariants({ variant: "normal", className: "mr-1 inline !stroke-2" })} />
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
            <Icons.plus className={iconVariants({ variant: "normal", className: "mr-1 inline !stroke-2" })} />
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
      <Header4 className="mb-4 !items-start !justify-normal opacity-80">Leaderboard</Header4>
      {data.length > 0 ? <Leaderboard data={data} showSearch={false} showControls={false} /> : <span className="opacity-50">No users found. Maybe you should try talking in chat?</span>}
     </Block>
    </div>
    <div className="mt-6 flex flex-col justify-start gap-6 [flex:2_1_0%] lg:mt-0">
     <Block>
      <Header4 className="mb-4 !items-start !justify-normal opacity-80">Quick Stats</Header4>
      <div className="flex flex-row flex-wrap gap-2">
       <div className="flex items-center">
        <div className="mr-2 h-3 min-h-3 w-3 min-w-3 rounded-full bg-[#81848f]" />
        {guildPreview.approximate_member_count || "0"} members
       </div>
       <div className="flex items-center">
        <div className="mr-2 h-3 min-h-3 w-3 min-w-3 rounded-full bg-[#22a55b]" />
        {guildPreview.approximate_presence_count || "0"} online
       </div>
      </div>
     </Block>
     <Block>
      <Header4 className="mb-4 !items-start !justify-normal opacity-80">
       Emojis
       <span className="ml-auto font-medium opacity-60">{guildPreview.emojis.length || "0"}</span>
      </Header4>
      {guildPreview.emojis && guildPreview.emojis.length > 0 ? (
       <div className="flex flex-row flex-wrap gap-4">
        {guildPreview.emojis.map((emoji) => (
         <Tooltip key={emoji.id + emoji.name} content={emoji.name || "Unnamed emoji"}>
          <>
           <Link className="flex flex-col items-center justify-center gap-2" href={`https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? "gif" : "png"}`} target="_blank" rel="noreferrer noopener">
            <Image src={`https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? "gif" : "png"}`} alt={emoji.name} quality={95} width={32} height={32} className="h-8 min-h-8 w-8 min-w-8" />
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
      <Header4 className="mb-4 !items-start !justify-normal opacity-80">
       Stickers
       <span className="ml-auto font-medium opacity-60">{guildPreview.stickers.length || "0"}</span>
      </Header4>
      {guildPreview.stickers && guildPreview.stickers.length > 0 ? (
       <div className="flex flex-row flex-wrap gap-4">
        {guildPreview.stickers.map((sticker) => (
         <Tooltip key={sticker.id + sticker.name} content={sticker.name || "Unnamed sticker"}>
          <>
           <Link className="flex flex-col items-center justify-center gap-2" href={`https://cdn.discordapp.com/stickers/${sticker.id}.${sticker.format_type === 1 ? "png" : sticker.format_type === 2 ? "apng" : sticker.format_type === 3 ? "lottie" : "gif"}`} target="_blank" rel="noreferrer noopener">
            <Image unoptimized src={`https://cdn.discordapp.com/stickers/${sticker.id}.${sticker.format_type === 1 ? "png" : sticker.format_type === 2 ? "apng" : sticker.format_type === 3 ? "lottie" : "gif"}`} alt={sticker.name} quality={95} width={95} height={95} className="h-24 w-24" />
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
