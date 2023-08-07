import { Color, isColor } from "coloras";
import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } from "discord.js";

export default {
 name: "color",
 description: "🎨 Display color info",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 dm_permission: false,
 usage: "/color [color]",
 options: [
  {
   name: "color",
   description: "The color to get info about",
   required: false,
   type: ApplicationCommandOptionType.String,
  },
 ],
 run: async (client, interaction, guildSettings) => {
  try {
   const color = interaction.options.getString("color");
   let random;
   !color ? (random = true) : (random = false);

   if (!random && !isColor(color).color) {
    const embed = new EmbedBuilder()
     .setColor("#EF4444")
     .setTimestamp()
     .setTitle("❌ Invalid color")
     .setDescription("> The color you provided is invalid")
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

   const value = random ? null : color;

   const colorInfo = new Color(value);

   const embed = new EmbedBuilder()
    .setTitle(random ? `${client.botEmojis.color} Random Color` : `${client.botEmojis.color} Color: ${colorInfo.toHex()}`)

    .addFields([
     {
      name: "HEX",
      value: `> \`${colorInfo.toHex()}\``,
      inline: true,
     },
     {
      name: "RGB",
      value: `> \`${colorInfo.toRgb()}\``,
      inline: true,
     },
     {
      name: "HSL",
      value: `> \`${colorInfo.toHsl()}\``,
      inline: true,
     },
     {
      name: "HSV",
      value: `> \`${colorInfo.toHsv()}\``,
      inline: true,
     },
     {
      name: "CMYK",
      value: `> \`${colorInfo.toCmyk()}\``,
      inline: true,
     },
    ])
    .setImage(colorInfo.imageUrl)
    .setColor(colorInfo.toHex())
    .setTimestamp()
    .setFooter({
     text: `Requested by ${interaction.member?.user?.username}`,
     iconURL: interaction.member?.user?.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });

   return interaction.followUp({ ephemeral: true, embeds: [embed] });
  } catch (err) {
   client.errorMessages.generateErrorMessage(interaction, err);
  }
 },
};
