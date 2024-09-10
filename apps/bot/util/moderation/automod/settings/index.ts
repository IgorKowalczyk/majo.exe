import { syncAutoModRule } from "@majoexe/util/database";
import { ChatInputCommandInteraction, EmbedBuilder, codeBlock } from "discord.js";
import type { Majobot } from "../../../..";
import type { GuildSettings } from "../../../types/Command";

export async function autoModSettings(client: Majobot, interaction: ChatInputCommandInteraction, guildSettings: GuildSettings) {
 if (!interaction.guild) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used in a server.");

 const antiInviteRule = (await syncAutoModRule(interaction.guild.id, "anti-invite")) || false;
 const antiLinkRule = (await syncAutoModRule(interaction.guild.id, "anti-link")) || false;
 const antiMentionRule = (await syncAutoModRule(interaction.guild.id, "anti-mention")) || false;
 const antiSpamRule = (await syncAutoModRule(interaction.guild.id, "anti-spam")) || false;
 const antiBadWordsRule = (await syncAutoModRule(interaction.guild.id, "anti-bad-words")) || false;

 const embed = new EmbedBuilder()
  .setColor(guildSettings?.embedColor || client.config.defaultColor)
  .setTimestamp()
  .setTitle("🤖 Automoderation settings")
  .setDescription("> You can `enable`/`disable` automoderation systems using `/automod <subcommand>`")
  .setFields([
   {
    name: "🔗 Anti-invite system",
    value: codeBlock(antiInviteRule ? "✅ Enabled" : "❌ Disabled"),
    inline: false,
   },
   {
    name: "🔗 Anti-link system",
    value: codeBlock(antiLinkRule ? "✅ Enabled" : "❌ Disabled"),
    inline: false,
   },
   {
    name: "💭 Anti-mention system",
    value: codeBlock(antiMentionRule ? "✅ Enabled" : "❌ Disabled"),
    inline: false,
   },
   {
    name: "📨 Anti-spam system",
    value: codeBlock(antiSpamRule ? "✅ Enabled" : "❌ Disabled"),
    inline: false,
   },
   {
    name: "🤬 Anti-bad-words system",
    value: codeBlock(antiBadWordsRule ? "✅ Enabled" : "❌ Disabled"),
    inline: false,
   },
  ])
  .setThumbnail(
   interaction.guild.iconURL({
    size: 256,
   })
  )
  .setFooter({
   text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
   iconURL: interaction.user.displayAvatarURL({
    size: 256,
   }),
  });

 return interaction.followUp({ embeds: [embed] });
}
