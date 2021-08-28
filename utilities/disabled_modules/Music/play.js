const Discord = require("discord.js");
const { play } = require("../../utilities/play");
const ytsr = require("youtube-sr").default;

module.exports = {
 name: "play",
 aliases: ["p"],
 description: "Play the music",
 category: "Music",
 usage: "play <youtube link | youtube video name>",
 run: async (client, message, args, silient) => {
  silient = false;
  // await ytsr.set("api", process.env.YOUTUBE);
  if (!message.guild) return;
  const { channel } = message.member.voice;
  const serverQueue = message.client.queue.get(message.guild.id);
  if (!channel) {
   return message.lineReply({
    embed: {
     color: 16734039,
     description: `${client.bot_emojis.error} | You should join a voice channel before using this command!`,
    },
   });
  }
  if (serverQueue && channel !== message.guild.me.voice.channel) {
   return message.lineReply({
    embed: {
     color: 16734039,
     description: `${client.bot_emojis.error} | You must be in the same voice channel as me`,
    },
   });
  }
  if (!args.length) {
   return message.lineReply({
    embed: {
     color: 16734039,
     description: `${client.bot_emojis.error} | Usage: ${process.env.PREFIX} play <youtube link | youtube video name>`,
    },
   });
  }
  const permissions = channel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT")) {
   return message.lineReply({
    embed: {
     color: 16734039,
     description: `${client.bot_emojis.error} | I need permissions to join your channel!`,
    },
   });
  }
  if (!permissions.has("SPEAK")) {
   return message.lineReply({
    embed: {
     color: 16734039,
     description: `${client.bot_emojis.error} | I need permissions to speak in your channel`,
    },
   });
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
     message.lineReply(
      new Discord.MessageEmbed() // Prettier
       .setColor("RANDOM")
       .setDescription(`:notes: Searching ${client.bot_emojis.search_glass} [\`LINK\`](${args.join(" ")})`)
     );
    } else {
     message.lineReply(
      new Discord.MessageEmbed() // Prettier
       .setColor("RANDOM")
       .setDescription(`:notes: Searching ${client.bot_emojis.search_glass} \`${args.join(" ")}\``)
     );
    }
   } else {
    queueConstruct.connection = await channel.join();
    const successjoin = new Discord.MessageEmbed() // Prettier
     .setColor("RANDOM")
     .setDescription(`${client.bot_emojis.like} Joined \`${channel.name}\` ${client.bot_emojis.lyrics} bound \`#${message.channel.name}\``)
     .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }));
    message.lineReply(successjoin).then(
     successjoin.delete({
      timeout: 5000,
     })
    );
    if (urlValid) {
     const urlvailds = new Discord.MessageEmbed() // Prettier
      .setColor("RANDOM")
      .setDescription(`:notes: Searching ${client.bot_emojis.search_glass} [\`LINK\`](${args.join(" ")})`);
     await message.lineReply(urlvailds);
     urlvailds.delete({
      timeout: 5000,
     });
    } else {
     const urlvaildnormal = new Discord.MessageEmbed() // Prettier
      .setColor("RANDOM")
      .setDescription(`:notes: Searching ${client.bot_emojis.search_glass} \`${args.join(" ")}\``);
     await message.lineReply(urlvaildnormal);
     urlvaildnormal.delete({
      timeout: 5000,
     });
    }
    queueConstruct.connection.voice.setSelfDeaf(true);
    queueConstruct.connection.voice.setDeaf(true);
   }
  } catch {}
  if (urlValid) {
   try {
    songInfo = await ytsr.searchOne(search);
    if (!songInfo) {
     console.log("0");
    }
    // console.log(songInfo)
    song = {
     title: songInfo.title,
     url: songInfo.url,
     thumbnail: songInfo.thumbnail,
     duration: songInfo.durationFormatted,
    };
    if (!song.title && !song.url && song.thumbnail && song.duration) {
     queueConstruct.connection.disconnect();
     return message.lineReply({
      embed: {
       color: 16734039,
       description: `${client.bot_emojis.error} | Cannot play the video!`,
      },
     });
    }
   } catch (error) {
    if (song.statusCode === 403) {
     queueConstruct.connection.disconnect();
     return message.lineReply({
      embed: {
       color: 16734039,
       description: `${client.bot_emojis.error} | Max uses of api key, please update! (403)`,
      },
     });
    } else if (song.statusCode === 429) {
     queueConstruct.connection.disconnect();
     return message.lineReply({
      embed: {
       color: 16734039,
       description: `${client.bot_emojis.error} | Max uses of host requests, please try again later (429)`,
      },
     });
    }
   }
  } else {
   try {
    songInfo = await ytsr.searchOne(search);
    song = {
     title: songInfo.title,
     url: songInfo.url,
     thumbnail: songInfo.thumbnail,
     duration: songInfo.durationFormatted,
    };
   } catch (error) {
    queueConstruct.connection.disconnect();
    message.lineReply({
     embed: {
      color: 16734039,
      description: `Something went wrong why searching for your song... ${client.bot_emojis.sadness}`,
     },
    });
   }
  }
  if (!song) {
   queueConstruct.connection.disconnect();
   return message.lineReply({
    embed: {
     color: 16734039,
     description: `${client.bot_emojis.error} | Cannot play the video!`,
    },
   });
  }
  if (!song.title && !song.url && !song.thumbnail && !song.duration) {
   return message.lineReply({
    embed: {
     color: 16734039,
     description: `${client.bot_emojis.error} | Cannot play the video!`,
    },
   });
  }
  let thumb = "https://images-ext-2.discordapp.net/external/55DLQjqMFAc-wAiT7O1NJS158tv6OUhsSHmBXmJ0Pkg/%3Fsqp%3D-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE%3D%26rs%3DAOn4CLBz4zlh_7gUzfPyMIc3OcanVj2xyw/https/i.ytimg.com/vi/jJLpszZ6o-c/hq720.jpg";
  if (song.thumbnail === undefined) thumb = "https://images-ext-2.discordapp.net/external/55DLQjqMFAc-wAiT7O1NJS158tv6OUhsSHmBXmJ0Pkg/%3Fsqp%3D-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE%3D%26rs%3DAOn4CLBz4zlh_7gUzfPyMIc3OcanVj2xyw/https/i.ytimg.com/vi/jJLpszZ6o-c/hq720.jpg";
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
   const newsong = new Discord.MessageEmbed() // Prettier
    .setTitle(":notes: " + song.title)
    .setColor("RANDOM")
    .setThumbnail(thumb)
    .setURL(song.url)
    .setDescription(`\`\`\`Has been added to the Queue.\`\`\``)
    .addField("Estimated time until playing:", `\`${estimatedtime}\``, true)
    .addField("Position in queue", `**\`${serverQueue.songs.length - 1}\`**`, true)
    .setFooter(`Requested by: ${message.author.username}#${message.author.discriminator}`, message.member.user.displayAvatarURL({ dynamic: true }));
   return serverQueue.textChannel.lineReply(newsong);
  }
  queueConstruct.songs.push(song);
  message.client.queue.set(message.guild.id, queueConstruct);
  try {
   play(queueConstruct.songs[0], message, client, silient);
  } catch (error) {
   message.client.queue.delete(message.guild.id);
   await channel.leave();
   return message.lineReply({
    embed: {
     color: 16734039,
     description: `${client.bot_emojis.error} | I could not join the channel`,
    },
   });
  }
 },
};
