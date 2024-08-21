import { syncAutoModRule } from "@majoexe/util/database";
import { EmbedBuilder } from "discord.js";

export async function disableAntiInvite(client, interaction, guildSettings) {
 const createdRule = await syncAutoModRule(interaction.guild.id, "anti-invite");

 if (!createdRule) {
  return client.errorMessages.createSlashError(interaction, "❌ The anti-invite system is already `disabled`");
 }

 await interaction.guild.autoModerationRules.edit(createdRule.id, {
  enabled: false,
 });

 const embed = new EmbedBuilder()
  .setColor(guildSettings?.embedColor || client.config.defaultColor)
  .setTimestamp()
  .setTitle("⛔ Successfully `disabled` the anti-invite system")
  .setDescription("The anti-invite system has been `disabled`. All Discord invites will no longer be blocked.")
  .setFooter({
   text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
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
