import { globalConfig } from "@majoexe/config";
import prismaClient from "@majoexe/database";
import { getGuildChannels, getGuildMember, getServer } from "@majoexe/util/functions/guild";
import { APIGuildChannel, ChannelType, GuildChannelType } from "discord-api-types/v10";
import { getSession } from "lib/session";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { Block, ErrorBlock } from "@/components/Block";
import { ChangeMessages } from "@/components/client/settings/ChangeCustomMessages";
import Header, { headerVariants } from "@/components/Headers";
import { Icons, iconVariants } from "@/components/Icons";
import { twMerge } from "tailwind-merge";

export const metadata = {
 title: "Custom Messages",
 description: "Customize the messages sent by the bot.",
};

export default async function Page(props: { params: Promise<{ server: string }> }) {
 const params = await props.params;
 const session = await getSession();
 if (!session || !session.access_token) redirect("/auth/login");
 const { server } = params;
 const serverDownload = await getServer(server);
 if (!serverDownload || !serverDownload.bot) return notFound();
 const serverMember = await getGuildMember(serverDownload.id, session.access_token);
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
   <Header className={twMerge(headerVariants({ variant: "h1" }))}>
    <Icons.messageCode className={iconVariants({ variant: "extraLarge" })} />
    Custom messages
   </Header>

   <Block className="mt-4 !overflow-x-visible">
    <ChangeMessages
     type="welcome"
     serverId={serverDownload.id}
     enabled={guild.guildWelcomeMessage ? true : false}
     title={guild.guildWelcomeMessage?.title || "🎉 Welcome to the server {user}!"}
     description={guild.guildWelcomeMessage?.description || "> Welcome to **{guild}** We hope you enjoy your stay here!"}
     defaultMessages={{
      title: "🎉 Welcome to the server {user}!",
      description: "> Welcome to **{guild}** We hope you enjoy your stay here!",
     }}
     existingChannel={guild.guildWelcomeMessage?.channelId}
     allChannels={allChannels}
     replacedData={{
      user: session.global_name || serverMember.name,
      guild: serverDownload.name,
     }}
    />
   </Block>

   <Block className="mt-4 !overflow-x-visible">
    <ChangeMessages
     type="leave"
     serverId={serverDownload.id}
     enabled={guild.guildLeaveMessage ? true : false}
     title={guild.guildLeaveMessage?.title || "👋 Goodbye {user}!"}
     description={guild.guildLeaveMessage?.description || "> We're sorry to see you go!"}
     defaultMessages={{
      title: "👋 Goodbye {user}!",
      description: "> We're sorry to see you go!",
     }}
     existingChannel={guild.guildLeaveMessage?.channelId}
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
