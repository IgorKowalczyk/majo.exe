const { play } = require("../utilities/play");
const Discord = require("discord.js");
const config = require("../config");
const ytsr = require("youtube-sr");

module.exports = {
 name: "play",
 aliases: ["p"],
 description: "Play the music",
 category: "Music",
 usage: "play <song>",
 run: async (client, message, args) => {
  if (!message.guild) return;
  const { channel } = message.member.voice;
  const serverQueue = message.client.queue.get(message.guild.id);
  if (!channel) {
   return message.channel.send({embed: {
    color: 16734039,
    description: "You should join a voice channel before using this command!",
   }})
  }
  if (serverQueue && channel !== message.guild.me.voice.channel) {
   return message.channel.send({embed: {
    color: 16734039,
    description: "`You must be in the same voice channel as me",
   }})
  }
  if (!args.length) {
   return message.channel.send({embed: {
    color: 16734039,
    description: `Usage: ${config.prefix} play <YouTube URL | Video Name | Soundcloud URL>`,
   }})
  }
  message.react("✅").catch(console.error);
  const permissions = channel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT")){
   return message.channel.send({embed: {
    color: 16734039,
    description: "I need permissions to join your channel!",
   }})
  }
  if (!permissions.has("SPEAK")) {
   return message.channel.send({embed: {
    color: 16734039,
    description: "I need permissions to speak in your channel",
   }})
  }
  const search = args.join(" ");
  const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
  const urlValid = videoPattern.test(args[0]);
  const queueConstruct = {
   textChannel: message.channel,
   channel,
   connection: null,
   songs: [],
   loop: false,
   volume: 100,
   filters: [],
   realseek: 0,
   playing: true,
  };
  let songInfo = null;
  let song = null;
  try {
   if (serverQueue) {
    if (urlValid) {
     message.channel.send(new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`:notes: Searching 🔍 [\`LINK\`](${args.join(" ")})`));
    } else {
     message.channel.send(new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`:notes: Searching 🔍 \`${args.join(" ")}\``));
    }
   } else {
    queueConstruct.connection = await channel.join();
    const successjoin = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setDescription(`👍 Joined \`${channel.name}\` 📄 bound \`#${message.channel.name}\``)
     .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    await message.channel.send(successjoin);
    successjoin.delete({
     timeout: 5000
    })
    if (urlValid) {
     const urlvailds = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`:notes: Searching 🔍 [\`LINK\`](${args.join(" ")})`)
     await message.channel.send(urlvailds);
     urlvailds.delete({
      timeout: 5000
     })
    } else {
     const urlvaildnormal = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`:notes: Searching 🔍 \`${args.join(" ")}\``)
     await message.channel.send(urlvaildnormal)
     urlvaildnormal.delete({
      timeout: 5000
     })
    }
    queueConstruct.connection.voice.setSelfDeaf(true);
    queueConstruct.connection.voice.setDeaf(true);
   }
  } catch {}
  if (urlValid) {
   try {
    songInfo = await ytsr.searchOne(search);
    song = {
     title: songInfo.title,
     url: songInfo.url,
     thumbnail: songInfo.thumbnail,
     duration: songInfo.durationFormatted,
    };
   } catch (error) {
    if (error.statusCode === 403) {
     return message.channel.send({embed: {
      color: 16734039,
      description: "Max uses of api key, please update!",
     }})
    }
   }
  }
  else {
   try {
    songInfo = await ytsr.searchOne(search);
    song = {
     title: songInfo.title,
     url: songInfo.url,
     thumbnail: songInfo.thumbnail,
     duration: songInfo.durationFormatted,
    };
   } catch (error) {
    message.channel.send({embed: {
     color: 16734039,
     description: "Something went wrong... :cry:"
    }})
   }
  }
  let thumb = message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 });
  if (song.thumbnail === undefined) thumb = message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 });
  else thumb = song.thumbnail.url;
  if (serverQueue) {
   let estimatedtime = Number(0);
   for (let i = 0; i < serverQueue.songs.length; i++) {
    let minutes = serverQueue.songs[i].duration.split(":")[0];
    let seconds = serverQueue.songs[i].duration.split(":")[1];
    estimatedtime += Number(minutes) * 60 + Number(seconds);
   }
   if (estimatedtime > 60) {
    estimatedtime = Math.round((estimatedtime / 60) * 100) / 100;
    estimatedtime = estimatedtime + " Minutes";
   } else if (estimatedtime > 60) {
    estimatedtime = Math.round((estimatedtime / 60) * 100) / 100;
    estimatedtime = estimatedtime + " Hours";
   } else {
    estimatedtime = estimatedtime + " Seconds";
   }
   serverQueue.songs.push(song);
   const newsong = new Discord.MessageEmbed()
    .setTitle(":notes:" + song.title)
    .setColor("RANDOM")
    .setThumbnail(thumb)
    .setURL(song.url)
    .setDescription(`\`\`\`Has been added to the Queue.\`\`\``)
    .addField("Estimated time until playing:", `\`${estimatedtime}\``, true)
    .addField("Position in queue", `**\`${serverQueue.songs.length - 1}\`**`, true)
    .setFooter(`Requested by: ${message.author.username}#${message.author.discriminator}`, message.member.user.displayAvatarURL({ dynamic: true }));
   return serverQueue.textChannel.send(newsong).catch(console.error);
  }
  queueConstruct.songs.push(song);
  message.client.queue.set(message.guild.id, queueConstruct);
  try {
   play(queueConstruct.songs[0], message, client);
  } catch (error) {
   console.error(error);
   message.client.queue.delete(message.guild.id);
   await channel.leave();
   return message.channel.send({embed: {
    color: 16734039,
    description: "I could not join the channe"
   }})
  }
 },
};
