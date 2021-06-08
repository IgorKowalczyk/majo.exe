const Discord = require("discord.js");
const AmeClient = require("amethyste-api");
const AmeAPI = new AmeClient(process.env.AMEAPI);

module.exports = {
 name: "pixelize",
 aliases: [],
 description: "Pixelize the user avatar",
 category: "Image",
 usage: "pixelize [user mention, user id, user name] [pixelize]",
 run: async (client, message, args) => {
  try {
   const pixelize = args[0] || 50;
   if (args[0]) {
    if (isNaN(args[0])) {
     return message.lineReply({
      embed: {
       color: 16734039,
       description: "❌ | Pixelize must be a number!",
      },
     });
    }
    if (message.content.includes("-")) {
     return message.lineReply({
      embed: {
       color: 16734039,
       description: "❌ | Pixelize cannot be negative!",
      },
     });
    }
    if (args[0] < 2) {
     return message.lineReply({
      embed: {
       color: 16734039,
       description: "❌ | Pixelize must be higher than 2!",
      },
     });
    }
    if (args[0] > 50) {
     return message.lineReply({
      embed: {
       color: 16734039,
       description: "❌ | Pixelize must be lower than 50!",
      },
     });
    }
   }
   const User = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase());
   if (!User) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: "❌ | Please mention a user!",
     },
    });
   }
   const wait = await message.lineReply({
    embed: {
     color: 4779354,
     description: "✨ | Please wait... I'm generating your image",
    },
   });
   const buffer = await AmeAPI.generate("pixelize", {
    url: User.user.displayAvatarURL({
     format: "png",
     size: 2048,
    }),
    pixelize: pixelize,
   });
   const attachment = new Discord.MessageAttachment(buffer, "pixelize.png");
   message.channel.send(attachment);
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
