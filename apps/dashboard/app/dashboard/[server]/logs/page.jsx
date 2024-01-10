import prismaClient from "@majoexe/database";
import { getGuildMember, getServer } from "@majoexe/util/functions/guild";
import { getSession } from "lib/session";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { Block } from "@/components/Block";
import Logs from "@/components/client/lists/Logs";
import { Header1 } from "@/components/Headers";
import { Icons, iconVariants } from "@/components/Icons";

export const metadata = {
 title: "Server Logs",
 description: "View the logs of your server.",
};

export default async function LogsPage({ params }) {
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

 guild.guildLogs.forEach((log) => {
  log.createdAt instanceof Date ? (log.createdAt = log.createdAt.toISOString()) : (log.createdAt = new Date().toISOString());
 });

 return (
  <>
   <Header1>
    <Icons.list className={iconVariants({ variant: "extraLarge" })} />
    Activity Logs
   </Header1>
   <div className="mt-4 overflow-auto">
    {!guild.guildLogs || guild.guildLogs.length === 0 ? (
     <Block>
      <p className="text-left">No logs found! Check back later, maybe something will happen soon!</p>
     </Block>
    ) : (
     <Logs initialItems={guild.guildLogs} id={serverDownload.id} />
    )}
   </div>
  </>
 );
}
