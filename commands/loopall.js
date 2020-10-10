const chalk = require('chalk');
const delay = require('delay');
const Discord = require('discord.js');
const { player } = require('lavalink');

module.exports = {
 name: "loopall",
 aliases: ["repeatall", "lq", "loopqueue"],
 category: "Music",
 cooldown: 5,
 description: "loop the song in queue playing",
 usage: "loop <current, all>",
 run: async (client, message, args) => {
  const msg = await message.channel.send('Loading please wait...');
  const player = client.music.players.get(message.guild.id);
  if (!player) return message.channel.send("No song/s currently playing within this guild.");
  const { channel } = message.member.voice;
  if (!channel || channel.id !== player.voiceChannel.id) return message.channel.send("You need to be in a voice channel.")
  if (player.queueRepeat === true) {
   await delay(1500);
   player.setQueueRepeat(false)
   const unloopall = new Discord.MessageEmbed()
    .setDescription(`\`🔁\` | **Song is unloop:** \`All\``)
    .setColor('#000001');
   msg.edit('', unloopall);
  } else {
   await delay(1500);
   player.setQueueRepeat(true);
   const loopall = new Discord.MessageEmbed()
    .setDescription(`\`🔁\` | **Song is loop:** \`All\``)
    .setColor('#000001');
   msg.edit('', loopall);
  }
 }
}
