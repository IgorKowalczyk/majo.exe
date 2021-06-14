const Discord = require("discord.js");

module.exports = {
 name: "ping",
 aliases: [],
 description: "Show client ping",
 category: "General",
 usage: "ping",
 run: async (client, message, args) => {
  try {
   await message
    .lineReply({
     embed: {
      color: 3447003,
      description: ":ping_pong: Pinging...",
     },
    })
    .then((msg) => {
     const ping = new Discord.MessageEmbed() // Prettier()
      .setTitle(":ping_pong: Pong!")
      .addField("My ping: ", `${Math.floor(msg.createdTimestamp - message.createdTimestamp)} ms`)
      .addField("API ping (Websocket): ", `${Math.round(client.ws.ping)} ms`)
      .setFooter(
       "Note: These results may not be accurate and may be different from actual ping | Requested by " + `${message.author.username}`,
       message.author.displayAvatarURL({
        dynamic: true,
        format: "png",
        size: 2048,
       })
      )
      .setColor("RANDOM")
      .setTimestamp();
     msg.edit(ping);
     msg.edit("\u200B");
    });
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
