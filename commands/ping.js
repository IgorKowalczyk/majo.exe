const Discord = require("discord.js");
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "ping",
 aliases: [],
 description: "Show client ping",
 category: "General",
 usage: "ping",
 run: async (client, message, args) => {
  try {
   await message.channel.send({embed: {
    color: 3447003,
    description: ":ping_pong: Pinging..."
   }}).then(msg=>{
   const ping = new Discord.MessageEmbed()
    .setTitle(':ping_pong: Pong!')
    .addField("Bot ping:", + `${Math.floor(msg.createdTimestamp - message.createdTimestamp)}` + "ms")
    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    .setColor('RANDOM')
    .setTimestamp()
   msg.edit(ping);
   msg.edit("\u200B")
   })
  } catch (err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
