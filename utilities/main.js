const Discord = require("discord.js");

module.exports = {
 async canModifyQueue(member) {
  let resultsEmbed = new Discord.MessageEmbed().setTitle("You must be in the same voice channel as me!").setColor("#F0EAD6");
  if (member.voice.channel !== member.guild.me.voice.channel) {
   return member.send(resultsEmbed);
  }
  return 0;
 },
};
