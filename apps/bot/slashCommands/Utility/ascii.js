import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import figlet from "figlet";
import { createPaste } from "hastebin";

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
  },
 ],
 run: async (client, interaction, guildSettings) => {
  try {
   const text = interaction.options.getString("text");

   if (text.length > 500) {
    const embed = new EmbedBuilder()
     .setColor("#EF4444")
     .setTimestamp()
     .setTitle("❌ Invalid text")
     .setDescription("> The text you provided is too long")
     .setFooter({
      text: `Requested by ${interaction.member?.user?.username}`,
      iconURL: interaction.member?.user?.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     });
    return interaction.followUp({ ephemeral: true, embeds: [embed] });
   }

   figlet(text, (err, data) => {
    if (err) {
     const embed = new EmbedBuilder()
      .setColor("#EF4444")
      .setTimestamp()
      .setTitle("❌ Something went wrong")
      .setDescription("> An error occurred while converting the text to ASCII")
      .setFooter({
       text: `Requested by ${interaction.member?.user?.username}`,
       iconURL: interaction.member?.user?.displayAvatarURL({
        dynamic: true,
        format: "png",
        size: 2048,
       }),
      });
     return interaction.followUp({ ephemeral: true, embeds: [embed] });
    }

    createPaste(
     data,
     {
      raw: true,
      contentType: "text/plain",
      server: "https://haste.zneix.eu/",
     },
     {}
    ).then((paste) => {
     const embed = new EmbedBuilder()
      .setColor(guildSettings?.embedColor || client.config.global.defaultColor)
      .setTimestamp()
      .setTitle(`${client.botEmojis.success} Your ascii code has been successfully generated!`)
      .setDescription(`> ${client.botEmojis.link} Link to ascii code paste: ${paste}`)
      .setFooter({
       text: `Requested by ${interaction.member?.user?.username}`,
       iconURL: interaction.member?.user?.displayAvatarURL({
        dynamic: true,
        format: "png",
        size: 2048,
       }),
      });

     const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("View ascii code").setURL(paste));

     return interaction.followUp({ ephemeral: false, embeds: [embed], components: [row] });
    });
   });
  } catch (err) {
   client.errorMessages.generateErrorMessage(interaction, err);
  }
 },
};
