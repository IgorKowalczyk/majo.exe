const Discord = require("discord.js");
const config = require("../config");
const prefix = config.prefix;

/* Music module by Dhvit (@dhvitOP). Thanks ❤️ */

module.exports = {
 name: "stop",
 aliases: [],
 description: "Stop the music",
 category: "Music",
 usage: "stop",
 run: async (client, message, args) => {
  try {
   const channel = message.member.voice.channel;
   if (!channel) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "You should join a voice channel before using this command!",
    }})
   }
   let queue = message.client.queue.get(message.guild.id);
   if(!queue) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "There is nothing in the queue right now!",
    }})
   }
   message.react('✅')
   queue.songs = []
   queue.connection.dispatcher.end()
   message.channel.send({embed: {
    color: 4779354,
    description: "Stopped the music",
   }})
  } catch (err) {
   console.log(err);
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
  