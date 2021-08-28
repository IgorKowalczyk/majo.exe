const Discord = require("discord.js");
const Genius = require("genius-lyrics");
const geniuscli = new Genius.Client(process.env.GENIUS);

module.exports = {
 name: "lyrics",
 aliases: [],
 description: "Search for lyrics",
 category: "Music",
 usage: "lyrics <song>",
 run: async (client, message, args) => {
  try {
   const song = args.join(" ");
   if (!song) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | Please enter a song to search!`,
     },
    });
   }
   try {
    const search = await geniuscli.songs.search(song);
    const searchr = search[0];
    let lyrics = await searchr.lyrics();
    let songfetch = await searchr.fetch();
    if (!lyrics) lyrics = `No lyrics found for ${song}`;
    let embed = new Discord.MessageEmbed() // Prettier
     .setAuthor(
      `${client.bot_emojis.lyrics} Lyrics for ${songfetch.fullTitle}`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
      songfetch.url
     )
     .setDescription(lyrics)
     .setColor("RANDOM")
     .setImage(songfetch.image)
     .setTimestamp()
     .setFooter(
      `Requested by ${message.author.username}`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     );
    if (embed.description.length >= 2048) embed.description = `${embed.description.substr(0, 2045)}...`;
    return message.lineReply(embed);
   } catch (err) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | Cannot fetch song!`,
     },
    });
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
