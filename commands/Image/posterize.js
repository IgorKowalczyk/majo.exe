const Discord = require("discord.js");
const AmeClient = require("amethyste-api");
const AmeAPI = new AmeClient(process.env.AMEAPI);

module.exports = {
 name: "posterize",
 aliases: [],
 description: "Posterize the user avatar",
 category: "Image",
 usage: "posterize [user mention, user id, user name] [posterize]",
 run: async (client, message, args) => {
  try {
   const User = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase());
   const posterize = args[0] || 9;
   if (!User) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | Please mention a user!`,
     },
    });
   }
   if (isNaN(args[0])) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | Posterize must be a number!`,
     },
    });
   }
   if (message.content.includes("-")) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | Posterize cannot be negative!`,
     },
    });
   }
   if (args[0] < 2) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | Posterize must be higher than 2!`,
     },
    });
   }
   if (args[0] > 40) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | Posterize must be lower than 40!`,
     },
    });
   }
   const wait = await message.lineReply({
    embed: {
     color: 4779354,
     description: `${client.bot_emojis.sparkles} Please wait... I'm generating your image`,
    },
   });
   const buffer = await AmeAPI.generate("posterize", {
    url: User.user.displayAvatarURL({
     format: "png",
     size: 2048,
    }),
    posterize: posterize,
   });
   const attachment = new Discord.MessageAttachment(buffer, "posterize.png");
   message.channel.send(attachment);
  } catch (err) {
   console.log(err);
   message.lineReply({
    embed: {
     color: 16734039,
     description: `Something went wrong... ${client.bot_emojis.sadness}`,
    },
   });
  }
 },
};
