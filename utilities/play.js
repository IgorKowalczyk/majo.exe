const ytdl = require("discord-ytdl-core");
const { canModifyQueue } = require("../utilities/main");
const Discord = require("discord.js");
const createBar = require("string-progressbar");
const lyricsFinder = require("lyrics-finder");
const config = require("../config");

module.exports = {
 async play(song, message, client, filters) {
  const queue = message.client.queue.get(message.guild.id);
  if (!song) {
   queue.channel.leave();
   message.client.queue.delete(message.guild.id);
   const endembed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`💿 Music queue ended so I'm leaving the voice channel.`);
   return queue.textChannel.send(endembed);
  }
  let stream = null;
  let streamType = song.url.includes("youtube.com") ? "opus" : "ogg/opus";
  let isnotayoutube = false;
  let seekTime = 0;
  let oldSeekTime = queue.realseek;
  let encoderArgstoset;
  if (filters === "remove") {
   queue.filters = ["-af", "dynaudnorm=f=200"];
   encoderArgstoset = queue.filters;
   try {
    seekTime = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000 + oldSeekTime;
   } catch {
    seekTime = 0;
   }
   queue.realseek = seekTime;
  } else if (filters) {
   try {
    seekTime = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000 + oldSeekTime;
   } catch {
    seekTime = 0;
   }
   queue.realseek = seekTime;
   queue.filters.push(filters);
   encoderArgstoset = ["-af", queue.filters];
  }
  try {
   if (song.url.includes("youtube.com")) {
    stream = ytdl(song.url, {
     filter: "audioonly",
     opusEncoded: true,
     encoderArgs: encoderArgstoset,
     bitrate: 320,
     seek: seekTime,
     quality: "highestaudio",
     liveBuffer: 40000,
     highWaterMark: 1 << 25,
    });
   } else if (song.url.includes(".mp3") || song.url.includes("baseradiode")) {
    stream = song.url;
    isnotayoutube = true;
   }
  } catch (err) {
   if (queue) {
    queue.songs.shift();
    module.exports.play(queue.songs[0], message);
   }
   console.error(err);
   return queue.textChannel.send({
    embed: {
     color: 16734039,
     description: "Something went wrong... :cry:",
    },
   });
  }

  queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));

  if (isnotayoutube) {
   console.log("TEST");
   const dispatcher = queue.connection
    .play(stream)
    .on("finish", () => {
     if (collector && !collector.ended) collector.stop();

     if (queue.loop) {
      let lastSong = queue.songs.shift();
      queue.songs.push(lastSong);
      module.exports.play(queue.songs[0], message);
     } else {
      queue.songs.shift();
      module.exports.play(queue.songs[0], message);
     }
    })
    .on("error", (err) => {
     console.error(err);
     queue.songs.shift();
     module.exports.play(queue.songs[0], message);
    });
   dispatcher.setVolumeLogarithmic(queue.volume / 100);
  } else {
   const dispatcher = queue.connection
    .play(stream, { type: streamType })
    .on("finish", () => {
     if (collector && !collector.ended) collector.stop();

     if (queue.loop) {
      let lastSong = queue.songs.shift();
      queue.songs.push(lastSong);
      module.exports.play(queue.songs[0], message);
     } else {
      queue.songs.shift();
      module.exports.play(queue.songs[0], message);
     }
    })
    .on("error", (err) => {
     console.error(err);
     queue.songs.shift();
     module.exports.play(queue.songs[0], message);
    });
   dispatcher.setVolumeLogarithmic(queue.volume / 100);
  }

  let thumb;
  if (song.thumbnail === undefined) thumb = queue.textChannel.guild.iconURL({ dynamic: true, format: 'png'});
  else thumb = song.thumbnail.url;

  try {
   let embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Started playing: ${song.title}`, queue.textChannel.guild.iconURL({ dynamic: true, format: 'png'}))
    .setDescription(`[**${song.title}**](${song.url})`)
    .setThumbnail(song.thumbnail.url)
   var playingMessage = await queue.textChannel.send(embed);
   var playingMessage = await queue.textChannel.send(`${song.url}`);
   await playingMessage.react("⏭");
   await playingMessage.react("⏯");
   await playingMessage.react("🔉");
   await playingMessage.react("🔊");
   await playingMessage.react("🔇");
   await playingMessage.react("🔁");
   await playingMessage.react("🔀");
   await playingMessage.react("⏹");
   await playingMessage.react("🎵");
   await playingMessage.react("🎶");
   await playingMessage.react("📑");
  } catch (error) {
   console.error(error);
  }

  const filter = (reaction, user) => user.id !== message.client.user.id;
  var collector = playingMessage.createReactionCollector(filter, {
   time: song.duration > 0 ? song.duration * 1000 : 600000,
  });

  collector.on("collect", async (reaction, user) => {
   if (!queue) return;
   const member = message.guild.member(user);
   if (queue && channel !== message.guild.me.voice.channel) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "`You must be in the same voice channel as me",
    }})
   }

   switch (reaction.emoji.name) {
    case "⏭":
     queue.playing = true;
     reaction.users.remove(user).catch(console.error);
     if (!canModifyQueue(member)) return;
     queue.connection.dispatcher.end();
     const skip = await queue.textChannel.send({embed: {
      color: 4779354,
      description: `${user} ⏩ skipped the song`,
     }}).catch(console.error);
     collector.stop();
     skip.delete({
      timeout: 5000
     })
     break;

    case "⏯":
     reaction.users.remove(user).catch(console.error);
     if (!canModifyQueue(member)) return;
     if (queue.playing) {
      queue.playing = !queue.playing;
      queue.connection.dispatcher.pause(true);
      const pause = await queue.textChannel.send({embed: {
       color: 4779354,
       description: `${user} ⏸ paused the music.`,
      }}).catch(console.error);
     } else {
      queue.playing = !queue.playing;
      queue.connection.dispatcher.resume();
      const pause = await queue.textChannel.send({embed: {
       color: 4779354,
       description: `${user} ▶ resumed the music!`,
      }}).catch(console.error);
     }
     pause.delete({
      timeout: 5000
     })
     break;

    case "🔇":
     reaction.users.remove(user).catch(console.error);
     if (!canModifyQueue(member)) return;
     if (queue.volume <= 0) {
      queue.volume = 100;
      queue.connection.dispatcher.setVolumeLogarithmic(100 / 100);
      const voicestateunmute = await queue.textChannel.send({embed: {
       color: 4779354,
       description: `${user} 🔊 unmuted the music!`,
      }}).catch(console.error);
      voicestateunmute.delete({
       timeout: 5000
      })
     } else {
      queue.volume = 0;
      queue.connection.dispatcher.setVolumeLogarithmic(0);
      const voicestatemute = await queue.textChannel.send({embed: {
       color: 4779354,
       description: `${user} 🔇 muted the music!`,
      }}).catch(console.error);
      voicestatemute.delete({
       timeout: 5000
      })
     }
     break;

    case "🔉":
     reaction.users.remove(user).catch(console.error);
     if (!canModifyQueue(member)) return;
     if (queue.volume - 10 <= 0) queue.volume = 0;
     else queue.volume = queue.volume - 10;
     queue.connection.dispatcher.setVolumeLogarithmic(queue.volume / 100);
     const volumedown = await queue.textChannel.send({embed: {
      color: 4779354,
      description: `${user} 🔉 decreased the volume, the volume is now ${queue.volume}%`,
     }}).catch(console.error);
     volumedown.delete({
      timeout: 5000
     })
     break;

    case "🔊":
     reaction.users.remove(user).catch(console.error);
     if (!canModifyQueue(member)) return;
     if (queue.volume + 10 >= 100) queue.volume = 100;
     else queue.volume = queue.volume + 10;
     queue.connection.dispatcher.setVolumeLogarithmic(queue.volume / 100);
     const volumeup = await queue.textChannel.send({embed: {
      color: 4779354,
      description: `${user} 🔊 increased the volume, the volume is now ${queue.volume}%`,
     }}).catch(console.error);
     volumeup.delete({
      timeout: 5000
     })
     break;

    case "🔁":
     reaction.users.remove(user).catch(console.error);
     if (!canModifyQueue(member)) return;
     queue.loop = !queue.loop;
     const loop = await queue.textChannel.send({embed: {
      color: 4779354,
      description: `Loop is now ${queue.loop ? "**on**" : "**off**"}`,
     }}).catch(console.error);
     loop.delete({
      timeout: 5000
     })
     break;

    case "⏹":
     reaction.users.remove(user).catch(console.error);
     if (!canModifyQueue(member)) return;
     queue.songs = [];
     const stop = await queue.textChannel.send({embed: {
      color: 4779354,
      description: `${user} ⏹ stopped the music!`,
     }}).catch(console.error);
     stop.delete({
      timeout: 5000
     })
     try {
      queue.connection.dispatcher.end();
     } catch (error) {
      console.error(error);
      queue.connection.disconnect();
     }
     collector.stop();
     break;

    default:
     reaction.users.remove(user).catch(console.error);
     break;

    case "🔀":
     reaction.users.remove(user).catch(console.error);
     if (!queue) {
      const errormsg = await message.channel.send({embed: {
       color: 16734039,
       description: "There is no queue",
      }}).catch(console.error);
      errormsg.delete({
       timeout: 5000
      })
     }
     if (!canModifyQueue(member)) return;
     let songs = queue.songs;
     queue.songs = songs;
     for (let i = songs.length - 1; i > 1; i--) {
      let j = 1 + Math.floor(Math.random() * i);
      [songs[i], songs[j]] = [songs[j], songs[i]];
     }
     message.client.queue.set(message.guild.id, queue);
     const shuffle = await queue.textChannel.send({embed: {
      color: 4779354,
      description: `${user} 🔀 Shuffled The Queue.`,
     }}).catch(console.error);
     shuffle.delete({
      timeout: 5000
     })
     break;

    case "🎵":
     reaction.users.remove(user).catch(console.error);
     const song = queue.songs[0];
     let minutes = song.duration.split(":")[0];
     let seconds = song.duration.split(":")[1];
     let ms = Number(minutes) * 60 + Number(seconds);
     let thumb;
     if (song.thumbnail === undefined) thumb = queue.textChannel.guild.iconURL({ dynamic: true, format: 'png'});
     else thumb = song.thumbnail.url;
     const seek = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000;
     const left = ms - seek;
     let nowPlaying = new Discord.MessageEmbed()
      .setAuthor("♪ Now playing", queue.textChannel.guild.iconURL({ dynamic: true, format: 'png'}))
      .setDescription(`[**${song.title}**](${song.url})`)
      .setThumbnail(song.thumbnail.url)
      .setColor("RANDOM")
      .setFooter("Requested by " + `${message.author.username}`, message.member.user.displayAvatarURL({ dynamic: true }));
     if (ms >= 10000) {
      nowPlaying.addField("\u200b", "🔴 LIVE", false);
      return message.channel.send(nowPlaying);
     }
     if (ms > 0 && ms < 10000) {
      nowPlaying.addField(
       "\u200b",
       "**``[" +
        createBar(ms == 0 ? seek : ms, seek, 25, "▬", "🔘")[0] +
        "]``**\n**" +
        "\n[" +
        new Date(seek * 1000).toISOString().substr(11, 8) +
        " / " +
        (ms == 0 ? " ◉ LIVE" : new Date(ms * 1000).toISOString().substr(11, 8)) +
        "]**" +
        "\n" +
        "\n **Time Remaining:**" +
        "``" +
        new Date(left * 1000).toISOString().substr(11, 8) +
        "``",
       false
      );
      return message.channel.send(nowPlaying);
     }
     break;

    case "🎶":
     reaction.users.remove(user).catch(console.error);
     const description = queue.songs.map((song, index) => `${index + 1}. ${Discord.escapeMarkdown(song.title)}`);

     let queueEmbed = new Discord.MessageEmbed()
      .setTitle("💿 Music Queue", message.member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(description)
      .setColor("RANDOM")
      .setFooter("Requested by " + `${message.author.username}`, message.member.user.displayAvatarURL({ dynamic: true }));
     const splitDescription = Discord.splitMessage(description, {
      maxLength: 2048,
      char: "\n",
      prepend: "",
      append: "",
     });

     splitDescription.forEach(async (m) => {
      queueEmbed.setDescription(m);
      message.react("✅");
      message.channel.send(queueEmbed);
     });
     break;

    case "📑":
     reaction.users.remove(user).catch(console.error);
     if (!canModifyQueue(member)) return;
     let lyrics = null;
     let temEmbed = new Discord.MessageEmbed()
      .setTitle("Searching...", message.member.user.displayAvatarURL({ dynamic: true }))
      .setDescription("Lyrics")
      .setColor("RANDOM")
      .setFooter("Requested by " + `${message.author.username}`, message.member.user.displayAvatarURL({ dynamic: true }));
     let result = await message.channel.send(temEmbed);
     try {
      lyrics = await lyricsFinder(queue.songs[0].title, "");
      if (!lyrics) lyrics = `No lyrics found for ${queue.songs[0].title}.`;
     } catch (error) {
      lyrics = `No lyrics found for ${queue.songs[0].title}.`;
     }
     let lyricsEmbed = new Discord.MessageEmbed()
      .setTitle("🗒️ Lyrics")
      .setDescription(lyrics)
      .setColor("RANDOM");
     if (lyricsEmbed.description.length >= 2048) lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
     message.react("✅");
     return result.edit(lyricsEmbed).catch(console.error);
     break;
   }
  });

  collector.on("end", () => {
   playingMessage.reactions.removeAll().catch(console.error);
   if (config.pruning && playingMessage && !playingMessage.deleted) {
    playingMessage.delete({ timeout: 3000 }).catch(console.error);
   }
  });
 },
};
