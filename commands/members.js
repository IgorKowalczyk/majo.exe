const Discord = require("discord.js");
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "members",
 aliases: ["users"],
 description: "How many members are in the current server",
 category: "Utility",
 usage: "members",
 run: async (client, message, args) => {
  let onlineMembers = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0).filter(m => m.presence.status === 'online');
  let offlineMembers = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0).filter(m => m.presence.status === 'offline');
  let idleMembers = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0).filter(m => m.presence.status === 'idle');
  let dndMembers = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0).filter(m => m.presence.status === 'dnd');
  var online = 0;
  var offline = 0;
  var idle = 0;
  var donotdisturb = 0;
  onlineMembers.forEach(member => {
   online += 1;
  }); 
  offlineMembers.forEach(member => {
   offline += 1;
  }); 
  onlineMembers.forEach(member => {
   online += 1;
  });   
  idleMembers.forEach(member => {
   idle += 1;
  });  
  dndMembers.forEach(member => {
   donotdisturb += 1;
  }); 
  const embed = new Discord.MessageEmbed()
   .setAuthor("Total members", message.guild.iconURL)
   .setColor("RANDOM")
   .addField("Overall Members:", client.guilds.cache.reduce((a, g) => a + g.memberCount, 0))
   .addField("Online Members:", online)
   .addField("Offline/Invisible Members:", offline)
   .addField("Idle Members:", idle)
   .addField("Do Not Disturb Members:", donotdisturb)
  message.channel.send(embed);
 }
}
