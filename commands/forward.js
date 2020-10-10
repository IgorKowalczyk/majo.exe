const chalk = require('chalk');
const Discord = require('discord.js');
const prefix = process.env.PREFIX;
const formatDuration = require('../utils/formatduration.js')
const { player } = require('lavalink');

const fastForwardNum = 10;

module.exports = { 
 name: "forward",
 aliases: ["f"],
 category: "Music",
 cooldown: 5,
 description: "Forward song",
 usage: "<seconds>",
 run: async (client, message, args) => {
  const msg = await message.channel.send(`**Loading please wait...**`);
  const player = client.music.players.get(message.guild.id);
  if(!player) return msg.edit("No song/s currently playing in this guild.");
  const { channel } = message.member.voice;
  if(!channel || channel.id !== player.voiceChannel.id) return msg.edit("You need to be in a voice channel to use the skip command.");
  const CurrentDuration = formatDuration(player.position);
  const { duration } = player.queue[0];
  if (args[0] && !isNaN(args[0])) {
   if((player.position + args[0] * 1000) < duration) {
   player.seek(player.position + args[0] * 1000);
   const forward1 = new Discord.MessageEmbed()
    .setDescription("\`⏭\` | **Forward to:** "+ `\`${CurrentDuration}\``)
    .setColor("RANDOM");
   msg.edit('', forward1);
   console.log(chalk.magenta(`  [Command]: Forward used by ${message.author.tag} from ${message.guild.name}`));
  } else { 
   return msg.edit('Cannot forward beyond the song\'s duration.'); 
  }
  } else if (args[0] && isNaN(args[0])) { 
   return message.reply(`Invalid argument, must be a number.\nCorrect Usage: \`${prefix}forward <seconds>\``); 
  }
  if (!args[0]) {
   if((player.position + fastForwardNum * 1000) < duration) {
    player.seek(player.position + fastForwardNum * 1000);
    const forward2 = new Discord.MessageEmbed()
     .setDescription("\`⏭\` | **Forward to:** "+ `\`${CurrentDuration}\``)
     .setColor("RANDOM");
    msg.edit('', forward2);
    console.log(chalk.magenta(`  [Command]: Forward used by ${message.author.tag} from ${message.guild.name}`));
   } else {
    return msg.edit('Cannot forward beyond the song\'s duration.');
   }
  }
 }
}
