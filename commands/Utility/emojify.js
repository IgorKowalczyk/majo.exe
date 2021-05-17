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
    return message.lineReply({embed: {
     color: 16734039,
     description: '❌ | Please enter text'
    }})
   }
   if(emojis.lenght < 30) {
    return message.lineReply({embed: {
     color: 16734039,
     description: '❌ | Please enter shorter string. Please shorten the text, maximum length is 30 characters!'
    }})
   }
   const converted = emoji.convert(emojis);
   const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`Converted text: ${converted}`)
    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
   message.lineReply(embed)
  } catch (err) {
   console.log(err);
   message.lineReply({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
 