const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const config = require("../../config");

module.exports = {
 name: "uptime",
 aliases: ["bot", "botuptime"],
 description: "Display a bot uptime",
 category: "General",
 usage: "uptime",
 run: async (client, message, args) => {
  try {
   const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
   const date = new Date();
   const timestamp = date.getTime() - Math.floor(client.uptime);
   const embed = new Discord.MessageEmbed() // Prettier()
    .setTitle(
     ":hourglass_flowing_sand: Uptime",
     message.guild.iconURL({
      dynamic: true,
      format: "png",
     })
    )
    .addField("⏱️ Uptime", `\`\`\`${duration}\`\`\``)
    .addField("🚀 Date Launched", `\`\`\`${moment(timestamp).format("LLLL")}\`\`\``)
    .setTimestamp()
    .setFooter(
     "Requested by " + `${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    )
    .setColor("RANDOM");
   if (config.status) {
    embed.addField("<:online:871409206748667904> Servers Status", "```" + config.status + "```");
   }
   message.lineReply(embed);
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
