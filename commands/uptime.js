const Discord = require("discord.js");
const moment = require("moment")
require("moment-duration-format")

module.exports.run = (client, message, args) => {
  
const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
let embed = new Discord.RichEmbed()
.setTitle("Uptime")
.setDescription(`${duration}`)
.setColor('RANDOM')

message.channel.send(embed);
}

module.exports.help = {
    name: "uptime",
    description: "Display a bot uptime",
    usage: "uptime",
    type: "General"   
}