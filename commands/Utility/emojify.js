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
   const re = new RegExp("^/abcdefghijklmnopqrstuvwxyz1234567890\\\+\\-x\\\*\\/\\\$!\\\?/$");
   if(emojis.lenght > 20) {
    return message.channel.send({embed: {
     color: 16734039,
     description: '❌ | Please enter shorter string. Max characters: 20'
    }})
   }
   if (re.test(emojis)) {
    emoji.convert(emojis)
   } else {
    return message.channel.send({embed: {
     color: 16734039,
     description: '❌ | Please enter a vaild string! \`abcdefghijklmnopqrstuvwxyz1234567890+-x*/$!?\`'
    }})
   }
  } catch (err) {
   console.log(err);
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
 