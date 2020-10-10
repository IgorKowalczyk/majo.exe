const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const { player } = require('lavalink');

module.exports = { 
 name: "pause",
 aliases: ["pa"],
 category: "Music",
 cooldown: 5,
 description: "Makes the bot pause/resume the music currently playing",
 usage: "pause",
 run: async (client, message, args) => {
  const msg = await message.channel.send('Loading please wait...');
  const player = client.music.players.get(message.guild.id);
  if (!player) return message.channel.send("No song/s currently playing in this guild.");
  const { channel } = message.member.voice;
  if (!channel || channel.id !== player.voiceChannel.id) return message.channel.send("You need to be in a voice channel to pause music.");
  player.pause(player.playing);
  const embed = new MessageEmbed()
   .setDescription(`\`⏯\` | **Song has been:** \`${player.playing ? "Resumed" : "Paused"}\``)
   .setColor('#000001');
  msg.edit('', embed);
 }
}
