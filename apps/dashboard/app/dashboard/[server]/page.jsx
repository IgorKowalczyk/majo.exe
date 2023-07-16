import { getServer, getGuildPreview } from "@majoexe/util/functions";
import { getSession } from "lib/session";
import prismaClient from "@majoexe/database";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Block } from "@/components/blocks/Block";
import { Tooltip } from "@/components/blocks/client/Tooltip";
import { Header1, Header4, Header5 } from "@/components/blocks/Headers";
import { Leaderboard } from "@/components/blocks/client/Leaderboard";
import "tippy.js/dist/backdrop.css";
import "tippy.js/animations/shift-away.css";
import "tippy.js/dist/tippy.css";

export const metadata = {
 title: "Server Overview",
 description: "View the overview of your server.",
};

export default async function ServerOverview({ params }) {
 const user = await getSession();
 if (!user) return redirect("/auth/login");
 const { server } = params;
 const serverDownload = await getServer(server);
 if (!serverDownload) return redirect("/dashboard");
 if (serverDownload.code === 10004) return redirect("/dashboard");
 if (!serverDownload.bot) return redirect("/dashboard");
 const guildPreview = await getGuildPreview(serverDownload.id);

 const xp = await prismaClient.guildXp.findMany({
  where: {
   guildId: serverDownload.id,
  },
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
 });

 console.log(xp);

 const data = xp.map((x, i) => {
  return {
   id: i + 1,
   user: x.user,
   xp: x.xp,
   level: Math.floor(0.1 * Math.sqrt(x.xp || 0)),
  };
 });

 return (
  <>
   <Header1 className={"mb-4 !justify-normal"}>
    {guildPreview.icon ? <Image src={`https://cdn.discordapp.com/icons/${guildPreview.id}/${guildPreview.icon}.${guildPreview.icon.startsWith("a_") ? "gif" : "png"}`} alt={guildPreview.name} quality={95} width={64} height={64} className="h-16 w-16 rounded-full" /> : <div className="h-16 w-16 rounded-full bg-button-secondary" />}
    <div className="ml-4 flex flex-col !justify-start text-left">
     {guildPreview.name || "Unnamed server"}
     <Header5 className="mt-2 opacity-60">{guildPreview.description || "This server has no description, maybe you should add one?"}</Header5>
    </div>
   </Header1>

   <Block className="!mt-4 flex w-full flex-row">
    <div className="flex flex-row items-center gap-4">
     <div className="flex items-center">
      <div className="mr-2 h-3 w-3 rounded-full bg-[#81848f]" />
      {guildPreview.approximate_member_count || "0"} members
     </div>
     <div className="flex items-center">
      <div className="mr-2 h-3 w-3 rounded-full bg-[#22a55b]" />
      {guildPreview.approximate_presence_count || "0"} online
     </div>
    </div>
    <span className="ml-auto">Powered by Majo.exe</span>
   </Block>

   <div className="mt-6 flex items-start gap-6">
    <Block className="flex flex-col justify-start [flex:3_1_0] ">
     <Header4 className="mb-4 !items-start !justify-normal opacity-80">Leaderboard</Header4>
     {data.length > 0 ? <Leaderboard data={data} showSearch={false} showControls={false} /> : <span className="opacity-50">No users found. Maybe you should try talking in chat?</span>}
    </Block>
    <div className="flex flex-col justify-start gap-6 [flex:2_1_0%]">
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
      {guildPreview.emojis.length > 0 ? (
       <div className="flex flex-row flex-wrap gap-4">
        {guildPreview.emojis.map((emoji) => (
         <Link key={emoji.id} className="flex flex-col items-center justify-center gap-2" href={`https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? "gif" : "png"}`} target="_blank" rel="noreferrer noopener">
          <Tooltip content={emoji.name}>
           <Image src={`https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? "gif" : "png"}`} alt={emoji.name} quality={95} width={32} height={32} className="h-8 w-8" />
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
      {guildPreview.stickers.length > 0 ? (
       <div className="flex flex-row flex-wrap gap-4">
        {guildPreview.stickers.map((sticker) => (
         <Link key={sticker.id} className="flex flex-col items-center justify-center gap-2" href={`https://cdn.discordapp.com/stickers/${sticker.id}.${sticker.format_type === 1 ? "png" : sticker.format_type === 2 ? "apng" : sticker.format_type === 3 ? "lottie" : "gif"}`} target="_blank" rel="noreferrer noopener">
          <Tooltip content={sticker.name}>
           <Image unoptimized src={`https://cdn.discordapp.com/stickers/${sticker.id}.${sticker.format_type === 1 ? "png" : sticker.format_type === 2 ? "apng" : sticker.format_type === 3 ? "lottie" : "gif"}`} alt={sticker.name} quality={95} width={95} height={95} className="h-24 w-24" />
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
