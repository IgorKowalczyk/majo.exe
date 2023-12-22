import { ListBulletIcon } from "@heroicons/react/24/outline";
import prismaClient from "@majoexe/database";
import { getGuildMember, getServer } from "@majoexe/util/functions/guild";
import { getSession } from "lib/session";
import { redirect } from "next/navigation";
import { Block } from "@/components/Block";
import Logs from "@/components/client/lists/Logs";
import { Header1 } from "@/components/Headers";

export const metadata = {
 title: "Server Logs",
 description: "View the logs of your server.",
};

export default async function ServerLogs({ params }) {
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
    <ListBulletIcon className="min-h-9 min-w-9 h-9 w-9" />
    Activity Logs
   </Header1>
   <div className="overflow-auto mt-4">
    {!guild.guildLogs || guild.guildLogs.length === 0 ? (
     <Block>
      <p className="text-left">No logs found! Check back later, maybe something will happen.</p>
     </Block>
    ) : (
     <Logs initialItems={guild.guildLogs} id={serverDownload.id} />
    )}
   </div>
  </>
 );
}
