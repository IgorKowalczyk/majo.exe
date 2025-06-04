import prismaClient from "@majoexe/database";
import { GuildLogType } from "@majoexe/database/types";
import { ExcludedEvents } from "@majoexe/util/database";
import { getGuildFromMemberGuilds, getGuild, getGuildChannels } from "@majoexe/util/functions/guild";
import { ChannelType } from "discord-api-types/v10";
import { getSession } from "lib/session";
import { ScrollTextIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { UpdateLogs } from "./components/UpdateLogs";
import { ErrorBlock } from "@/components/ui/Block";
import Header, { headerVariants } from "@/components/ui/Headers";
import { iconVariants } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export const metadata = {
 title: "Logs",
 description: "All the logs of the different actions that have been happening on your dashboard.",
};

export const dynamic = "force-dynamic";

export default async function LogsPage(props: { params: Promise<{ server: string }> }) {
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
  include: {
   guildLogsSettings: {
    select: {
     type: true,
     enabled: true,
     channelId: true,
    },
   },
  },
 });

 const channels = await getGuildChannels(serverDownload.id, [ChannelType.GuildText]);
 if (!channels) return <ErrorBlock title="Could not fetch channels" description="Please try again later or contact support if the issue persists." />;

 const allChannels = channels
  .map((channel) => {
   return {
    id: channel.id,
    name: channel.name,
   };
  })
  .filter(Boolean);

 const allowedEvents = Object.keys(GuildLogType).filter((x) => !ExcludedEvents.includes(x as GuildLogType)) as GuildLogType[];

 return (
  <>
   <Header className={cn(headerVariants({ variant: "h1", margin: "normal" }))}>
    <ScrollTextIcon className={iconVariants({ variant: "extraLarge" })} />
    Logs
   </Header>
   <p className="mb-4 text-left text-base md:text-lg">Manage the actions that Majo.exe can watch and log in selected channels.</p>
   <UpdateLogs allowedLogs={allowedEvents} allChannels={allChannels} serverId={serverDownload.id} logs={guild.guildLogsSettings} />
  </>
 );
}
