/* eslint-disable complexity */
import { ArrowPathIcon, LightBulbIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import { BoltIcon, SparklesIcon } from "@heroicons/react/24/solid";
import prismaClient from "@majoexe/database";
import { getServer, getGuildPreview, getGuildMember } from "@majoexe/util/functions/guild";
import clsx from "clsx";
import { getSession } from "lib/session";
import Link from "next/link";
import { redirect } from "next/navigation";
import Balancer from "react-wrap-balancer";
import { Block } from "@/components/Block";
import { GraphCard } from "@/components/Card";
import { CategoryBar } from "@/components/CategoryBar";
import { Leaderboard } from "@/components/client/lists/Leaderboard";
import Image from "@/components/client/shared/Image";
import { Tooltip } from "@/components/client/shared/Tooltip";
import { Header4, Header5 } from "@/components/Headers";

export const metadata = {
 title: "Server Overview",
 description: "View the overview of your server.",
};

export default async function ServerOverview({ params }) {
 const session = await getSession();
 if (!session || !session.access_token) redirect("/auth/login");

 const { server } = params;
 const serverDownload = await getServer(server);
 if (!serverDownload || serverDownload.code === 10004 || !serverDownload.bot) return redirect("/auth/error?error=It%20looks%20like%20the%20server%20you%20are%20trying%20to%20display%20does%20not%20exist");
 const serverMember = await getGuildMember(serverDownload.id, session.access_token);
 if (
  // prettier
  !serverMember ||
  !serverMember.permissions_names ||
  !serverMember.permissions_names.includes("ManageGuild") ||
  !serverMember.permissions_names.includes("Administrator")
 )
  return redirect("/auth/error?error=It%20looks%20like%20you%20do%20not%20have%20permission%20to%20access%20this%20page.");
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

 return (
  <>
   <div className="mb-4 flex flex-col items-center justify-normal gap-4 text-2xl font-bold sm:flex-row md:text-3xl">
    {guildPreview.icon ? <Image src={`https://cdn.discordapp.com/icons/${guildPreview.id}/${guildPreview.icon}.${guildPreview.icon.startsWith("a_") ? "gif" : "png"}`} alt={guildPreview.name} quality={95} width={64} height={64} className="min-h-16 min-w-16 h-16 w-16 rounded-full" /> : <div className="bg-button-secondary min-h-16 min-w-16 h-16 w-16 rounded-full" />}
    <div className="flex flex-col text-center sm:ml-4 sm:text-left">
     {guildPreview.name || "Unnamed server"}
     <Header5 className="mt-2 text-center opacity-60 sm:text-left">
      <Balancer>{guildPreview.description || "This server has no description, maybe you should add one?"}</Balancer>
     </Header5>
    </div>
   </div>

   {/* <div className="mb-4 grid grid-cols-1 gap-0 md:grid-cols-1 md:gap-4 lg:grid-cols-2 xl:grid-cols-3">
    <GraphCard
     className={"mt-0"}
     data={{
      icon: <SparklesIcon className="min-h-8 min-w-8 h-8 w-8" />,
      title: "Soon!",
      description: "This feature is coming soon! Stay tuned!",
      value: "Loading",
      graph: <ArrowPathIcon className="min-h-5 min-w-5 h-5 w-5 animate-spin" />,
     }}
    />
    <GraphCard
     className={"mt-0"}
     data={{
      icon: <SparklesIcon className="min-h-8 min-w-8 h-8 w-8" />,
      title: "Soon!",
      description: "This feature is coming soon! Stay tuned!",
      value: "Loading",
      graph: <ArrowPathIcon className="min-h-5 min-w-5 h-5 w-5 animate-spin" />,
     }}
    />
    <GraphCard
     className={"col-span-1 mt-0 lg:col-span-2 xl:col-span-1"}
     data={{
      icon: <SparklesIcon className="min-h-8 min-w-8 h-8 w-8" />,
      title: "Soon!",
      description: "This feature is coming soon! Stay tuned!",
      value: "Loading",
      graph: <ArrowPathIcon className="min-h-5 min-w-5 h-5 w-5 animate-spin" />,
     }}
    />
   </div> */}

   <div className="mt-6 block gap-6 lg:flex lg:items-start">
    <div className="[flex:3_1_0] gap-6 flex flex-col justify-start overflow-x-scroll">
     <Block>
      <Header4 className="!block mb-2 !text-left">
       <span className="flex flex-row items-center flex-wrap gap-2">
        <BoltIcon className="min-h-5 min-w-5 h-5 w-5" aria-hidden="true" role="img" />
        <span className="opacity-80">Server Score: </span>
        <span
         className={clsx({
          "text-rose-500": guildScore <= 10,
          "text-orange-500": guildScore > 10 && guildScore <= 30,
          "text-yellow-500": guildScore > 30 && guildScore <= 60,
          "text-emerald-500": guildScore > 60,
         })}
        >
         {guildScore}% ({guildScore <= 10 ? "Bad" : guildScore > 10 && guildScore <= 30 ? "Okay" : guildScore > 30 && guildScore <= 60 ? "Good" : "Perfect!"})
        </span>
       </span>
      </Header4>

      {guildScore !== 100 ? <Header5 className="!text-left !text-base opacity-60">Your server score is not 100%, this means that you are missing some features that could be useful to your server.</Header5> : <Header5 className="!text-left !text-base opacity-60">Your server score is 100%, this means that you have all the features that could be useful to your server! Good job!</Header5>}

      <CategoryBar percent={guildScore} className="my-4" />

      {guildScore !== 100 && (
       <>
        <Header4 className="pt-4 !items-center !gap-2 !justify-normal opacity-80">
         <LightBulbIcon className="min-h-5 min-w-5 h-5 w-5" aria-hidden="true" role="img" />
         Ways to improve your score:
        </Header4>
        <div className="list-decimal list-inside mt-2">
         {(!guild.autoMod || guild.autoMod.length === 0) && (
          <div>
           <span className="font-bold gap-1">
            <PlusSmallIcon className="min-h-5 min-w-5 h-5 w-5 inline mr-1 stroke-2 stroke-accent-primary" aria-hidden="true" role="img" />
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
           <span className="font-bold gap-1">
            <PlusSmallIcon className="min-h-5 min-w-5 h-5 w-5 inline mr-1 stroke-2 stroke-accent-primary" aria-hidden="true" role="img" />
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
           <span className="font-bold gap-1">
            <PlusSmallIcon className="min-h-5 min-w-5 h-5 w-5 inline mr-1 stroke-2 stroke-accent-primary" aria-hidden="true" role="img" />
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
           <span className="font-bold gap-1">
            <PlusSmallIcon className="min-h-5 min-w-5 h-5 w-5 inline mr-1 stroke-2 stroke-accent-primary" aria-hidden="true" role="img" />
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
      <div className="flex gap-2 flex-row flex-wrap">
       <div className="flex items-center">
        <div className="min-h-3 min-w-3 mr-2 h-3 w-3 rounded-full bg-[#81848f]" />
        {guildPreview.approximate_member_count || "0"} members
       </div>
       <div className="flex items-center">
        <div className="min-h-3 min-w-3 mr-2 h-3 w-3 rounded-full bg-[#22a55b]" />
        {guildPreview.approximate_presence_count || "0"} online
       </div>
      </div>
      {/* {guild.publicPage ? (
       <ButtonSecondary href={`/server/${guild.vanity || serverDownload.id}`} className={"mx-auto !flex flex-row whitespace-nowrap sm:ml-auto sm:mr-0"} target="_blank" rel="noreferrer noopener">
        <ArrowTopRightOnSquareIcon className="min-h-5 min-w-5 mr-2 h-5 w-5" aria-hidden="true" role="img" />
        Server page
       </ButtonSecondary>
      ) : (
       <span className="mx-auto whitespace-nowrap sm:ml-auto sm:mr-0">Powered by Majo.exe</span>
      )} */}
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
            <Image src={`https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? "gif" : "png"}`} alt={emoji.name} quality={95} width={32} height={32} className="min-h-8 min-w-8 h-8 w-8" />
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
