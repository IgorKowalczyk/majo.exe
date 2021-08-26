const Discord = require("discord.js");

/* Music module by Dhvit (@dhvitOP). Thanks ❤️ */

module.exports = {
 name: "shuffle",
 aliases: [],
 description: "Shuffle the current queue",
 category: "Music",
 usage: "shuffle",
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
   const queue = message.client.queue.get(message.guild.id);
   if (!queue) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | There is nothing in the queue right now!`,
     },
    });
   }
   let songs = queue.songs;
   for (let i = songs.length - 1; i > 1; i--) {
    let j = 1 + Math.floor(Math.random() * i);
    [songs[i], songs[j]] = [songs[j], songs[i]];
   }
   queue.songs = songs;
   message.client.queue.set(message.guild.id, queue);
   message.lineReply({
    embed: {
     color: 4779354,
     description: `${client.bot_emojis.reverse_nr_2_motherfucker} | Shuffled the current queue`,
    },
   });
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
