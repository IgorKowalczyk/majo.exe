const Discord = require("discord.js");
const moment = require("moment")
require("moment-duration-format")

module.exports = {
 name: "uptime",
 aliases: ["bot"],
 description: "Display a bot uptime",
 category: "General",
 usage: "uptime",
 run: async (client, message, args) => {
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  let embed = new Discord.MessageEmbed()
   .setTitle(":hourglass_flowing_sand: Uptime", message.guild.iconURL({ dynamic: true, format: 'png'}))
   .setDescription(`${duration}`)
   .setImage(clientUser.avatarURL({ dynamic: true, format: 'png', size: 2048 }))
   .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
   .setColor("RANDOM")
  message.channel.send(embed);
 }
}
