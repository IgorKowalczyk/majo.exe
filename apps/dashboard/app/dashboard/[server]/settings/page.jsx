import { globalConfig } from "@majoexe/config";
import prismaClient from "@majoexe/database";
import { getGuildMember, getServer } from "@majoexe/util/functions/guild";
import { getPermissionNames } from "@majoexe/util/functions/user";
import { getSession } from "lib/session";
import { redirect } from "next/navigation";
import { Block } from "@/components/Block";
import { ButtonPrimary } from "@/components/Buttons";
import { ChangeEmbedColor } from "@/components/client/settings/ChangeEmbedColor";
import DeleteServerData from "@/components/client/settings/DeleteServerData";
import { EnablePublicDashboard } from "@/components/client/settings/EnablePublicDashboard";
import { Header1, Header2, Header3 } from "@/components/Headers";
import { Icons, iconVariants } from "@/components/Icons";

export default async function Settings({ params }) {
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
 });

 return (
  <>
   <Header1>
    <Icons.settings className={iconVariants({ variant: "extraLarge" })} />
    Settings
   </Header1>
   <Block className="mt-4">
    <Header2>
     <Icons.paintBrush className={iconVariants({ variant: "large", className: "stroke-2" })} />
     Default Embed Color
    </Header2>
    <p className="mb-4 text-left">Change the color of the embeds sent by the bot. This will not affect embeds sent by other bots.</p>
    <ChangeEmbedColor serverId={serverDownload.id} serverColor={guild?.embedColor || globalConfig.defaultColor} serverIcon={serverDownload.icon} />
   </Block>

   <Block className="mt-4">
    <Header2>
     <Icons.shieldCheck className={iconVariants({ variant: "large", className: "stroke-2" })} />
     Dashboard Access
    </Header2>
    <p className="mb-4 text-left">
     Everyone with the roles that have the <code>MANAGE_GUILD</code> or <code>ADMINISTRATOR</code> permission can access the dashboard.
    </p>

    <div className="flex flex-wrap items-center justify-start gap-2">
     {serverDownload.roles.map((role) => {
      if (getPermissionNames(role.permissions).includes("ManageGuild") || getPermissionNames(role.permissions).includes("Administrator")) {
       return (
        <div key={role.id} className="flex items-center justify-start gap-2 rounded-full border border-neutral-700 px-2 py-1">
         <div
          className="h-4 min-h-4 w-4 min-w-4 rounded-full"
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
   <Block className="mt-4">
    <Header2>
     <Icons.users className={iconVariants({ variant: "large", className: "stroke-2" })} />
     Public Dashboard
    </Header2>
    <p className="mb-4 text-left">
     Everyone with the link can view public dashboard overview. This is useful for communities that want to show off their server. <span className="font-bold">The dashboard overview do not include any sensitive information.</span>
    </p>

    <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
     <Block className="flex flex-col items-start justify-start gap-2">
      <Header3>
       <Icons.check className={iconVariants({ variant: "large", className: "rounded-md border border-green-400 stroke-green-400 p-1" })} />
       Things that are shown:
      </Header3>
      <ul className="list-inside list-disc">
       <li>Server name and description</li>
       <li>Server member count</li>
       <li>Leaderboard</li>
       <li>Server emojis and stickers</li>
      </ul>
     </Block>
     <Block className="flex flex-col items-start justify-start gap-2">
      <Header3>
       <Icons.close className={iconVariants({ variant: "large", className: "rounded-md border border-red-400 stroke-red-400 p-1" })} />
       Things that are not shown:
      </Header3>
      <ul className="list-inside list-disc">
       <li>Server statistics</li>
       <li>Server settings</li>
       <li>Server moderation</li>
       <li>Server logs</li>
      </ul>
     </Block>
    </div>

    <EnablePublicDashboard enabled={Boolean(guild.publicPage)} serverId={serverDownload.id} vanityURL={guild.vanity || guild.guildId} />

    <div className="border-accent-primary bg-accent-primary/10 my-4 flex flex-row flex-wrap items-start whitespace-nowrap rounded-md border p-4">
     <span className="mr-1 flex flex-row items-center whitespace-nowrap font-bold">
      <Icons.info className={iconVariants({ variant: "normal", className: "stroke-accent-primary mr-1" })} />
      Note:
     </span>
     <span className="whitespace-normal">The public dashboard will be visible to everyone with the link!</span>
    </div>
   </Block>
   <Block className="mt-4">
    <Header2>
     <Icons.download className={iconVariants({ variant: "large", className: "stroke-2" })} />
     Download data
    </Header2>
    <p className="mt-2 leading-none text-white/70">
     Download all server data in a <code>.json</code> file. This includes logs, settings, moderation and more.
    </p>
    <ButtonPrimary className="mt-4 w-fit" href={`/api/settings/download/${serverDownload.id}`} target="_blank">
     <Icons.download className={iconVariants({ variant: "button" })} />
     Download data
    </ButtonPrimary>
   </Block>
   <Block theme="danger" className="mt-4">
    <Header2 className="text-red-400">
     <Icons.warning className={iconVariants({ variant: "large", className: "stroke-red-400 stroke-2" })} />
     Delete server data
    </Header2>
    <p className="mt-2 text-white/70">If you want to delete all data related to this server, you can do so by clicking the button below. This action is irreversible.</p>
    <DeleteServerData serverId={serverDownload.id} />
   </Block>
  </>
 );
}
