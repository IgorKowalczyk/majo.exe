const Discord = require("discord.js");
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "ping",
 //aliases: [],
 description: "Show client ping",
 category: "General",
 usage: "ping",
 run: async (client, message, args) => {
  await message.channel.send({embed: {
   color: 3447003,
   description: ":ping_pong: Pinging..."
  }}).then(msg=>{
  const ping = new Discord.MessageEmbed()
   .setTitle(':ping_pong: Pong!')
   .addField("Bot ping:", + `${Math.floor(msg.createdTimestamp - message.createdTimestamp)}` + "ms")
   .addField("Api ping:", + `${Math.round(client.ping)}` + "ms")
   .setColor('RANDOM')
   .setTimestamp()
  msg.edit(ping);
  msg.edit("\u200B")
  })
 }
}
