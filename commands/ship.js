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
   let user1;
   let user2
   const users =  message.mentions.users.array();
   if (users[0]) {
    console.log("M1 " + users[0])
    
    user1 = users[0];
   } else if(args[0]) {
    console.log("A1" + args[0]);
    user1 = args[0];
   } else {
    user1 = message.author;
   }
   if (user1 == message.author) {
    if(args[0]) {
     console.log("A2 " + args[0]);
     user2 = args[0];
    } else if(message.mentions.member.first()) {
     console.log("M2 " + message.mentions.member.first());
     user2 = message.mentions.member.first();
    } else {
     return message.channel.send({embed: {
      color: 16734039,
      description: "❌ | Please mention a user to ship!"
     }}) 
    }
   } else {
    if(args[1]) {
     console.log("A2 " + args[1]);
     user2 = args[1];
    } else if(users[1]) {
     console.log("M2 " + users[1]);
     user2 = users[1];
    } else {
     return message.channel.send({embed: {
      color: 16734039,
      description: "❌ | Please mention a user to ship!"
     }}) 
    }
   }
   const ship = Math.floor(Math.random() * 100) + 1;
   const bar = progressbar(100, ship, 10, "<:bar:838757737327755335>", "<:bar2:838757737596190782>", "💔 ", " ❤️", false)
   const mehh = new Discord.MessageEmbed() 
    .setTitle(':twisted_rightwards_arrows: This isn\'t a match', message.guild.iconURL({ dynamic: true, format: 'png'}))
    .setThumbnail('https://cdn.discordapp.com/attachments/824906735176253450/828554687229067275/images.png')
    .setDescription(`I shipped **${user1}** with **${user2}** and it is **${ship}%**\n${bar}`)
    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    .setColor("RED")
   const love = new Discord.MessageEmbed() 
    .setTitle(':twisted_rightwards_arrows: They are born for each others!', message.guild.iconURL({ dynamic: true, format: 'png'}))
    .setThumbnail('https://cdn.discordapp.com/attachments/824906735176253450/828555115593859123/9k.png')
    .setDescription(`I shipped **${user1}** with **${user2}** and it is **${ship}%**\n${bar}`)
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
