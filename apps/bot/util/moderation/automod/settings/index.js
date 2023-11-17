import { fetchAutoModRules, syncAutoModRule } from "@majoexe/util/database";
import { EmbedBuilder, codeBlock } from "discord.js";

export async function autoModSettings(client, interaction, guildSettings) {
 let allRules = await fetchAutoModRules(interaction.guild.id);

 allRules.forEach(async (rule) => {
  try {
   allRules[allRules.indexOf(rule)] = await syncAutoModRule(interaction, rule.ruleType);
  } catch (err) {
   await client.errorMessages.createSlashError(interaction, `❌ Failed to sync rule \`${rule.ruleId}\``);
  }
 });

 const antiInviteRule = allRules.find((rule) => rule.ruleType === "anti-invite");
 const antiLinkRule = allRules.find((rule) => rule.ruleType === "anti-link");
 const antiMentionRule = allRules.find((rule) => rule.ruleType === "anti-mention");
 const antiSpamRule = allRules.find((rule) => rule.ruleType === "anti-spam");
 const antiBadWordsRule = allRules.find((rule) => rule.ruleType === "anti-bad-words");

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
   text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
   iconURL: interaction.user.displayAvatarURL({
    size: 256,
   }),
  });

 return interaction.followUp({ embeds: [embed] });
}
