const delay = require('delay');
const { earrape } = require('../utils/volume.js')
const { player } = require('lavalink');
const chalk = require('chalk');
const Discord = require('discord.js');

module.exports = { 
 name: "errape",
 aliases: [],
 category: "Music",
 cooldown: 5,
 description: "Turn on errape filter",
 usage: "errape",
 run: async (client, message, filter) => {
  const msg = await message.channel.send("Turning on `Earrape` please wait...");
  const player = client.music.players.get(message.guild.id);
  if(!player) return msg.edit("No song/s currently playing in this guild.");
  const { channel } = message.member.voice;
  if (!channel) return message.channel.send("You need to be in a voice channel to play music.");
  player.setVolume(earrape);
  player.setEQ(...Array(6).fill(0).map((n, i) => ([{ band: i, gain: 0.5 }])));
  const earrapped = new Discord.MessageEmbed()
   .setAuthor("Turn on filter: Earrape", 'https://cdn.discordapp.com/emojis/758423098885275748.gif')
   .setColor("RANDOM");
  msg.edit('', earrapped);
  console.log(chalk.magenta(`  [Command]: Earrape used by ${message.author.tag} from ${message.guild.name}`));
 }
}
