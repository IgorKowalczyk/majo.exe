import { Cog6ToothIcon, PaintBrushIcon } from "@heroicons/react/24/outline";
import prismaClient from "@majoexe/database";
import { getServer } from "@majoexe/util/functions";
import { getSession } from "lib/session";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ChangeEmbedColor } from "@/components/blocks/client/ChangeEmbedColor";

export default async function Settings({ params }) {
 const user = await getSession();
 if (!user) return redirect("/auth/login");
 const { server } = params;
 const serverDownload = await getServer(server);
 if (!serverDownload) return redirect("/dashboard");
 if (serverDownload.code === 10004) return redirect("/dashboard");
 if (!serverDownload.bot) return redirect("/dashboard");

 const guild = await prismaClient.guild.findFirst({
  where: {
   guildId: serverDownload.id,
  },
 });

 return (
  <div className="flex w-full flex-col items-center bg-background-primary antialiased md:py-16 md:px-16 px-8 py-8">
   <h2 className="flex items-center justify-center gap-4 text-center text-3xl font-bold">
    <PaintBrushIcon className="w-9 h-9" />
    Embed Color
   </h2>
   <ChangeEmbedColor serverId={serverDownload.id} serverColor={guild?.embedColor || "#5865F2"} serverIcon={serverDownload.icon} />
  </div>
 );
}
