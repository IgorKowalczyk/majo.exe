import { syncAutoModRule } from "@nyxia/util/database";
import { EmbedBuilder } from "discord.js";

export async function disableAntiBadWords(client, interaction, guildSettings) {
 const createdRule = await syncAutoModRule(interaction.guild.id, "anti-bad-words");

 if (!createdRule) {
  return client.errorMessages.createSlashError(interaction, "❌ The anti-bad-words system is already `disabled`");
 }

 await interaction.guild.autoModerationRules.edit(createdRule.id, {
  enabled: false,
 });

 const embed = new EmbedBuilder()
  .setColor(guildSettings?.embedColor || client.config.defaultColor)
  .setTimestamp()
  .setTitle("⛔ Successfully `disabled` the anti-bad-words system")
  .setDescription("The anti-bad-words system has been `disabled`. Generic spam will no longer be blocked.")
  .setFooter({
   text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
   iconURL: interaction.member.user.displayAvatarURL({
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
