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
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | This is nothing playing right now`,
     },
    });
   }
   if (!message.member.voice.channel) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | Please join a voice channel first`,
     },
    });
   }
   if (channel !== message.guild.me.voice.channel) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | You must be in the same voice channel as me`,
     },
    });
   }
   if (queue.playing) {
    queue.playing = false;
    queue.connection.dispatcher.pause(true);
    const pausemebed = new Discord.MessageEmbed() // Prettier
     .setColor("RANDOM")
     .setDescription(`${client.bot_emojis.pause} | <@${message.author.id}> paused the music.`);
    return queue.textChannel.send(pausemebed).catch(console.error);
   }
  } catch (err) {
   console.log(err);
   return message.lineReply({
    embed: {
     color: 16734039,
     description: `Something went wrong... ${client.bot_emojis.sadness}`,
    },
   });
  }
 },
};
