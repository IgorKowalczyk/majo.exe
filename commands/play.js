const Discord = require("discord.js");
const ytdl = require('ytdl-core-discord');
var scrapeYt = require("scrape-yt");
const config = require("../config");
const prefix = config.prefix;

/* Music module by Dhvit (@dhvitOP). Thanks ❤️ */

module.exports = {
 name: "play",
 aliases: ["p"],
 description: "Play the music",
 category: "Music",
 usage: "play <song>",
 run: async (client, message, args) => {
  try {
   if(!args[0]) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "You didn't provide a song to play!",
    }})
   }
   let channel = message.member.voice.channel;
   if(!channel) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "You need to join a voice channel to play a music!",
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
   const server = message.client.queue.get(message.guild.id);
   let video = await scrapeYt.search(args.join(' '))
   let result = video[0];
   if(!result) {
    return message.channel.send({embed: {
      color: 16734039,
      description: "Nothing interesing found for yor query. Aborting",
    }})
   }
   const song = {
    id: result.id,
    title: result.title,
    duration: result.duration ,
    thumbnail: result.thumbnail,
    upload: result.uploadDate,
    views: result.viewCount,
    requester: message.author,
    channel: result.channel.name,
    channelurl: result.channel.url
   };
   if(!song.title) {
    title = "Unknown";
   }
   if(!song.duration) {
    title = "Unknown";
   }
   if(!song.upload) {
    title = "Unknown";
   }
   if(!song.views) {
    title = "0";
   }
   if(!song.channel) {
    title = "Unknown";
   }
   if(!song.channelurl) {
    title = "Unknown";
   }
   var date = new Date(0);
   date.setSeconds(song.duration);
   var timeString = date.toISOString().substr(11, 8);
   if (server) {
    server.songs.push(song);
    let embed = new Discord.MessageEmbed()
     .setTitle('✅ Added to queue!')
     .setColor("RANDOM")
     .addField("Name", song.title, true)
     .setThumbnail(song.thumbnail)
     .addField("Views", song.views, true)
     .addField("Requested By", song.requester, true)
     .addField("Duration", timeString, true)
    return message.channel.send(embed)
   }
   const queueConstruct = {
    textChannel: message.channel,
    voiceChannel: channel,
    connection: null,
    songs: [],
    volume: 2,
    playing: true
   };
   message.client.queue.set(message.guild.id, queueConstruct);
   queueConstruct.songs.push(song);
   const play = async song => {
    const queue = message.client.queue.get(message.guild.id);
    if (!song) {
     queue.voiceChannel.leave();
     message.client.queue.delete(message.guild.id);
     return message.channel.send({embed: {
      color: 16734039,
      description: "There are no songs in queue so I'm leaving the voice channel!",
     }})
    }
    const dispatcher = queue.connection.play(await ytdl(`https://youtube.com/watch?v=${song.id}`, {
     filter: format => ['251'],
     highWaterMark: 1 << 25
    }), {
     type: 'opus'
    }).on('finish', () => {
     queue.songs.shift();
     play(queue.songs[0]);
    }).on('error', error => console.error(error));
     dispatcher.setVolumeLogarithmic(queue.volume / 5);
     let noiceEmbed = new Discord.MessageEmbed()
      .setTitle("⏯️ Started Playing")
      .setThumbnail(song.thumbnail)
      .setColor("RANDOM")
      .addField("Name", song.title, true)
      .addField("Requested By", song.requester, true)
      .addField("Views", song.views, true)
      .addField("Duration", timeString, true)
     queue.textChannel.send(noiceEmbed);
   };
   try {
    const connection = await channel.join();
    queueConstruct.connection = connection;
    play(queueConstruct.songs[0]);
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
