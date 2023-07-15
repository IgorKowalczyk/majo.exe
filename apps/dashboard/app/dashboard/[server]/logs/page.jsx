import { ListBulletIcon } from "@heroicons/react/24/outline";
import prismaClient from "@majoexe/database";
import { getServer } from "@majoexe/util/functions";
import { getSession } from "lib/session";
import { redirect } from "next/navigation";
import Logs from "@/components/blocks/client/Logs";
import { Header1 } from "@/components/blocks/Headers";

export const metadata = {
 title: "Server Logs",
 description: "View the logs of your server.",
};

export default async function ServerLogs({ params }) {
 const user = await getSession();
 if (!user) return redirect("/auth/login");
 const { server } = params;
 const serverDownload = await getServer(server);
 if (!serverDownload) return redirect("/dashboard");
 if (serverDownload.code === 10004) return redirect("/dashboard");
 if (!serverDownload.bot) return redirect("/dashboard");

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
   <div className="overflow-auto">{logs.length === 0 ? <h3 className="mt-4 text-center text-xl font-bold">No logs found!</h3> : <Logs initialItems={logs} id={serverDownload.id} />}</div>
  </>
 );
}
