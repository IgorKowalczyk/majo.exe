const Discord = require('discord.js');
const config = require("../../config");
const prefix = config.prefix;

module.exports = async (client, member) => {
try {
 const channel = member.guild.channels.cache.find(channel => channel.name.includes('hello-or-bye'));
 if (!channel) return;
  let embed = new Discord.MessageEmbed()
   .setDescription(`${member.displayName}#${member.user.discriminator} has joined the server.`)
   .setThumbnail(member.user.avatarURL())
   .setColor("RANDOM")
   .setTimestamp()
   .setFooter(`Total members: ${member.guild.memberCount} | ${prefix} help`);
  channel.send((embed = embed));
} catch(err) {
 console.log(err);
}
}
