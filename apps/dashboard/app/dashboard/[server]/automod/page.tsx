import { globalConfig } from "@majoexe/config";
import prismaClient from "@majoexe/database";
import { syncAutoModRule } from "@majoexe/util/database";
import { getGuildFromMemberGuilds, getGuild } from "@majoexe/util/functions/guild";
import { APIGuildChannel, APIRole, ChannelType, GuildChannelType } from "discord-api-types/v10";
import { getSession } from "lib/session";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { Block } from "@/components/Block";
import { AntiInvite } from "@/components/client/settings/automod/AntiInvite";
import { AntiLink } from "@/components/client/settings/automod/AntiLink";
import Header, { headerVariants } from "@/components/Headers";
import "tippy.js/dist/backdrop.css";
import "tippy.js/animations/shift-away.css";
import "tippy.js/dist/tippy.css";
import { Icons, iconVariants } from "@/components/Icons";
import { NavBadge } from "@/components/nav/client/SideNav";
import { twMerge } from "tailwind-merge";

export const metadata = {
 title: "Automod",
 description: "Automatically moderate your server, block bad words, links and other things.",
};

export default async function AutomodPage(props: { params: Promise<{ server: string }> }) {
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

 await prismaClient.guild.upsert({
  where: {
   guildId: serverDownload.id,
  },
  update: {},
  create: {
   guildId: serverDownload.id,
  },
  include: {
   autoMod: {
    where: {
     guildId: serverDownload.id,
    },
   },
  },
 });

 const enabledAntiInvite = (await syncAutoModRule(serverDownload.id, "anti-invite")) || false;
 const enabledAntiLink = (await syncAutoModRule(serverDownload.id, "anti-link")) || false;

 const allRolesFetch = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/guilds/${serverDownload.id}/roles`, {
  method: "GET",
  headers: {
   Authorization: `Bot ${process.env.TOKEN}`,
  },
 });

 const allChannelsFetch = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/guilds/${serverDownload.id}/channels`, {
  method: "GET",
  headers: {
   Authorization: `Bot ${process.env.TOKEN}`,
  },
 });

 const allChannelsJson = (await allChannelsFetch.json()) as APIGuildChannel<GuildChannelType>[];
 const allRolesJson = (await allRolesFetch.json()) as APIRole[];

 const allRoles = allRolesJson
  .map((role) => {
   if (role.name === "@everyone") return null;
   return {
    id: role.id,
    name: role.name,
    color: role.color ? `#${role.color.toString(16).toUpperCase()}` : "#FFFFFF",
   };
  })
  .filter(Boolean);

 const allChannels = allChannelsJson
  .map((channel) => {
   if (channel.type !== ChannelType.GuildText) return null;

   return {
    id: channel.id,
    name: channel.name,
   };
  })
  .filter(Boolean);

 return (
  <>
   <Header className={twMerge(headerVariants({ variant: "h1" }))}>
    <Icons.Bot className={iconVariants({ variant: "extraLarge" })} />
    Automod
   </Header>
   <p className="mb-4 text-left text-base md:text-lg">Automatically moderate your server, block bad words, links and other things.</p>
   <Block className="mb-4">
    {enabledAntiInvite ? ( // prettier
     <AntiInvite serverId={serverDownload.id} existingExemptChannels={enabledAntiInvite.exempt_channels || []} existingExemptRoles={enabledAntiInvite.exempt_roles || []} enabled={enabledAntiInvite.enabled || false} existingActions={enabledAntiInvite.actions || []} allRoles={allRoles} allChannels={allChannels} />
    ) : (
     <AntiInvite serverId={serverDownload.id} existingExemptChannels={[]} existingExemptRoles={[]} enabled={false} existingActions={[]} allRoles={allRoles} allChannels={allChannels} />
    )}
   </Block>
   <Block className="mb-4">
    {enabledAntiLink ? ( // prettier
     <AntiLink serverId={serverDownload.id} existingExemptChannels={enabledAntiLink.exempt_channels || []} existingExemptRoles={enabledAntiLink.exempt_roles || []} enabled={enabledAntiLink.enabled || false} existingActions={enabledAntiLink.actions || []} allRoles={allRoles} allChannels={allChannels} />
    ) : (
     <AntiLink serverId={serverDownload.id} existingExemptChannels={[]} existingExemptRoles={[]} enabled={false} existingActions={[]} allRoles={allRoles} allChannels={allChannels} />
    )}
   </Block>
   <Block className="mb-4">
    <Header className={twMerge(headerVariants({ variant: "h2" }))}>
     <Icons.mention className={iconVariants({ variant: "large" })} />
     Anti-Mention <NavBadge>Coming Soon</NavBadge>
    </Header>
    <p className="mb-4 text-left">
     <span>Automatically delete all messages containing user mentions.</span>
    </p>
   </Block>
   <Block className="mb-4">
    <Header className={twMerge(headerVariants({ variant: "h2" }))}>
     <Icons.messageOff className={iconVariants({ variant: "large" })} />
     Anti-Spam <NavBadge>Coming Soon</NavBadge>
    </Header>
    <p className="mb-4 text-left">
     <span>Automatically delete all messages deemed as spam.</span>
    </p>
   </Block>
   <Block className="mb-4">
    <Header className={twMerge(headerVariants({ variant: "h2" }))}>
     <Icons.ShieldBan className={iconVariants({ variant: "large" })} />
     Anti-Badwords <NavBadge>Coming Soon</NavBadge>
    </Header>
    <p className="mb-4 text-left">
     <span>Automatically delete all messages containing bad words or phrases.</span>
    </p>
   </Block>
  </>
 );
}
