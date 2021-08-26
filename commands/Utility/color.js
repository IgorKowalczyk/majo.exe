const { Color, isColor } = require("coloras");
const Discord = require("discord.js");

module.exports = {
 name: "color",
 aliases: ["colors"],
 description: "Shows color info",
 category: "Utility",
 usage: "color <hex color>",
 run: async (client, message, args) => {
  try {
   let random;
   if (!args.join(" ")) {
    random = true;
   } else {
    if (!isColor(args.join(" ")).color) {
     return message.lineReply({
      embed: {
       color: 16734039,
       description: `${client.bot_emojis.error} | This is not a vaild color!`,
      },
     });
    }
   }
   const value = random ? null : args.join(" ");
   const color = new Color(value);
   const embed = new Discord.MessageEmbed() // Prettier
    .setTitle("Color Info")
    .addField("HEX", "`" + color.toHex() + "`", true)
    .addField("RGB", "`" + color.toRgb() + "`", true)
    .addField("HSL", "`" + color.toHsl() + "`", true)
    .addField("HSV", "`" + color.toHsv() + "`", true)
    .addField("CMYK", "`" + color.toCmyk() + "`", true)
    .setImage(color.imageUrl)
    .setColor(color.toHex());
   message.lineReply(embed);
  } catch (err) {
   console.log(err);
   message.lineReply({
    embed: {
     color: 16734039,
     description: `Something went wrong... ${client.bot_emojis.sadness}`,
    },
   });
  }
 },
};
