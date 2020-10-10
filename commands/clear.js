const chalk = require('chalk');
const Discord = require('discord.js');
const { player } = require('lavalink');

module.exports = { 
 name: "clear",
 aliases: ["c"],
 category: "Music",
 cooldown: 5,
 description: "Clears a queue",
 usage: "clear",
 run: async (client, message, args) => {
  const msg = await message.channel.send(`**Loading please wait...**`);
  const player = client.music.players.get(message.guild.id);
  if(!player) return msg.edit("No song/s currently playing in this guild.");
  const { channel } = message.member.voice;
  if(!channel || channel.id !== player.voiceChannel.id) return msg.edit("You need to be in a voice channel to use the skip command.");
  player.queue.clear();
  const cleared = new Discord.MessageEmbed()
   .setDescription("\`📛\` | **Queue has been:** `Cleared`")
   .setColor("RANDOM");
  msg.edit('', cleared);
  console.log(chalk.magenta(`  [Command]: Clear used by ${message.author.tag} from ${message.guild.name}`));
 }
}
