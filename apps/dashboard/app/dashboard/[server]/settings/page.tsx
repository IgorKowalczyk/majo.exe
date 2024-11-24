import { globalConfig } from "@majoexe/config";
import prismaClient from "@majoexe/database";
import { getGuildFromMemberGuilds, getGuild } from "@majoexe/util/functions/guild";
import { getPermissionNames } from "@majoexe/util/functions/user";
import { getSession } from "lib/session";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { Block } from "@/components/Block";
import { buttonVariants } from "@/components/Buttons";
import { ChangeEmbedColor } from "@/components/client/settings/ChangeEmbedColor";
import DeleteServerData from "@/components/client/settings/DeleteServerData";
import { PublicDashboard } from "@/components/client/settings/PublicDashboard";
import Header, { headerVariants } from "@/components/Headers";
import { Icons, iconVariants } from "@/components/Icons";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

export default async function Page(props: { params: Promise<{ server: string }> }) {
 const params = await props.params;
 const session = await getSession();
 if (!session || !session.access_token) redirect("/auth/login");
 const { server } = params;
 const serverDownload = await getGuild(server);
 if (!serverDownload || !serverDownload.bot) return notFound();
 const serverMember = await getGuildFromMemberGuilds(serverDownload.id, session.access_token);
 if (
  // prettier
  !serverMember ||
  !serverMember.permissions_names ||
  !serverMember.permissions_names.includes("ManageGuild") ||
  !serverMember.permissions_names.includes("Administrator")
 )
  return notFound();

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
   <Header className={twMerge(headerVariants({ variant: "h1", margin: "normal" }))}>
    <Icons.Settings className={iconVariants({ variant: "extraLarge" })} />
    Settings
   </Header>
   <p className="mb-4 text-left text-base md:text-lg">Configure the settings of the bot in your server.</p>
   <Block className="mt-4">
    <Header className={twMerge(headerVariants({ variant: "h2" }))}>
     <Icons.paintBrush className={iconVariants({ variant: "large", className: "!stroke-2" })} />
     Default Embed Color
    </Header>
    <p className="mb-4 text-left">Change the color of the embeds sent by the bot. This will not affect embeds sent by other bots.</p>
    <ChangeEmbedColor serverId={serverDownload.id} serverColor={guild.embedColor || globalConfig.defaultColor} />
   </Block>

   <Block className="mt-4">
    <Header className={twMerge(headerVariants({ variant: "h2" }))}>
     <Icons.ShieldCheck className={iconVariants({ variant: "large", className: "!stroke-2" })} />
     Dashboard Access
    </Header>
    <p className="mb-4 text-left">
     Everyone with the roles that have the <code>MANAGE_GUILD</code> or <code>ADMINISTRATOR</code> permission can access the dashboard.
    </p>

    <div className="flex flex-wrap items-center justify-start gap-2">
     {serverDownload.roles.map((role) => {
      if (getPermissionNames(role.permissions).includes("ManageGuild") || getPermissionNames(role.permissions).includes("Administrator")) {
       return (
        <div key={role.id} className="flex items-center justify-start gap-2 rounded-full border border-neutral-700 px-2 py-1">
         <div
          className="size-4 shrink-0 rounded-full"
          style={{
           backgroundColor: role.color ? `#${role.color.toString(16)}` : "#000000",
          }}
         />
         <p className="text-neutral-100">{role.name}</p>
        </div>
       );
      } else return null;
     })}
    </div>
   </Block>
   <Block className="mt-4">
    <Header className={twMerge(headerVariants({ variant: "h2" }))}>
     <Icons.Users className={iconVariants({ variant: "large", className: "!stroke-2" })} />
     Public Dashboard
    </Header>
    <p className="mb-4 text-left">
     Everyone with the link can view public dashboard overview. This is useful for communities that want to show off their server. <span className="font-bold">The dashboard overview do not include any sensitive information.</span>
    </p>

    <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
     <Block className="flex flex-col items-start justify-start gap-2">
      <Header className={twMerge(headerVariants({ variant: "h3" }))}>
       <Icons.Check className={iconVariants({ variant: "large", className: "stroke-green-500" })} />
       Things that are shown:
      </Header>
      <ul className="list-inside list-disc">
       <li>Server name and description</li>
       <li>Server member count</li>
       <li>Leaderboard</li>
       <li>Server emojis and stickers</li>
      </ul>
     </Block>
     <Block className="flex flex-col items-start justify-start gap-2">
      <Header className={twMerge(headerVariants({ variant: "h3" }))}>
       <Icons.close className={iconVariants({ variant: "large", className: "stroke-red-400" })} />
       Things that are not shown:
      </Header>
      <ul className="list-inside list-disc">
       <li>Server statistics</li>
       <li>Server settings</li>
       <li>Server moderation</li>
       <li>Server logs</li>
      </ul>
     </Block>
    </div>

    <PublicDashboard enabled={Boolean(guild.publicPage)} serverId={serverDownload.id} vanityURL={guild.vanity || guild.guildId} />
   </Block>
   <Block className="mt-4">
    <Header className={twMerge(headerVariants({ variant: "h2" }))}>
     <Icons.Download className={iconVariants({ variant: "large", className: "!stroke-2" })} />
     Download data
    </Header>
    <p className="mt-2 leading-none text-white/70">
     Download all server data in a <code>.json</code> file. This includes logs, settings, moderation and more.
    </p>
    <Link href={`/api/settings/download/${serverDownload.id}`} className={twMerge(buttonVariants({ variant: "primary" }), "mt-4 w-fit")} target="_blank">
     <Icons.Download className={iconVariants({ variant: "button" })} />
     Download data
    </Link>
   </Block>
   <Block theme="danger" className="mt-4">
    <Header className={twMerge(headerVariants({ variant: "h2" }))}>
     <Icons.warning className={iconVariants({ variant: "large", className: "stroke-red-400 stroke-2" })} />
     Delete server data
    </Header>
    <p className="mt-2 text-white/70">If you want to delete all data related to this server, you can do so by clicking the button below. This action is irreversible.</p>
    <DeleteServerData serverId={serverDownload.id} />
   </Block>
  </>
 );
}
