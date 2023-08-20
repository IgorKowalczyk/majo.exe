import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, AttachmentBuilder } from "discord.js";
import figlet from "figlet";

export default {
 name: "ascii",
 description: "✍️ Convert text to ASCII",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 dm_permission: false,
 usage: "/ascii <text>",
 options: [
  {
   name: "text",
   description: "The text to convert",
   required: true,
   type: ApplicationCommandOptionType.String,
   max_length: 500,
  },
 ],
 run: async (client, interaction, guildSettings) => {
  try {
   const text = interaction.options.getString("text");

   figlet(text, (err, data) => {
    if (err) {
     return client.errorMessages.createSlashError(interaction, "❌ An error occurred while converting the text to ASCII");
    }

    const embed = new EmbedBuilder()
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setTitle(`${client.config.emojis.success} Your ascii code has been successfully generated!`)
     .setFooter({
      text: `Requested by ${interaction.member.user.username}`,
      iconURL: interaction.member.user.displayAvatarURL({
       size: 256,
      }),
     });

    const attached = new AttachmentBuilder().setName("ascii.txt").setFile(Buffer.from(data));
    return interaction.followUp({ ephemeral: false, embeds: [embed], files: [attached] });
   });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
};
