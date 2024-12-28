import prismaClient from "@majoexe/database";
import { getGuildFromMemberGuilds, getGuild } from "@majoexe/util/functions/guild";
import { getSession } from "lib/session";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import Logs from "@/app/dashboard/[server]/dashboard-logs/components/Logs";
import { Block } from "@/components/ui/Block";
import Header, { headerVariants } from "@/components/ui/Headers";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export const metadata = {
 title: "Dashboard Logs",
 description: "All the logs of the different actions that have been happening on your dashboard.",
};

export default async function LogsPage(props: { params: Promise<{ server: string }> }) {
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
   guildLogs: {
    take: 20,
    skip: 0,
    orderBy: {
     createdAt: "desc",
    },
    include: {
     user: {
      select: {
       discordId: true,
       name: true,
       global_name: true,
       avatar: true,
       discriminator: true,
      },
     },
    },
   },
  },
 });

 const logs = guild.guildLogs.map((log) => {
  return {
   ...log,
   createdAt: log.createdAt instanceof Date ? log.createdAt.toString() : new Date(log.createdAt).toString(),
  };
 });

 return (
  <>
   <Header className={cn(headerVariants({ variant: "h1", margin: "normal" }))}>
    <Icons.Logs className={iconVariants({ variant: "extraLarge" })} />
    Dashboard Logs
   </Header>
   <p className="mb-4 text-left text-base md:text-lg">All the logs of the different actions that have been happening on your dashboard.</p>
   <div className="mt-4 overflow-auto">
    {!logs || logs.length === 0 ? (
     <Block>
      <p className="text-left">No logs found! Check back later, maybe something will happen soon!</p>
     </Block>
    ) : (
     <Logs initialItems={logs} server={serverDownload.id} />
    )}
   </div>
  </>
 );
}
