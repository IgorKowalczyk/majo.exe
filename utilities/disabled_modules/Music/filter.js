const ytsr = require("youtube-sr");
const Discord = require("discord.js");
const { play } = require("../../utilities/play");

module.exports = {
 name: "filter",
 aliases: ["filters", "effects", "effect"],
 description: "Add effects to music",
 category: "Music",
 usage: "filter <filter>",
 run: async (client, message, args) => {
  try {
   if (!message.guild) return;
   const { channel } = message.member.voice;
   const queue = message.client.queue.get(message.guild.id);
   if (!queue) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} There is nothing in the queue right now!`,
     },
    });
   }
   if (message.channel.activeCollector) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error}  There is a search active!`,
     },
    });
   }
   if (!message.member.voice.channel) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error}  Please join a voice channel first`,
     },
    });
   }
   if (queue && channel !== message.guild.me.voice.channel) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error}  You must be in the same voice channel as me`,
     },
    });
   }
   //Define all filters with ffmpeg https://ffmpeg.org/ffmpeg-filters.html
   const filters = [
    "bass=g=20,dynaudnorm=f=200", //bassboost
    "apulsator=hz=0.08", //8D
    "aresample=48000,asetrate=48000*0.8", //vaporwave
    "aresample=48000,asetrate=48000*1.25", //nightcore
    "aphaser=in_gain=0.4", //phaser
    "tremolo", //tremolo
    "vibrato=f=6.5", //vibrato
    "surround", //surrounding
    "apulsator=hz=1", //pulsator
    "asubboost", //subboost
    "chorus=0.5:0.9:50|60|40:0.4|0.32|0.3:0.25|0.4|0.3:2|2.3|1.3", //chorus of 3
    "stereotools=mlev=0.015625", //karaoke
    // "sofalizer=sofa=../utilities/music-filters/ClubFritz12.sofa:type=freq:radius=2:rotation=5", //sofa
    "silenceremove=window=0:detection=peak:stop_mode=all:start_mode=all:stop_periods=-1:stop_threshold=0", //desilencer
    "remove",
   ];
   let varforfilter;
   let choice;
   switch (args[0]) {
    case "bassboost":
     varforfilter = 0;
     break;
    case "8D":
     varforfilter = 1;
     break;
    case "vaporwave":
     varforfilter = 2;
     break;
    case "nightcore":
     varforfilter = 3;
     break;
    case "phaser":
     varforfilter = 4;
     break;
    case "tremolo":
     varforfilter = 5;
     break;
    case "vibrato":
     varforfilter = 6;
     break;
    case "surrounding":
     varforfilter = 7;
     break;
    case "pulsator":
     varforfilter = 8;
     break;
    case "subboost":
     varforfilter = 9;
     break;
    case "chorus":
     varforfilter = 10;
     break;
    case "karaoke":
     varforfilter = 11;
     break;
    case "desilencer":
     varforfilter = 12;
     break;
    case "clear":
     varforfilter = 13;
     break;
    default:
     varforfilter = 404;
     const embed = new Discord.MessageEmbed() // Prettier
      .setColor("RANDOM")
      .setTitle(`${client.bot_emojis.error} Not a valid Filter, use one of those:`)
      .setDescription(
       `
       \`bassboost\`
       \`8D\`
       \`vaporwave\`
       \`nightcore\`
       \`phaser\`
       \`tremolo\`
       \`vibrato\`
       \`surrounding\`
       \`pulsator\`
       \`subboost\`
       \`chorus\`
       \`karaoke\`
       \`desilencer (removes silence in the song automatically)\`
       **To clear all filters just enter \`clear\` option.**\n**Example: ${process.env.PREFIX} filter bassboost**`
      )
      .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }));
     message.lineReply(embed);
     break;
   }
   try {
    choice = filters[varforfilter];
    if (varforfilter === 404) return;
    const song = queue.songs[0];
    message.lineReply(
     new Discord.MessageEmbed() // Prettier
      .setColor("RANDOM")
      .setDescription(`${client.bot_emojis.sparkles} | Applying effect: \`${args[0]}\``)
    );
    let silient = true;
    play(song, message, client, choice, silient);
   } catch (error) {
    message.channel.activeCollector = false;
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `Something went wrong why applying the effect... ${client.bot_emojis.sadness}`,
     },
    });
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
