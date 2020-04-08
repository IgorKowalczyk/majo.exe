const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
if (guilds[message.guild.id].skippers.indexOf(message.author.id) === -1) {
      guilds[message.guild.id].skippers.push(message.author.id);
      guilds[message.guild.id].skipReq++;
      if (guilds[message.guild.id].skipReq >=
      Math.ceil((guilds[message.guild.id].voiceChannel.members.size - 1) / 2) || message.guild.member(message.author.id).roles.find(roles => roles.name === role)) {
        skipMusic(message);
        message.reply('Your skip request has been accepted. The current song will be skipped!');
      } else {
        message.reply('Tour skip request has been accepted. You need **' +
        (Math.ceil((guilds[message.guild.id].voiceChannel.members.size - 1) / 2) -
        guilds[message.guild.id].skipReq) + '** more skip request(s)!');
      }
    } else {
      message.reply('you already submitted a skip request.');
    }
}

module.exports.help = {
    name: "skip",
    description: "Skip now playing song",
    usage: "skip",
    type: "Music"   
}