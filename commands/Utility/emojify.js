const Discord = require("discord.js");
const emoji = require('discord-emoji-convert');

module.exports = {
 name: "emojify",
 aliases: [],
 description: "Convert text to emojis",
 category: "Utility",
 usage: "emojify (text)",
 run: async (client, message, args) => {
  try {
   const emojis = args.join(" ");
   if(!emojis) {
    return message.channel.send({embed: {
     color: 16734039,
     description: '❌ | Please enter text'
    }})
   }
   if(emojis.lenght > 20) {
    return message.channel.send({embed: {
     color: 16734039,
     description: '❌ | Please enter shorter string. Max characters: 20'
    }})
   }
   const converted = emoji.convert(emojis);
   const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`Converted text: ${converted}`)
    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
   message.channel.send(converted)
  } catch (err) {
   console.log(err);
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
 