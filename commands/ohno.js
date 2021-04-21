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
   const wait = await message.channel.send({embed: {
    color: 4779354,
    description: "Please wait... I'm generating your image",
    footer: "This message will be deleted in 5 secounds"
   }})
   const ohno = await canvacord.Canvas.ohno(text);
   const attachment = new Discord.MessageAttachment(ohno, "ohno.png");
   message.channel.send(attachment);
   wait.delete({
    timeout: 5000
   });
  } catch (err) {
   console.log(err);
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
