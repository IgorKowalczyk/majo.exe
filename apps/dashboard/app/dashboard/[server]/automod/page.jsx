

import { globalConfig } from "@nyxia/config";
import prismaClient from "@nyxia/database";
import { syncAutoModRule } from "@nyxia/util/database";
import { getGuildMember, getServer } from "@nyxia/util/functions/guild";
import { ChannelType } from "discord-api-types/v10";
import { getSession } from "lib/session";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { Block } from "@/components/Block";
import { AntiInvite } from "@/components/client/settings/automod/AntiInvite";
import { AntiLink } from "@/components/client/settings/automod/AntiLink";
import { Header1, Header2, Header5 } from "@/components/Headers";
import "tippy.js/dist/backdrop.css";
import "tippy.js/animations/shift-away.css";
import "tippy.js/dist/tippy.css";
import { Icons, iconVariants } from "@/components/Icons";
import { NavBadge } from "@/components/nav/client/SideNav";

export const metadata = {
 title: "Automod",
 description: "Automatically moderate your server, block bad words, links and other things.",
};

export default async function AutomodPage({ params }) {
 const session = await getSession();
 if (!session || !session.access_token) redirect("/auth/login");
 const { server } = params;
 const serverDownload = await getServer(server);
 if (!serverDownload || serverDownload.code === 10004 || !serverDownload.bot) return notFound();
 const serverMember = await getGuildMember(serverDownload.id, session.access_token);
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
 }).then((res) => res.json());

 const allChannelsFetch = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/guilds/${serverDownload.id}/channels`, {
  method: "GET",
  headers: {
   Authorization: `Bot ${process.env.TOKEN}`,
  },
 }).then((res) => res.json());

 const allRoles = allRolesFetch
  .map((role) => {
   if (role.name === "@everyone") return null;
   return {
    id: role.id,
    name: role.name,
    color: role.color ? `#${role.color.toString(16).toUpperCase()}` : "#FFFFFF",
   };
  })
  .filter(Boolean);

 const allChannels = allChannelsFetch
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
   <Header1>
    <Icons.bot className={iconVariants({ variant: "extraLarge" })} />
    Automod
   </Header1>
   <Header5 className="mb-4 mt-2 !justify-start !text-left">
    <span>Automatically moderate your server, block bad words, links and other things.</span>
   </Header5>
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
    <Header2>
     <Icons.mention className={iconVariants({ variant: "large" })} />
     Anti-Mention <NavBadge>Coming Soon</NavBadge>
    </Header2>
    <p className="mb-4 text-left">
     <span>Automatically delete all messages containing user mentions.</span>
    </p>
   </Block>
   <Block className="mb-4">
    <Header2>
     <Icons.messageOff className={iconVariants({ variant: "large" })} />
     Anti-Spam <NavBadge>Coming Soon</NavBadge>
    </Header2>
    <p className="mb-4 text-left">
     <span>Automatically delete all messages deemed as spam.</span>
    </p>
   </Block>
   <Block className="mb-4">
    <Header2>
     <Icons.shieldBan className={iconVariants({ variant: "large" })} />
     Anti-Badwords <NavBadge>Coming Soon</NavBadge>
    </Header2>
    <p className="mb-4 text-left">
     <span>Automatically delete all messages containing bad words or phrases.</span>
    </p>
   </Block>
  </>
 );
}
