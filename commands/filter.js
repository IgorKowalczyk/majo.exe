const ytsr = require("youtube-sr");
const Discord = require("discord.js");
const { play } = require("../utilities/play");
const config = require("../config");

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
   message.react("✅");
   if (message.channel.activeCollector) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "There is a search active!",
    }})
   }
   if (!message.member.voice.channel) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "Please join a voice channel first",
    }})
   }
   if (queue && channel !== message.guild.me.voice.channel) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "You must be in the same voice channel as me",
    }})
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
    "remove",
   ];
   let varforfilter;
   let choice;
   let silient;
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
    case "clear":
     varforfilter = 11;
     break;
    default:
     varforfilter = 404;
     const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Not a valid Filter, use one of those:")
      .setDescription(`
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
       **To clear all filters just enter \`clear\` option.**`
      )
      .setFooter(`Example: ${config.prefix} filter bassboost`)
     message.channel.send(embed);
     break;
   }
   choice = filters[varforfilter];
   silient = true;
   if (varforfilter === 404) return;
   try {
    const song = queue.songs[0];
    message.channel.send(
     new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription("Applying effect: " + args[0])
     )
    play(song, message, client, choice, silient);
   } catch (error) {
    console.error(error);
    message.channel.activeCollector = false;
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
 }
}
