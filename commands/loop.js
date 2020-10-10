const chalk = require('chalk');
const delay = require('delay');
const Discord = require('discord.js');
const { player } = require('lavalink');

module.exports = {
 name: "loop",
 aliases: ["repeat"],
 category: "Music",
 cooldown: 5,
 description: "Loop the song currently playing",
 usage: "loop <current, all>",
 run: async (client, message, args) => {
  const msg = await message.channel.send('Loading please wait...');
  const player = client.music.players.get(message.guild.id);
  if (!player) return message.channel.send("No song/s currently playing within this guild.");
  const { channel } = message.member.voice;
  if (!channel || channel.id !== player.voiceChannel.id) return message.channel.send("You need to be in a voice channel.")
  if (!args[0] || args[0].toLowerCase() == 'current') {
   if (player.trackRepeat === false) {
    await delay(1500);
    player.setTrackRepeat(true);
    const looped = new Discord.MessageEmbed()
     .setDescription(`\`🔁\` | **Song is loop:** \`Current\``)
     .setColor("RANDOM");
    msg.edit('', looped);
   } else {
    await delay(1500);
    player.setTrackRepeat(false);
    const unlooped = new Discord.MessageEmbed()
     .setDescription(`\`🔁\` | **Song is unloop:** \`Current\``)
     .setColor("RANDOM");
    msg.edit('', unlooped);
   }
  }
  else if (args[0] == 'all') {
   if (player.queueRepeat === true) {
    await delay(1500);
    player.setQueueRepeat(false);
    const unloopall = new Discord.MessageEmbed()
     .setDescription(`\`🔁\` | **Song is unloop:** \`All\``)
     .setColor("RANDOM");
    msg.edit('', unloopall);
   } else {
    await delay(1500);
    player.setQueueRepeat(true);
    const loopall = new Discord.MessageEmbed()
     .setDescription(`\`🔁\` | **Song is loop:** \`All\``)
     .setColor("RANDOM");
    msg.edit('', loopall);
   }
  }
 }
}
