import { dashboardConfig } from "@majoexe/config";
import prismaClient from "@majoexe/database";
import { getGuild, getGuildPreview } from "@majoexe/util/functions/guild";
import Link from "next/link";
import { notFound } from "next/navigation";
import Balancer from "react-wrap-balancer";
import { Block } from "@/components/Block";
import { Leaderboard } from "@/components/client/lists/Leaderboard";
import Image from "@/components/client/shared/Image";
import { Tooltip } from "@/components/client/shared/Tooltip";
import Header, { Header4, headerVariants } from "@/components/Headers";
import { twMerge } from "tailwind-merge";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ server: string }> }): Promise<Metadata> {
 const { server } = await params;
 const guild = await prismaClient.guild.findFirst({
  where: {
   OR: [
    {
     guildId: server,
    },
    {
     vanity: server,
    },
   ],
  },
 });

 if (!guild || !guild.guildId || !guild.publicPage)
  return {
   title: "Public Server Overview",
   description: "View the overview of your server.",
  };

 const serverDownload = await getGuild(guild.guildId);

 if (!serverDownload || !serverDownload.bot)
  return {
   title: "Public Server Overview",
   description: "View the overview of your server.",
  };

 const guildPreview = await getGuildPreview(serverDownload.id);
 if (!guildPreview || !guildPreview.id)
  return {
   title: "Public Server Overview",
   description: "View the overview of your server.",
  };

 return {
  title: `${guildPreview.name || "Unnamed server"}`,
  description: guildPreview.description || "View the overview of your server.",
  openGraph: {
   title: `${guildPreview.name || "Unnamed server"}`,
   description: guildPreview.description || "View the overview of your server.",
   url: dashboardConfig.url,
   siteName: dashboardConfig.title,
   images: [
    {
     url: `${dashboardConfig.url}/api/og/${server}`,
     width: 1200,
     height: 630,
    },
   ],
  },
 };
}

export default async function Page(props: { params: Promise<{ server: string }> }) {
 const params = await props.params;
 const { server } = params;

 const guild = await prismaClient.guild.findFirst({
  where: {
   OR: [
    {
     guildId: server,
    },
    {
     vanity: server,
    },
   ],
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
  },
 });

 if (!guild || !guild.guildId || !guild.publicPage) return notFound();

 const guildPreview = await getGuildPreview(guild.guildId);
 if (!guildPreview || !guildPreview.id) return notFound();

 const data = guild.guildXp.map((x, i) => {
  return {
   id: i + 1,
   user: x.user,
   xp: x.xp,
   level: Math.floor(0.1 * Math.sqrt(x.xp || 0)),
  };
 });

 return (
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
   <Header className={twMerge(headerVariants({ variant: "h1" }), "mb-6 justify-normal flex-col")}>
    {guildPreview.icon ? <Image src={`https://cdn.discordapp.com/icons/${guildPreview.id}/${guildPreview.icon}.${guildPreview.icon.startsWith("a_") ? "gif" : "png"}`} alt={guildPreview.name} quality={95} width={96} height={96} className="size-24 rounded-full" /> : <div className="size-24 rounded-full bg-button-secondary" />}
    <div className="flex flex-col text-center sm:ml-4">
     {guildPreview.name || "Unnamed server"}
     <Header className={twMerge(headerVariants({ variant: "h5", alignment: "center" }), "mt-2 opacity-60")}>
      <Balancer>{guildPreview.description || "This server has no description, maybe you should add one?"}</Balancer>
     </Header>
    </div>
   </Header>

   <Block className="!mt-4 flex w-full flex-col gap-4 !p-4 sm:flex-row sm:gap-0">
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
     <div className="flex items-center">
      <div className="mr-2 size-3 shrink-0 rounded-full bg-[#81848f]" />
      {guildPreview.approximate_member_count || "0"} members
     </div>
     <div className="flex items-center">
      <div className="mr-2 size-3 shrink-0 rounded-full bg-[#22a55b]" />
      {guildPreview.approximate_presence_count || "0"} online
     </div>
    </div>
    <span className="mx-auto whitespace-nowrap sm:ml-auto sm:mr-0">Powered by Majo.exe</span>
   </Block>

   <div className="mt-6 block gap-6 lg:flex lg:items-start">
    <Block className="scrollbar-show flex flex-col justify-start overflow-x-scroll [flex:3_1_0]">
     <Header4 className="mb-4 !items-start !justify-normal opacity-80">Leaderboard</Header4>
     {data.length > 0 ? <Leaderboard data={data} showSearch={false} showControls={false} /> : <span className="opacity-50">No users found. Maybe you should try talking in chat?</span>}
    </Block>
    <div className="mt-6 flex flex-col justify-start gap-6 [flex:2_1_0%] lg:mt-0">
     <Block>
      <Header4 className="mb-4 !items-start !justify-normal opacity-80">
       Emojis
       <span className="ml-auto font-medium opacity-60">{guildPreview.emojis.length || "0"}</span>
      </Header4>
      {guildPreview.emojis && guildPreview.emojis.length > 0 ? (
       <div className="flex flex-row flex-wrap gap-4">
        {guildPreview.emojis.map((emoji) => (
         <Link key={emoji.id || "" + emoji.name} className="flex flex-col items-center justify-center gap-2" href={`https://cdn.discordapp.com/emojis/${emoji?.id}.${emoji?.animated ? "gif" : "png"}`} target="_blank" rel="noreferrer noopener">
          <Tooltip content={emoji.name || "Unnamed emoji"}>
           <>
            <Image src={`https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? "gif" : "png"}`} alt={emoji.name || ""} quality={95} width={32} height={32} className="size-8 shrink-0" />
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
            <Image unoptimized src={`https://cdn.discordapp.com/stickers/${sticker.id}.${sticker.format_type === 1 ? "png" : sticker.format_type === 2 ? "apng" : sticker.format_type === 3 ? "lottie" : "gif"}`} alt={sticker.name} quality={95} width={96} height={96} className="size-24 shrink-0" />
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
  </div>
 );
}
