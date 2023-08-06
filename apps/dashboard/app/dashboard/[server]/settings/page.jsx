import { Cog6ToothIcon, PaintBrushIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { config } from "@majoexe/config";
import prismaClient from "@majoexe/database";
import { getGuildMember, getPermissionNames, getServer } from "@majoexe/util/functions";
import { getSession } from "lib/session";
import { redirect } from "next/navigation";
import { Block } from "@/components/blocks/Block";
import { ChangeEmbedColor } from "@/components/blocks/client/ChangeEmbedColor";
import { Header1 } from "@/components/blocks/Headers";

export default async function Settings({ params }) {
 const session = await getSession();
 if (!session || !session.access_token) redirect("/auth/login");
 const { server } = params;
 const serverDownload = await getServer(server);
 if (!serverDownload || serverDownload.code === 10004 || !serverDownload.bot) return redirect("/dashboard");
 const serverMember = await getGuildMember(serverDownload.id, session.access_token);
 if (!serverMember || !serverMember.permissions_names || !serverMember.permissions_names.includes("MANAGE_GUILD") || !serverMember.permissions_names.includes("ADMINISTRATOR")) return redirect("/dashboard");

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
   <Header1>
    <Cog6ToothIcon className="h-12 w-12" />
    Settings
   </Header1>
   <Block>
    <h2 className="flex items-center justify-start gap-2 text-left text-xl font-bold">
     <PaintBrushIcon className="h-5 w-5" />
     Default Embed Color
    </h2>
    <p className="mb-4 text-left">Change the color of the embeds sent by the bot. This will not affect embeds sent by other bots.</p>
    <ChangeEmbedColor serverId={serverDownload.id} serverColor={guild?.embedColor || config.global.defaultColor} serverIcon={serverDownload.icon} />
   </Block>

   <Block className="mt-4">
    <h2 className="flex items-center justify-start gap-2 text-left text-xl font-bold">
     <ShieldCheckIcon className="h-5 w-5" />
     Dashboard Access
    </h2>
    <p className="mb-4 text-left">
     Everyone with the roles that have the <code>MANAGE_GUILD</code> or <code>ADMINISTRATOR</code> permission can access the dashboard.
    </p>

    <div className="flex items-center justify-start gap-2">
     {serverDownload.roles.map((role) => {
      if (getPermissionNames(role.permissions).includes("MANAGE_GUILD") || getPermissionNames(role.permissions).includes("ADMINISTRATOR")) {
       return (
        <div key={role.id} className="flex items-center justify-start gap-2 rounded-full border border-neutral-700 px-2 py-1">
         <div
          className="h-4 w-4 rounded-full"
          style={{
           backgroundColor: role.color ? `#${role.color.toString(16)}` : "#000000",
          }}
         />
         <p className="text-neutral-100">{role.name}</p>
        </div>
       );
      }
     })}
    </div>
   </Block>
  </>
 );
}
