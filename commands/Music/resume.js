const Discord = require("discord.js");

/* Music module by Dhvit (@dhvitOP). Thanks ❤️ */

module.exports = {
 name: "resume",
 aliases: ["r"],
 description: "Resume the music",
 category: "Music",
 usage: "resume",
 run: async (client, message, args) => {
  try {
   const channel = message.member.voice.channel;
   if (!channel) {
    return message.channel.send({
     embed: {
      color: 16734039,
      description: "❌ | You should join a voice channel before using this command!",
     },
    });
   }
   let queue = message.client.queue.get(message.guild.id);
   if (!queue) {
    return message.channel.send({
     embed: {
      color: 16734039,
      description: "❌ | There is nothing playing right now to resume!",
     },
    });
   }
   if (queue.playing !== false) {
    if (queue.connection.dispatcher) {
     queue.connection.dispatcher.resume();
     message.channel.send({
      embed: {
       color: 4779354,
       description: "▶ | Resumed the music",
      },
     });
    } else {
     message.channel.send({
      embed: {
       color: 16734039,
       description: "❌ | Cannot resume the music!",
      },
     });
    }
   }
  } catch (err) {
   console.log(err);
   message.channel.send({
    embed: {
     color: 16734039,
     description: "Something went wrong... :cry:",
    },
   });
  }
 },
};
