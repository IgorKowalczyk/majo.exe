const Discord = require("discord.js");

module.exports = {
 name: "ping",
 aliases: [],
 description: "Show client ping",
 category: "General",
 usage: "ping",
 run: async (client, message, args) => {
  try {
   const ping = new Discord.MessageEmbed() // Prettier()
    .setTitle(":ping_pong: Pong!")
    .addField("My ping: ", `${Date.now() - message.createdTimestamp} ms`)
    .addField("API ping (Websocket): ", `${Math.round(client.ws.ping)} ms`)
    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }))
    .setColor("RANDOM")
    .setTimestamp();
   message.lineReply(ping);
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
