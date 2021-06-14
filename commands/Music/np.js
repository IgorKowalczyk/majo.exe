const Discord = require("discord.js");
const progressbar = require("string-progressbar");

module.exports = {
 name: "nowplaying",
 aliases: ["np"],
 description: "Display now playing song",
 category: "Music",
 usage: "nowplaying",
 run: async (client, message, args) => {
  try {
   if (!message.guild) return;
   const queue = message.client.queue.get(message.guild.id);
   if (!queue) {
    return message.channel.send({
     embed: {
      color: 16734039,
      description: "❌ | This is nothing playing right now",
     },
    });
   }
   const song = queue.songs[0];
   let minutes = song.duration.split(":")[0];
   let seconds = song.duration.split(":")[1];
   let ms = Number(minutes) * 60 + Number(seconds);
   let thumb;
   if (song.thumbnail === undefined) thumb = "https://media.giphy.com/media/P4OLEIP94nLi63K9JM/giphy.gif";
   else thumb = song.thumbnail.url;
   const seek = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000;
   const left = ms - seek;
   let nowPlaying = new Discord.MessageEmbed() // Prettier()
    .setAuthor(
     "♪ Now playing",
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    )
    .setDescription(`[**${song.title}**](${song.url})`)
    .setThumbnail(song.thumbnail.url)
    .setColor("RANDOM")
    .setFooter(
     "Requested by " + `${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    );
   if (ms >= 10000) {
    nowPlaying.addField("\u200b", "🔴 LIVE", false);
    return message.channel.send(nowPlaying);
   }
   if (ms > 0 && ms < 10000) {
    nowPlaying.addField("\u200b", "**``[" + progressbar.filledBar(ms == 0 ? seek : ms, seek, 25, "🔘", "▬")[0] + "]``**\n**" + "\n[" + new Date(seek * 1000).toISOString().substr(11, 8) + " / " + (ms == 0 ? " ◉ LIVE" : new Date(ms * 1000).toISOString().substr(11, 8)) + "]**" + "\n" + "\n **Time Remaining:**" + "``" + new Date(left * 1000).toISOString().substr(11, 8) + "``", false);
    return message.channel.send(nowPlaying);
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
