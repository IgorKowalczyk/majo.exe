import { syncDatabaseAutoModRule } from "@majoexe/util/database";
import { ChatInputCommandInteraction, EmbedBuilder, codeBlock } from "discord.js";
import type { Majobot } from "@/index";
import type { GuildSettings } from "@/util/types/Command";

export async function autoModSettings(client: Majobot, interaction: ChatInputCommandInteraction, guildSettings: GuildSettings) {
 if (!interaction.guild) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used in a server.");

 const antiInviteRule = await syncDatabaseAutoModRule(interaction.guild.id, "anti-invite");
 const antiLinkRule = await syncDatabaseAutoModRule(interaction.guild.id, "anti-link");
 const antiMentionRule = await syncDatabaseAutoModRule(interaction.guild.id, "anti-mention");
 const antiSpamRule = await syncDatabaseAutoModRule(interaction.guild.id, "anti-spam");
 const antiBadWordsRule = await syncDatabaseAutoModRule(interaction.guild.id, "anti-bad-words");

 const embed = new EmbedBuilder()
  .setColor(guildSettings?.embedColor || client.config.defaultColor)
  .setTimestamp()
  .setTitle("🤖 Automoderation settings")
  .setDescription("> You can `enable`/`disable` automoderation systems using `/automod <subcommand>`")
  .setFields([
   {
    name: "🔗 Anti-invite system",
    value: codeBlock(antiInviteRule?.enabled ? "✅ Enabled" : "❌ Disabled"),
    inline: false,
   },
   {
    name: "🔗 Anti-link system",
    value: codeBlock(antiLinkRule?.enabled ? "✅ Enabled" : "❌ Disabled"),
    inline: false,
   },
   {
    name: "💭 Anti-mention system",
    value: codeBlock(antiMentionRule?.enabled ? "✅ Enabled" : "❌ Disabled"),
    inline: false,
   },
   {
    name: "📨 Anti-spam system",
    value: codeBlock(antiSpamRule?.enabled ? "✅ Enabled" : "❌ Disabled"),
    inline: false,
   },
   {
    name: "🤬 Anti-bad-words system",
    value: codeBlock(antiBadWordsRule?.enabled ? "✅ Enabled" : "❌ Disabled"),
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
