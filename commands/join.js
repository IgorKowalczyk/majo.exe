const Discord = require("discord.js");
const ytdl = require('ytdl-core-discord');
var scrapeYt = require("scrape-yt");
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "join",
 aliases: [],
 description: "Join to the voice channel",
 category: "Music",
 usage: "join",
 run: async (client, message, args) => {
  try {
   let channel = message.member.voice.channel;
   if(!channel) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "You need to join a voice channel!",
    }})
   }
   if (!channel.permissionsFor(message.client.user).has("CONNECT")) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "I don't have permission to join the voice channel",
    }})
   }
   if (!channel.permissionsFor(message.client.user).has("SPEAK")) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "I don't have permission to speak in the voice channel",
    }})
   }
   let queue = message.client.queue.get(message.guild.id)
   if(!queue) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "There is nothing in the queue right now so i can't join to the channel!",
    }})
   }
   try {
    channel.join();
   } catch (error) {
    message.client.queue.delete(message.guild.id);
    await channel.leave();
    return message.channel.send({embed: {
     color: 16734039,
     description: "I could not join the voice channel!"
    }})
   }
  } catch (err) {
   console.log(err);
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
