const Discord = require("discord.js");
const moment = require("moment")
require("moment-duration-format")
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "uptime",
 aliases: ["bot", "botuptime"],
 description: "Display a bot uptime",
 category: "General",
 usage: "uptime",
 run: async (client, message, args) => {
  try {
   const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
   const embed = new Discord.MessageEmbed()
    .setTitle(":hourglass_flowing_sand: Uptime", message.guild.iconURL({ dynamic: true, format: 'png'}))
    .setDescription(`${duration}`)
    .setTimestamp()
    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    .setColor("RANDOM")
   message.channel.send(embed);
  } catch (err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
