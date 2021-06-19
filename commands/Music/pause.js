const Discord = require("discord.js");

module.exports = {
 name: "pause",
 aliases: [],
 description: "Pause the music",
 category: "Music",
 usage: "pause",
 run: async (client, message, args) => {
  try {
   if (!message.guild) return;
   const { channel } = message.member.voice;
   const queue = message.client.queue.get(message.guild.id);
   if (!queue) {
    return message.channel.send({
     embed: {
      color: 16734039,
      description: "❌ | This is nothing playing right now",
     },
    });
   }
   if (!message.member.voice.channel) {
    return message.channel.send({
     embed: {
      color: 16734039,
      description: "❌ | Please join a voice channel first",
     },
    });
   }
   if (channel !== message.guild.me.voice.channel) {
    return message.channel.send({
     embed: {
      color: 16734039,
      description: "❌ | You must be in the same voice channel as me",
     },
    });
   }
   if (queue.playing) {
    queue.playing = false;
    queue.connection.dispatcher.pause(true);
    const pausemebed = new Discord.MessageEmbed() // Prettier()
     .setColor("RANDOM")
     .setDescription(`⏸️ | <@${message.author.id}> paused the music.`);
    return queue.textChannel.send(pausemebed).catch(console.error);
   }
  } catch (err) {
   console.log(err);
   return message.channel.send({
    embed: {
     color: 16734039,
     description: "Something went wrong... :cry:",
    },
   });
  }
 },
};
