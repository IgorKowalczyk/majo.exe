import prismaClient from "@majoexe/database";
import { getGuildChannels, getGuildFromMemberGuilds, getGuild } from "@majoexe/util/functions/guild";
import { ChannelType } from "discord-api-types/v10";
import { getSession } from "lib/session";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { ChangeCustomMessages } from "@/app/dashboard/[server]/messages/components/ChangeCustomMessages";
import { Block, ErrorBlock } from "@/components/ui/Block";
import Header, { headerVariants } from "@/components/ui/Headers";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export const metadata = {
 title: "Custom Messages",
 description: "Customize the messages sent by the bot.",
};

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
  include: {
   guildWelcomeMessage: true,
   guildLeaveMessage: true,
  },
 });

 if (!guild) return <ErrorBlock title="Could not fetch guild" description="Please try again later or contact support if the issue persists." />;

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

 return (
  <>
   <Header className={cn(headerVariants({ variant: "h1", margin: "normal" }))}>
    <Icons.messageCode className={iconVariants({ variant: "extraLarge" })} />
    Custom messages
   </Header>
   <p className="mb-4 text-left text-base md:text-lg">Customize the messages that are sent to your server members.</p>

   <Block className="mt-4 !overflow-x-visible">
    <ChangeCustomMessages
     type="welcome"
     serverId={serverDownload.id}
     enabled={guild.guildWelcomeMessage ? true : false}
     title={guild.guildWelcomeMessage?.title || "🎉 Welcome to the server {user}!"}
     description={guild.guildWelcomeMessage?.description || "> Welcome to **{guild}** We hope you enjoy your stay here!"}
     defaultMessages={{
      title: "🎉 Welcome to the server {user}!",
      description: "> Welcome to **{guild}** We hope you enjoy your stay here!",
     }}
     existingChannel={guild.guildWelcomeMessage?.channelId || null}
     allChannels={allChannels}
     replacedData={{
      user: session.global_name || serverMember.name,
      guild: serverDownload.name,
     }}
    />
   </Block>

   <Block className="mt-4 !overflow-x-visible">
    <ChangeCustomMessages
     type="leave"
     serverId={serverDownload.id}
     enabled={guild.guildLeaveMessage ? true : false}
     title={guild.guildLeaveMessage?.title || "👋 Goodbye {user}!"}
     description={guild.guildLeaveMessage?.description || "> We're sorry to see you go!"}
     defaultMessages={{
      title: "👋 Goodbye {user}!",
      description: "> We're sorry to see you go!",
     }}
     existingChannel={guild.guildLeaveMessage?.channelId || null}
     allChannels={allChannels}
     replacedData={{
      user: session.global_name || serverMember.name,
      guild: serverDownload.name,
     }}
    />
   </Block>
  </>
 );
}
