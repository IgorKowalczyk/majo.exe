const Discord = require('discord.js')
const canvacord = require("canvacord");
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "changemymind",
 aliases: [],
 description: "Try to change my mind!",
 category: "Image",
 usage: "changemymind (text)",
 run: async (client, message, args) => {
  try {
   const text = args.join(" ");
   if (text.lenght = 0) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "You must enter a text!"
    }})
   }
   if (text > 20) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "Max lenght for the text is 20!"
    }})
   }
   const changemymind = await canvacord.Canvas.changemymind(text);
   const attachment = new Discord.MessageAttachment(changemymind, "changemymind.png");
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
