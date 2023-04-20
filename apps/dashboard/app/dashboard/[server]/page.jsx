import { getServer } from "@majoexe/util/src/functions/getServer";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function ServerOverview({ params }) {
 const { server } = params;
 const serverDownload = await getServer(server);
 if (!serverDownload) return redirect("/dashboard");
 if (serverDownload.code === 10004) return redirect("/dashboard");
 if (!serverDownload.bot) return redirect("/dashboard");

 return (
  <div className="flex min-h-screen flex-col justify-center gap-4">
   <h1 className="flex items-center justify-center gap-4 text-center font-inter text-5xl font-bold">
    {serverDownload.icon ? <Image src={`https://cdn.discordapp.com/icons/${serverDownload.id}/${serverDownload.icon}.${serverDownload.icon.startsWith("a_") ? "gif" : "png"}`} alt={serverDownload.name} quality={95} width={64} height={64} className="w-16 h-16 rounded-full" /> : <div className="w-16 h-16 rounded-full bg-button-secondary" />}
    {serverDownload.name || "Unnamed server"}
   </h1>
  </div>
 );
}
