/* eslint-disable complexity */
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import prismaClient from "@majoexe/database";
import { getServer, getGuildPreview, getGuildMember } from "@majoexe/util/functions";
import { getSession } from "lib/session";
import Link from "next/link";
import { redirect } from "next/navigation";
import Balancer from "react-wrap-balancer";
import { Block } from "@/components/blocks/Block";
import { Leaderboard } from "@/components/blocks/client/lists/Leaderboard";
import Image from "@/components/blocks/client/shared/Image";
import { Tooltip } from "@/components/blocks/client/shared/Tooltip";
import { Header4, Header5 } from "@/components/blocks/Headers";
import { SecondaryButton } from "@/components/buttons/server/Secondary";

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
       name: true,
       avatar: true,
       discriminator: true,
      },
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

 return (
  <>
   <div className="mb-4 flex flex-col items-center justify-normal gap-4 text-3xl font-bold sm:flex-row md:text-4xl">
    {guildPreview.icon ? <Image src={`https://cdn.discordapp.com/icons/${guildPreview.id}/${guildPreview.icon}.${guildPreview.icon.startsWith("a_") ? "gif" : "png"}`} alt={guildPreview.name} quality={95} width={64} height={64} className="min-h-16 min-w-16 h-16 w-16 rounded-full" /> : <div className="bg-button-secondary min-h-16 min-w-16 h-16 w-16 rounded-full" />}
    <div className="flex flex-col text-center sm:ml-4 sm:text-left">
     {guildPreview.name || "Unnamed server"}
     <Header5 className="mt-2 text-center opacity-60 sm:text-left">
      <Balancer>{guildPreview.description || "This server has no description, maybe you should add one?"}</Balancer>
     </Header5>
    </div>
   </div>

   <Block className="!mt-4 flex w-full flex-col gap-4 !p-4 sm:flex-row sm:gap-0">
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
     <div className="flex items-center">
      <div className="min-h-3 min-w-3 mr-2 h-3 w-3 rounded-full bg-[#81848f]" />
      {guildPreview.approximate_member_count || "0"} members
     </div>
     <div className="flex items-center">
      <div className="min-h-3 min-w-3 mr-2 h-3 w-3 rounded-full bg-[#22a55b]" />
      {guildPreview.approximate_presence_count || "0"} online
     </div>
    </div>
    {guild.publicPage ? (
     <SecondaryButton href={`/server/${guild.vanity || serverDownload.id}`} className={"mx-auto !flex flex-row whitespace-nowrap sm:ml-auto sm:mr-0"} target="_blank" rel="noreferrer noopener">
      <ArrowTopRightOnSquareIcon className="min-h-5 min-w-5 mr-2 h-5 w-5" aria-hidden="true" role="img" />
      Server page
     </SecondaryButton>
    ) : (
     <span className="mx-auto whitespace-nowrap sm:ml-auto sm:mr-0">Powered by Majo.exe</span>
    )}
   </Block>

   <div className="mt-6 block gap-6 lg:flex lg:items-start">
    <Block className="scrollbar-show flex flex-col justify-start overflow-x-scroll [flex:3_1_0] ">
     <Header4 className="mb-4 !items-start !justify-normal opacity-80">Leaderboard</Header4>
     {data.length > 0 ? <Leaderboard data={data} showSearch={false} showControls={false} /> : <span className="opacity-50">No users found. Maybe you should try talking in chat?</span>}
    </Block>
    <div className="mt-6 flex flex-col justify-start gap-6 [flex:2_1_0%] lg:mt-0">
     <Block>
      <Header4 className="!items-start !justify-normal opacity-80">
       Language
       <span className="ml-auto font-medium">{serverDownload.preferred_locale || "en_US"}</span>
      </Header4>
     </Block>
     <Block>
      <Header4 className="mb-4 !items-start !justify-normal opacity-80">
       Emojis
       <span className="ml-auto font-medium opacity-60">{guildPreview.emojis.length || "0"}</span>
      </Header4>
      {guildPreview.emojis && guildPreview.emojis.length > 0 ? (
       <div className="flex flex-row flex-wrap gap-4">
        {guildPreview.emojis.map((emoji) => (
         <Link key={emoji.id + emoji.name} className="flex flex-col items-center justify-center gap-2" href={`https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? "gif" : "png"}`} target="_blank" rel="noreferrer noopener">
          <Tooltip content={emoji.name || "Unnamed emoji"}>
           <>
            <Image src={`https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? "gif" : "png"}`} alt={emoji.name} quality={95} width={32} height={32} className="min-h-8 min-w-8 h-8 w-8" />
           </>
          </Tooltip>
         </Link>
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
         <Link key={sticker.id + sticker.name} className="flex flex-col items-center justify-center gap-2" href={`https://cdn.discordapp.com/stickers/${sticker.id}.${sticker.format_type === 1 ? "png" : sticker.format_type === 2 ? "apng" : sticker.format_type === 3 ? "lottie" : "gif"}`} target="_blank" rel="noreferrer noopener">
          <Tooltip content={sticker.name || "Unnamed sticker"}>
           <>
            <Image unoptimized src={`https://cdn.discordapp.com/stickers/${sticker.id}.${sticker.format_type === 1 ? "png" : sticker.format_type === 2 ? "apng" : sticker.format_type === 3 ? "lottie" : "gif"}`} alt={sticker.name} quality={95} width={95} height={95} className="h-24 w-24" />
           </>
          </Tooltip>
         </Link>
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
