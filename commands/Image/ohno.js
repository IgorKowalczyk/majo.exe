const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports = {
 name: "ohno",
 aliases: [],
 description: "Oh no! It's stupid!",
 category: "Image",
 usage: "ohno (text)",
 run: async (client, message, args) => {
  try {
   if (!args[0]) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: "❌ | You must enter a text!",
     },
    });
   }
   if (args.join(" ") > 20) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: "❌ | Max lenght for the text is 20!",
     },
    });
   }
   const wait = await message.lineReply({
    embed: {
     color: 4779354,
     description: "✨ | Please wait... I'm generating your image",
    },
   });
   const ohno = await canvacord.Canvas.ohno(args.join(" "));
   const attachment = new Discord.MessageAttachment(ohno, "ohno.png");
   message.channel.send(attachment);
   wait.delete({
    timeout: 5000,
   });
  } catch (err) {
   console.log(err);
   message.lineReply({
    embed: {
     color: 16734039,
     description: "Something went wrong... :cry:",
    },
   });
  }
 },
};
