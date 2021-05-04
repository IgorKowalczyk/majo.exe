const Discord = require('discord.js')
const config = require("../config");
const prefix = config.prefix;
const AmeClient = require('amethyste-api');
const AmeAPI = new AmeClient(process.env.AMEAPI);

module.exports = {
 name: "posterize",
 aliases: [],
 description: "Posterize the user avatar",
 category: "Image",
 usage: "posterize [user mention, user id, user name] [posterize]",
 run: async (client, message, args) => {
  try {
   const posterize = args[0] || 9;
   if (args[0]) {
    if (isNaN(args[0])) {
     return message.channel.send({embed: {
      color: 16734039,
      description: "❌ | Posterize must be a number!"
     }})
    }
    if (message.content.includes('-')) {
     return message.channel.send({embed: {
      color: 16734039,
      description: "❌ | Posterize cannot be negative!"
     }})
    }
    if (args[0] < 2) {
     return message.channel.send({embed: {
      color: 16734039,
      description: "❌ | Posterize must be higher than 2!"
     }})   
    }
    if (args[0] > 40) {
     return message.channel.send({embed: {
      color: 16734039,
      description: "❌ | Posterize must be lower than 40!"
     }})   
    }
   }
   const User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.member;
   const wait = await message.channel.send({embed: {
     color: 4779354,
     description: "✨ | Please wait... I'm generating your image",
    }})
   const buffer = await AmeAPI.generate("posterize", {
    url: User.user.displayAvatarURL({
     format: "png",
     size: 2048
    }),
    posterize: posterize
   });
   const attachment = new Discord.MessageAttachment(buffer, "posterize.png");
   message.channel.send(attachment);
  } catch (err) {
   console.log(err);
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
