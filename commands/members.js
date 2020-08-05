const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {  

  let onlineMembers = message.guild.members.filter(m => m.presence.status === 'online');
  let offlineMembers = message.guild.members.filter(m => m.presence.status === 'offline');
  let idleMembers = message.guild.members.filter(m => m.presence.status === 'idle');
  let dndMembers = message.guild.members.filter(m => m.presence.status === 'dnd');
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
  
  const embed = new Discord.RichEmbed()
    .setAuthor("Members", message.guild.iconURL)
    .setColor("RANDOM")
    .addField("Overall Members:", message.guild.memberCount || message.guild.members.size)
    .addField("Online Members:", online)
    .addField("Offline/Invisible Members:", offline)
    .addField("Idle Members:", idle)
    .addField("Do Not Disturb Members:", donotdisturb)
  
  message.channel.send(embed);
}

module.exports.help = {
    name: "members",
    description: "How many members are in the current server",
    usage: "members",
    type: "Utility" 
}