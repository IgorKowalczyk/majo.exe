const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {

const member = message.member;
const msg = message.content.toLowerCase();
const args = message.content.split(' ').slice(1).join(' ');

if (guilds[message.guild.id].isPlaying === false) {
      message.reply('no music is playing!');
      return;
    }

    if (message.guild.member(message.author.id).roles.find(roles => roles.name === role)) {
      message.reply('stopping the music...');

      guilds[message.guild.id].queue = [];
      guilds[message.guild.id].queueNames = [];
      guilds[message.guild.id].isPlaying = false;
      guilds[message.guild.id].dispatcher.end();
      guilds[message.guild.id].voiceChannel.leave();
    } else {
      message.reply("nice try, but only " + role + "s can stop me!");
    }
}

module.exports.help = {
    name: "stop",
    description: "Stop now playing song",
    usage: "stop",
    type: "Music"   
}