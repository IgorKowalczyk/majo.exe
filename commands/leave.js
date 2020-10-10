const chalk = require('chalk');
const Discord = require('discord.js');
const { player } = require('lavalink');

module.exports = { 
 name: "leave",
 aliases: ["quit"],
 category: "Music",
 cooldown: 5,
 description: "Makes the bot leave from the voice channel",
 usage: "leave",
 run: async (client, message, args) => {
  const msg = await message.channel.send(`**Loading please wait...**`);
  const { channel } = message.member.voice;
  const player = client.music.players.get(message.guild.id);
  if(!player) return msg.edit("No song/s currently playing in this guild.");
  if(!channel || channel.id !== player.voiceChannel.id) return msg.edit("You need to be in a voice channel to use the leave command.");
  client.music.players.destroy(message.guild.id);
  msg.edit(`\`🚫\` | **Leaved:** \`Success\` | ${channel.id}`)
  console.log(chalk.red(`    [Leaved]: ${channel.id}`, chalk.yellow(`[GuildID]: ${message.guild.id}`)));
 }
}
