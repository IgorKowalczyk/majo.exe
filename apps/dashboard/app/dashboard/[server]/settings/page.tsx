import { globalConfig } from "@majoexe/config";
import prismaClient from "@majoexe/database";
import { getGuildFromMemberGuilds, getGuild } from "@majoexe/util/functions/guild";
import { getPermissionNames } from "@majoexe/util/functions/user";
import { getSession } from "lib/session";
import { CheckIcon, DownloadIcon, Paintbrush2Icon, SettingsIcon, ShieldCheckIcon, UsersIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { ChangeEmbedColor } from "@/app/dashboard/[server]/settings/components/ChangeEmbedColor";
import { DeleteServerData } from "@/app/dashboard/[server]/settings/components/DeleteServerData";
import { PublicDashboard } from "@/app/dashboard/[server]/settings/components/PublicDashboard";
import { Block } from "@/components/ui/Block";
import { buttonVariants } from "@/components/ui/Buttons";
import Header, { headerVariants } from "@/components/ui/Headers";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

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
      <Header className={cn(headerVariants({ variant: "h1", margin: "normal" }))}>
        <SettingsIcon className={iconVariants({ variant: "extraLarge" })} />
        Settings
      </Header>
      <p className="mb-4 text-left text-base md:text-lg">Configure the settings of the bot in your server.</p>
      <Block className="mt-4">
        <Header className={cn(headerVariants({ variant: "h2" }))}>
          <Paintbrush2Icon className={iconVariants({ variant: "large", className: "stroke-2!" })} />
          Default Embed Color
        </Header>
        <p className="mb-4 text-left">Change the color of the embeds sent by the bot. This will not affect embeds sent by other bots.</p>
        <ChangeEmbedColor serverId={serverDownload.id} serverColor={guild.embedColor || globalConfig.defaultColor} />
      </Block>

      <Block className="mt-4">
        <Header className={cn(headerVariants({ variant: "h2" }))}>
          <ShieldCheckIcon className={iconVariants({ variant: "large", className: "stroke-2!" })} />
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
        <Header className={cn(headerVariants({ variant: "h2" }))}>
          <UsersIcon className={iconVariants({ variant: "large", className: "stroke-2!" })} />
          Public Dashboard
        </Header>
        <p className="mb-4 text-left">
          Everyone with the link can view public dashboard overview. This is useful for communities that want to show off their server.{" "}
          <span className="font-bold">The dashboard overview do not include any sensitive information.</span>
        </p>

        <div className="mb-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Block className="flex flex-col items-start justify-start gap-2">
            <Header className={cn(headerVariants({ variant: "h3" }))}>
              <CheckIcon className={iconVariants({ variant: "large", className: "stroke-green-500" })} />
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
            <Header className={cn(headerVariants({ variant: "h3" }))}>
              <XIcon className={iconVariants({ variant: "large", className: "stroke-red-400" })} />
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
        <Header className={cn(headerVariants({ variant: "h2" }))}>
          <DownloadIcon className={iconVariants({ variant: "large", className: "stroke-2!" })} />
          Download data
        </Header>
        <p className="mt-2 leading-none text-white/70">
          Download all server data in a <code>.json</code> file. This includes logs, settings, moderation and more.
        </p>
        <Link href={`/api/settings/download/${serverDownload.id}`} className={cn(buttonVariants({ variant: "primary" }), "mt-4 w-fit")} target="_blank">
          <DownloadIcon className={iconVariants({ variant: "button" })} />
          Download data
        </Link>
      </Block>
      <Block theme="danger" className="mt-4">
        <Header className={cn(headerVariants({ variant: "h2" }))}>
          <Icons.warning className={iconVariants({ variant: "large", className: "stroke-red-400 stroke-2" })} />
          Delete server data
        </Header>
        <p className="mt-2 text-white/70">If you want to delete all data related to this server, you can do so by clicking the button below. This action is irreversible.</p>
        <DeleteServerData serverId={serverDownload.id} />
      </Block>
    </>
  );
}
