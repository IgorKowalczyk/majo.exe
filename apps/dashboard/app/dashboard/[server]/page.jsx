import { getServer } from "@majoexe/util/functions";
import { getSession } from "lib/session";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Header1 } from "@/components/blocks/Headers";

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

 return (
  <div className="flex min-h-screen flex-col justify-center gap-4">
   <Header1>
    {serverDownload.icon ? <Image src={`https://cdn.discordapp.com/icons/${serverDownload.id}/${serverDownload.icon}.${serverDownload.icon.startsWith("a_") ? "gif" : "png"}`} alt={serverDownload.name} quality={95} width={64} height={64} className="h-16 w-16 rounded-full" /> : <div className="h-16 w-16 rounded-full bg-button-secondary" />}
    {serverDownload.name || "Unnamed server"}
   </Header1>
  </div>
 );
}
