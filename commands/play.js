const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {

const member = message.member;
const msg = message.content.toLowerCase();
const args = message.content.split(' ').slice(1).join(' ');

if (member.voiceChannel || guilds[message.guild.id].voiceChannel != null) {
      if (guilds[message.guild.id].queue.length > 0 || guilds[message.guild.id].isPlaying) {
        getID(args, function (id) {
          addToQueue(id, message);
          youtubeInfo(id, function (err, videoinfo) {
            if (err) {
              throw new Error(err);
            }
            guilds[message.guild.id].queueNames.push(videoinfo.title);
            addToPlayedTracks(message, videoinfo, message.author);
            message.reply('the song: **' + videoinfo.title + '** has been added to the queue.');
          });
        });
      } else {
        guilds[message.guild.id].isPlaying = true;
        getID(args, function (id) {
          guilds[message.guild.id].queue.push(id);
          playMusic(id, message);
          youtubeInfo(id, function (err, videoinfo) {
            if (err) {
              throw new Error(err);
            }
            guilds[message.guild.id].queueNames.push(videoinfo.title);
            addToPlayedTracks(message, videoinfo, message.author);
            message.reply('the song: **' + videoinfo.title + '** is now playing!');
          });
        });
      }
    } else if (member.voiceChannel === false) {
      message.reply('you have to be in a voice channel to play music!');
    } else {
      message.reply('You have to be in a voice channel to play music!');
    }
}

module.exports.help = {
    name: "play",
    description: "Play a music from youtube",
    usage: "play [url/text]",
    type: "Music"   
}