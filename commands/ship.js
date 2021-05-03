const Discord = require("discord.js");
const progressbar = require('percentagebar');

module.exports = {
 name: "ship",
 aliases: [],
 description: "Ship members",
 category: "Fun",
 usage: "ship <member> (member)",
 run: async (client, message, args) => {
  try {
   let user = message.mentions.users.first();
   let ship = Math.floor(Math.random() * 100) + 1;
   const line = '▬';
   const slider = '🔴';
   const bar = statusbar(100, ship, 10, "▓", "░", ":broken-heart: ", " :heart:", false)
   if(!user) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "❌ | Please mention a user to ship!"
    }})
   }
   if(user === message.author) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "❌ | Please mention other person, not yourself!"
    }})
   }
   const mehh = new Discord.MessageEmbed() 
    .setTitle('This isn\'t a match', message.guild.iconURL({ dynamic: true, format: 'png'}))
    .setThumbnail('https://cdn.discordapp.com/attachments/824906735176253450/828554687229067275/images.png')
    .setDescription(`${message.author} shipped with ${user} and it is ${ship}%\n${bar}`)
    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    .setColor("RED")
   const love = new Discord.MessageEmbed() 
    .setTitle('They are born for each others!', message.guild.iconURL({ dynamic: true, format: 'png'}))
    .setThumbnail('https://cdn.discordapp.com/attachments/824906735176253450/828555115593859123/9k.png')
    .setDescription(`${message.author} shipped with ${user} and it is ${ship}%\n${bar}`)
    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    .setColor("GREEN")
   if(ship > 50) {
    message.channel.send(love)
   } else {
    message.channel.send(mehh)
   }
  } catch(err) {
   console.log(err);
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
 