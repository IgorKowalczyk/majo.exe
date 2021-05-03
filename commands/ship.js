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
   if (message.mentions.members.first()) {
    user1 = message.mentions.members.first();
   } else if(args[0]) {
    console.log(args[0]);
    user1 = args[0];
   } else {
    user1 = message.author;
   }
   
   if(message.mentions.members.first(1)) {
    console.log(message.mentions.members.first(1));
    user2 = message.mentions.members.first(1);
   } else if(args[1]) {
    console.log(args[1]);
    user2 = args[1];
   } else {
    return message.channel.send({embed: {
     color: 16734039,
     description: "❌ | Please mention a user to ship!"
    }}) 
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
 