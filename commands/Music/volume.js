const Discord = require("discord.js");

/* Music module by Dhvit (@dhvitOP). Thanks ❤️ */

module.exports = {
 name: "volume",
 aliases: [],
 description: "Control the sound volume",
 category: "Music",
 usage: "volume <number>",
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
   if (!args[0]) {
    return message.channel.send({
     embed: {
      color: 4779354,
      description: "🔉 | The current volume is set to: " + queue.volume,
     },
    });
   }
   if (args[0] > 10) {
    return message.channel.send({
     embed: {
      color: 4779354,
      description: "❌ | You can't set volume higher than 10 (Your ears.. 🪦)",
     },
    });
   }
   if (args[0].includes("-") || isNaN(args[0]) || args[0] == 0) {
    return message.channel.send({
     embed: {
      color: 4779354,
      description: "❌ | You must enter correct value. I only accept numbers from 1 to 10!",
     },
    });
   }
   queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
   queue.volume = args[0];
   return message.channel.send({
    embed: {
     color: 4779354,
     description: "🔉 | Volume is now set to " + args[0],
    },
   });
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
