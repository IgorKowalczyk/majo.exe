import { GuildLogType } from "@majoexe/database";
import { getGuildLogSettings } from "@majoexe/util/database";
import { Guild, EmbedBuilder, PollAnswer, Snowflake } from "discord.js";
import type { Majobot } from "@/index";

export async function messagePollVoteRemove(client: Majobot, poolAnswer: PollAnswer, userId: Snowflake) {
 try {
  if (!poolAnswer.poll.message.guild) return;
  const settings = await getGuildLogSettings(poolAnswer.poll.message.guild.id, GuildLogType.MessagePollVoteRemove);
  if (!settings?.enabled || !settings.channelId) return;
  const discordGuild = poolAnswer.poll.message.guild as Guild;
  const channel = await discordGuild.channels.fetch(settings.channelId);
  if (!channel || !channel.isTextBased()) return;

  const fields = [
   {
    name: "Poll",
    value: poolAnswer.poll.message.toString(),
   },
   {
    name: "Answer",
    value: `${poolAnswer.emoji?.toString() || poolAnswer.emoji?.name || "Unknown"} ${poolAnswer.text}`,
   },
   {
    name: "Vote Count",
    value: poolAnswer.voteCount.toString(),
   },
   {
    name: "User",
    value: `<@${userId}>`,
   },
  ];

  const embed = new EmbedBuilder()
   .setTitle("🗳️ Poll Vote removed")
   .setFields(fields)
   .setColor("#3B82F6")
   .setTimestamp()
   .setFooter({
    text: `Poll ID: ${poolAnswer.poll.message.id}`,
    iconURL: discordGuild.iconURL() || undefined,
   });

  channel.send({ embeds: [embed] });
 } catch (err: unknown) {
  client.debugger("error", err);
 }
}
