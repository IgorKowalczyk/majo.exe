const Discord = require("discord.js");
const moment = require("moment");
const config = require("../../config");
require("moment-duration-format");

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
   const embed = new Discord.MessageEmbed() // Prettier
    .setTitle(
     `${client.bot_emojis.uptime} Uptime`,
     message.guild.iconURL({
      dynamic: true,
      format: "png",
     })
    )
    .addField(`${client.bot_emojis.stopwatch} Uptime`, `\`\`\`${duration}\`\`\``)
    .addField(`${client.bot_emojis.rocket} Date Launched`, `\`\`\`${moment(timestamp).format("LLLL")}\`\`\``)
    .setTimestamp()
    .setFooter(
     `Requested by ${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    )
    .setColor("RANDOM");
   if (config.status) {
    embed.addField(`${client.bot_emojis.status_online} Servers Status`, "```" + config.status + "```");
   }
   message.lineReply(embed);
  } catch (err) {
   message.lineReply({
    embed: {
     color: 16734039,
     description: `Something went wrong... ${client.bot_emojis.sadness}`,
    },
   });
  }
 },
};
