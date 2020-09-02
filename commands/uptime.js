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
   .setTitle(":hourglass_flowing_sand: Uptime")
   .setDescription(`${duration}`)
   .setColor("RANDOM")
  message.channel.send(embed);
 }
}
