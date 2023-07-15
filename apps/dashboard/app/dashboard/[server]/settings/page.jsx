import { PaintBrushIcon } from "@heroicons/react/24/outline";
import { config } from "@majoexe/config";
import prismaClient from "@majoexe/database";
import { getServer } from "@majoexe/util/functions";
import { getSession } from "lib/session";
import { redirect } from "next/navigation";
import { Block } from "@/components/blocks/Block";
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

 if (!guild) {
  await prismaClient.guild.create({
   data: {
    guildId: serverDownload.id,
   },
  });
 }

 return (
  <>
   <Block>
    <h2 className="flex items-center justify-center gap-4 text-center text-3xl font-bold">
     <PaintBrushIcon className="h-9 w-9" />
     Embed Color
    </h2>
    <p className="mb-4 text-center">Change the color of the embeds sent by the bot.</p>
    <ChangeEmbedColor serverId={serverDownload.id} serverColor={guild?.embedColor || config.global.defaultColor} serverIcon={serverDownload.icon} />
   </Block>
  </>
 );
}
