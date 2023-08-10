import { ListBulletIcon } from "@heroicons/react/24/outline";
import prismaClient from "@majoexe/database";
import { getGuildMember, getServer } from "@majoexe/util/functions";
import { getSession } from "lib/session";
import { redirect } from "next/navigation";
import Logs from "@/components/blocks/client/Logs";
import { Header1 } from "@/components/blocks/Headers";

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
  !serverMember.permissions_names.includes("MANAGE_GUILD") ||
  !serverMember.permissions_names.includes("ADMINISTRATOR")
 )
  return redirect("/auth/error?error=It%20looks%20like%20you%20do%20not%20have%20permission%20to%20access%20this%20page.");

 const guild = await prismaClient.guild.findFirst({
  where: {
   guildId: serverDownload.id,
  },
 });

 if (!guild) {
  await prismaClient.guild.create({
   data: {
    guildId: serverDownload.id,
   },
  });
 }

 const logs = await prismaClient.guildLogs.findMany({
  where: {
   guildId: serverDownload.id,
  },
  take: 20,
  skip: 0,
  orderBy: {
   createdAt: "desc",
  },
  include: {
   user: true,
  },
 });

 logs.forEach((log) => {
  log.createdAt = log.createdAt.toISOString();
 });

 return (
  <>
   <Header1>
    <ListBulletIcon className="h-12 w-12" />
    Activity Logs
   </Header1>
   <div className="overflow-auto">{logs.length === 0 ? <h3 className="mt-4 text-xl font-bold">No logs found!</h3> : <Logs initialItems={logs} id={serverDownload.id} />}</div>
  </>
 );
}
