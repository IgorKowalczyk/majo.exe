const pop = require("popcat-wrapper");
const Discord = require("discord.js");

module.exports = {
 name: "color",
 aliases: ["colors"],
 description: "Shows color info",
 category: "Utility",
 usage: "color <hex color>",
 run: async (client, message, args) => {
  try {
   let color = args[0];
   if (!color) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: "<:error:860884617770303519> | Please provide a HEX color code!",
     },
    });
   }
   if (color.includes("#")) {
    color = color.split("#")[1];
   }
   try {
    const info = await pop.colorinfo(color);
    const embed = new Discord.MessageEmbed() // Prettier
     .setTitle("Color Info")
     .addField("Name", info.name, true)
     .addField("Hex", "`" + info.hex + "`", true)
     .addField("RGB", "`" + info.rgb + "`", true)
     .addField("Brighter Shade", "`" + info.brightened + "`", true)
     .setImage(info.color_image)
     .setColor(info.hex);
    message.lineReply(embed);
   } catch (err) {
    message.lineReply({
     embed: {
      color: 16734039,
      description: "<:error:860884617770303519> | Please provide a vaild HEX color code!",
     },
    });
   }
  } catch (err) {
   message.lineReply({
    embed: {
     color: 16734039,
     description: "Something went wrong... :cry:",
    },
   });
  }
 },
};
