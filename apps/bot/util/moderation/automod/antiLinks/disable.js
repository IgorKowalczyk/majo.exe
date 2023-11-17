import { disableAutoModRule, syncAutoModRule } from "@majoexe/util/database";
import { EmbedBuilder } from "discord.js";

export async function disableAntiLink(client, interaction, guildSettings) {
 const createdRule = await syncAutoModRule(interaction, "anti-link");

 if (!createdRule || (createdRule && !createdRule.enabled)) {
  return client.errorMessages.createSlashError(interaction, "❌ The anti-link system is already `disabled`");
 }

 await interaction.guild.autoModerationRules.edit(createdRule.ruleId, {
  enabled: false,
 });

 await disableAutoModRule(interaction.guild.id, createdRule.ruleId);

 const embed = new EmbedBuilder()
  .setColor(guildSettings?.embedColor || client.config.defaultColor)
  .setTimestamp()
  .setTitle("⛔ Successfully `disabled` the anti-link system")
  .setDescription("The anti-link system has been `disabled`. All links will no longer be blocked.")
  .setFooter({
   text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
   iconURL: interaction.user.displayAvatarURL({
    size: 256,
   }),
  })
  .setThumbnail(
   interaction.guild.iconURL({
    size: 256,
   })
  );

 return interaction.followUp({ embeds: [embed] });
}
