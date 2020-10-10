const chalk = require('chalk');
const Discord = require('discord.js');
const { player } = require('lavalink');

module.exports = { 
 name: "join",
 aliases: ["summon"],
 category: "Music",
 cooldown: 5,
 description: "Makes the bot join the voice channel",
 usage: "summon",
 run: async (client, message, args) => {
  const msg = await message.channel.send(`**Loading please wait...**`);
  const { channel } = message.member.voice;
  const player = client.music.players.spawn({
   guild: message.guild,
   selfDeaf: true,
   textChannel: message.channel,
   voiceChannel: channel,
  });
  if(!channel || channel.id !== player.voiceChannel.id) return msg.edit("You need to be in a voice channel to use the join command.");
  msg.edit(`\`🔊\` | **Joined:** \`Success\` | ${channel.id}`)
  console.log(chalk.green(`    [Joined]: ${channel.id}`, chalk.yellow`[GuildID]: ${message.guild.id}`));
 }
}
