import prismaClient from "@majoexe/database";
import { syncDatabaseAutoModRule } from "@majoexe/util/database";
import { getGuildFromMemberGuilds, getGuild, getGuildRoles, getGuildChannels } from "@majoexe/util/functions/guild";
import { ChannelType } from "discord-api-types/v10";
import { getSession } from "lib/session";
import { BotIcon, ShieldBanIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { AntiMention } from "./components/AntiMention";
import { AntiSpam } from "./components/AntiSpam";
import { AntiInvite } from "@/app/dashboard/[server]/automod/components/AntiInvite";
import { AntiLink } from "@/app/dashboard/[server]/automod/components/AntiLink";
import { Badge } from "@/components/ui/Badge";
import { Block } from "@/components/ui/Block";
import Header, { headerVariants } from "@/components/ui/Headers";
import { iconVariants } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Automod",
  description: "Automatically moderate your server, block bad words, links and other things.",
};

export const dynamic = "force-dynamic";

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

  const enabledAntiInvite = await syncDatabaseAutoModRule(serverDownload.id, "anti-invite");
  const enabledAntiLink = await syncDatabaseAutoModRule(serverDownload.id, "anti-link");
  const enabledAntiSpam = await syncDatabaseAutoModRule(serverDownload.id, "anti-spam");
  const enabledAntiMention = await syncDatabaseAutoModRule(serverDownload.id, "anti-mention");

  const allChannels = (await getGuildChannels(serverDownload.id, [ChannelType.GuildText])) || [];
  const allRolesFetch = (await getGuildRoles(serverDownload.id)) || [];

  const allRoles = allRolesFetch.map((role) => {
    if (role.name === "@everyone") return null;
    return {
      id: role.id,
      name: role.name,
      color: role.color ? `#${role.color.toString(16).toUpperCase()}` : "#FFFFFF",
    };
  });

  return (
    <>
      <Header className={cn(headerVariants({ variant: "h1", margin: "normal" }))}>
        <BotIcon className={iconVariants({ variant: "extraLarge" })} />
        Automod
      </Header>
      <p className="mb-4 text-left text-base md:text-lg">Automatically moderate your server, block bad words, links and other things.</p>
      <Block className="mb-6">
        {enabledAntiInvite ? ( // prettier
          <AntiInvite
            serverId={serverDownload.id}
            existingExemptChannels={enabledAntiInvite.exempt_channels}
            existingExemptRoles={enabledAntiInvite.exempt_roles}
            enabled={enabledAntiInvite.enabled}
            existingActions={enabledAntiInvite.actions}
            allRoles={allRoles}
            allChannels={allChannels}
          />
        ) : (
          <AntiInvite
            serverId={serverDownload.id}
            existingExemptChannels={[]}
            existingExemptRoles={[]}
            enabled={false}
            existingActions={[]}
            allRoles={allRoles}
            allChannels={allChannels}
          />
        )}
      </Block>
      <Block className="mb-6">
        {enabledAntiLink ? ( // prettier
          <AntiLink
            serverId={serverDownload.id}
            existingExemptChannels={enabledAntiLink.exempt_channels}
            existingExemptRoles={enabledAntiLink.exempt_roles}
            enabled={enabledAntiLink.enabled}
            existingActions={enabledAntiLink.actions}
            allRoles={allRoles}
            allChannels={allChannels}
          />
        ) : (
          <AntiLink
            serverId={serverDownload.id}
            existingExemptChannels={[]}
            existingExemptRoles={[]}
            enabled={false}
            existingActions={[]}
            allRoles={allRoles}
            allChannels={allChannels}
          />
        )}
      </Block>
      <Block className="mb-6">
        {enabledAntiMention ? ( // prettier
          <AntiMention
            serverId={serverDownload.id}
            existingExemptChannels={enabledAntiMention.exempt_channels}
            existingExemptRoles={enabledAntiMention.exempt_roles}
            enabled={enabledAntiMention.enabled}
            existingActions={enabledAntiMention.actions}
            allRoles={allRoles}
            allChannels={allChannels}
          />
        ) : (
          <AntiMention
            serverId={serverDownload.id}
            existingExemptChannels={[]}
            existingExemptRoles={[]}
            enabled={false}
            existingActions={[]}
            allRoles={allRoles}
            allChannels={allChannels}
          />
        )}
      </Block>
      <Block className="mb-6">
        {enabledAntiSpam ? ( // prettier
          <AntiSpam
            serverId={serverDownload.id}
            existingExemptChannels={enabledAntiSpam.exempt_channels}
            existingExemptRoles={enabledAntiSpam.exempt_roles}
            enabled={enabledAntiSpam.enabled}
            existingActions={enabledAntiSpam.actions}
            allRoles={allRoles}
            allChannels={allChannels}
          />
        ) : (
          <AntiSpam
            serverId={serverDownload.id}
            existingExemptChannels={[]}
            existingExemptRoles={[]}
            enabled={false}
            existingActions={[]}
            allRoles={allRoles}
            allChannels={allChannels}
          />
        )}
      </Block>
      <Block className="mb-6">
        <Header className={cn(headerVariants({ variant: "h2" }))}>
          <ShieldBanIcon className={iconVariants({ variant: "large" })} />
          Anti-Badwords <Badge>Coming Soon</Badge>
        </Header>
        <p className="mb-4 text-left">
          <span>Automatically delete all messages containing bad words or phrases.</span>
        </p>
        <p className="mb-4 text-left font-bold">
          <span>
            Enabling this rule here is not yet supported. Please use the <code>/automod anti-bad-words enable</code> command in chat.
          </span>
        </p>
      </Block>
    </>
  );
}
