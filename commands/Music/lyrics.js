const Discord = require('discord.js')
const lyricsFinder = require("lyrics-finder");

module.exports = {
 name: "lyrics",
 aliases: [],
 description: "Search for lyrics",
 category: "Music",
 usage: "lyrics [song name] | <first song from queue if exists>",
 run: async (client, message, args) => {
  try {
   const song = args.join(" ")
   if (!song) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) {
     return message.channel.send({embed: {
      color: 16734039,
      description: "❌ | You not entered any song to search, and the queue is empty! Correct usage ${prefix} lyrics [song name] | <first song from queue if exists>",
     }})
    }
   }
   let lyrics = null;
   try {
    lyrics = await lyricsFinder(song || queue.songs[0].title, "");
    if (!lyrics) lyrics = `No lyrics found for ${song || queue.songs[0].title, ""}`;
   } catch (error) {
    lyrics = `No lyrics found for ${song || queue.songs[0].title, ""}`;
   }
   let embed = new Discord.MessageEmbed()
    .setTitle(`📑 Lyrics For ${song || queue.songs[0].title, ""}`)
    .setDescription(lyrics)
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
   if (embed.description.length >= 2048)
   embed.description = `${embed.description.substr(0, 2045)}...`;
   return message.channel.send(embed);
  } catch (err) {
   console.log(err);
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
