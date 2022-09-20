const { Color, isColor } = require("coloras");
const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "color",
 description: "🎨 Shows color info",
 category: "Utility",
 usage: "/color [color]",
 options: [
  {
   name: "color",
   description: "The color to show info about",
   required: false,
   type: 3,
  },
 ],
 run: async (client, interaction, args) => {
  try {
   !args[0] ? (random = true) : (random = false);
   if (!random && !isColor(args[0]).color) {
    return client.createSlashError(interaction, `${client.bot_emojis.error} | Please provide a valid color`);
   }
   console.log(random);
   const value = random ? null : args[0];
   console.log(value);
   const color = new Color(value);
   const embed = new MessageEmbed() // Prettier
    .setTitle(random ? `${client.bot_emojis.color} Random Color` : `${client.bot_emojis.color} Color: ${color.toHex()}`)
    .addField("HEX", `> \`${color.toHex()}\``, true)
    .addField("RGB", `> \`${color.toRgb()}\``, true)
    .addField("HSL", `> \`${color.toHsl()}\``, true)
    .addField("HSV", `> \`${color.toHsv()}\``, true)
    .addField("CMYK", `> \`${color.toCmyk()}\``, true)
    .setImage(color.imageUrl)
    .setColor(color.toHex())
    .setFooter({
     text: `Requested by ${interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });
   interaction.followUp({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
