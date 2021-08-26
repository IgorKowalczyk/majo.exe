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
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | You should join a voice channel before using this command!`,
     },
    });
   }
   let queue = message.client.queue.get(message.guild.id);
   if (!queue) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | There is nothing playing right now to resume!`,
     },
    });
   }
   if (queue.playing !== false) {
    if (queue.connection.dispatcher) {
     queue.connection.dispatcher.resume();
     message.lineReply({
      embed: {
       color: 4779354,
       description: `${client.bot_emojis.play} | Resumed the music`,
      },
     });
    } else {
     message.lineReply({
      embed: {
       color: 16734039,
       description: `${client.bot_emojis.error} | Cannot resume the music!`,
      },
     });
    }
   }
  } catch (err) {
   console.log(err);
   message.lineReply({
    embed: {
     color: 16734039,
     description: `Something went wrong... ${client.bot_emojis.sadness}`,
    },
   });
  }
 },
};
