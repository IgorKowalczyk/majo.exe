import { ListBulletIcon } from "@heroicons/react/24/outline";
import prismaClient from "@majoexe/database";
import { getServer } from "@majoexe/util/functions";
import { getSession } from "lib/session";
import { redirect } from "next/navigation";
import Logs from "@/components/blocks/client/Logs";

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
  <div className="flex w-full flex-col items-center bg-background-primary antialiased md:py-16 md:px-16 px-8 py-8">
   <h1 className="flex items-center justify-center gap-4 text-center text-5xl font-bold">
    <ListBulletIcon className="w-12 h-12" />
    Activity Logs
   </h1>
   <div className="overflow-auto">{logs.length === 0 ? <h3 className="text-center text-xl font-bold">No logs found!</h3> : <Logs initialItems={logs} id={serverDownload.id} />}</div>
  </div>
 );
}
