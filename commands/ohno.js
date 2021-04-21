const Discord = require('discord.js')
const canvacord = require("canvacord");
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "ohno",
 aliases: [],
 description: "Oh no! It's stupid!",
 category: "Image",
 usage: "ohno (text)",
 run: async (client, message, args) => {
  try {
   if (!args) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "You must enter a text!"
    }})
   }
   if (args > 20) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "Max lenght for the text is 20!"
    }})
   }
   const ohno = await canvacord.ohno(args);
   const attachment = new Discord.MessageAttachment(ohno, "ohno.png");
   return message.channel.send(attachment);
  } catch (err) {
   console.log(err);
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
