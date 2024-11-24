import prismaClient from "@majoexe/database";
import { getGuildFromMemberGuilds, getGuild } from "@majoexe/util/functions/guild";
import { getSession } from "lib/session";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { Block } from "@/components/Block";
import { Leaderboard } from "@/components/client/lists/Leaderboard";
import Header, { headerVariants } from "@/components/Headers";
import { Icons, iconVariants } from "@/components/Icons";
import { Metadata } from "next";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
 title: "Leaderboard",
 description: "View the leaderboard for your server.",
};

export default async function LeaderboardPage(props: { params: Promise<{ server: string }> }) {
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
 const data = guild.guildXp.map((x, i) => {
  return {
   id: i + 1,
   user: x.user,
   xp: x.xp,
   level: Math.floor(0.1 * Math.sqrt(x.xp || 0)),
  };
 });

 return (
  <>
   <Header className={cn(headerVariants({ variant: "h1", margin: "normal" }))}>
    <Icons.Sparkles className={iconVariants({ variant: "extraLarge" })} />
    Leaderboard
   </Header>
   <p className="mb-4 text-left text-base md:text-lg">View the leaderboard for your server, see who's the most active</p>
   <Block className="mt-4 flex w-full overflow-auto">{data.length > 0 ? <Leaderboard data={data} /> : <span className="opacity-50">No users found. Maybe you should try talking in chat?</span>}</Block>
  </>
 );
}
