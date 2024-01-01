import { globalConfig } from "@majoexe/config";
import prismaClient from "@majoexe/database";
import { getGuildMember, getServer } from "@majoexe/util/functions/guild";
import { ChannelType } from "discord-api-types/v10";
import { getSession } from "lib/session";
import { redirect } from "next/navigation";
import { Block } from "@/components/Block";
import { ChangeMessages } from "@/components/client/settings/ChangeCustomMessages";
import { Header1 } from "@/components/Headers";
import { Icons, iconVariants } from "@/components/Icons";

export const metadata = {
 title: "Custom Messages",
 description: "Customize the messages sent by the bot.",
};

export default async function CustomMessagesPage({ params }) {
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
  include: {
   guildWelcomeMessage: true,
   guildLeaveMessage: true,
  },
 });

 const allChannelsFetch = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/guilds/${serverDownload.id}/channels`, {
  method: "GET",
  headers: {
   Authorization: `Bot ${process.env.TOKEN}`,
  },
 }).then((res) => res.json());

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
    <Icons.messageCode className={iconVariants({ variant: "extraLarge" })} />
    Custom messages
   </Header1>

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
      user: session.global_name || serverMember.username || serverMember.name,
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
      user: session.global_name || serverMember.username || serverMember.name,
      guild: serverDownload.name,
     }}
    />
   </Block>
  </>
 );
}
