const { Color, isColor } = require("coloras");
const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "color",
 aliases: ["colors"],
 description: "Shows color info",
 category: "Utility",
 usage: "color <color>",
 run: async (client, message, args) => {
  try {
   let random;
   if (!args.join(" ")) {
    random = true;
   } else {
    if (!isColor(args.join(" ")).color) {
     return client.createError(message, `${client.bot_emojis.error} | This is not vaild color\n\n**Usage:** \`${client.prefix} color <color>\``);
    }
   }
   const value = random ? null : args.join(" ");
   const color = new Color(value);
   const embed = new MessageEmbed() // Prettier
    .setTitle("Color Info")
    .addField("HEX", "`" + color.toHex() + "`", true)
    .addField("RGB", "`" + color.toRgb() + "`", true)
    .addField("HSL", "`" + color.toHsl() + "`", true)
    .addField("HSV", "`" + color.toHsv() + "`", true)
    .addField("CMYK", "`" + color.toCmyk() + "`", true)
    .setImage(color.imageUrl)
    .setColor(color.toHex())
    .setFooter({
     text: `Requested by ${message.author.username}`,
     iconURL: message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });
   message.reply({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
