const Discord = require("discord.js");

module.exports = {
 name: "prune",
 aliases: ["clear"],
 description: "Removes up to 100 messages",
 category: "Moderation",
 usage: "prune <amount>",
 run: async (client, message, args) => {
  try {
   if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
    return await message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | I don't have premission to manage messages!`,
     },
    });
   }
   if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    let error = new Discord.MessageEmbed() // Prettier
     .setColor("FF5757")
     .setDescription(`${client.bot_emojis.error} | You don't have permission to prune messages!`)
     .setFooter(
      "This message will be deleted after 10 seconds",
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     );
    message.lineReply(error).then((m) =>
     m.delete({
      timeout: 10000,
     })
    );
    return message.delete({
     timeout: 10000,
    });
   }
   if (isNaN(args[0])) {
    let error = new Discord.MessageEmbed() // Prettier
     .setColor("FF5757")
     .setDescription(`${client.bot_emojis.error} | Please input a vaild number!`)
     .setFooter(
      "This message will be deleted after 10 seconds",
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     );
    message.lineReply(error).then((m) =>
     m.delete({
      timeout: 10000,
     })
    );
    return message.delete({
     timeout: 10000,
    });
   }
   if (args[0] > 100) {
    let error = new Discord.MessageEmbed() // Prettier
     .setColor("FF5757")
     .setDescription(`${client.bot_emojis.error} | Insert the number less than 100!`)
     .setFooter(
      "This message will be deleted after 10 seconds",
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     );
    message.lineReply(error).then((m) =>
     m.delete({
      timeout: 10000,
     })
    );
    return message.delete({
     timeout: 10000,
    });
   }
   if (args[0] < 2) {
    let error = new Discord.MessageEmbed() // Prettier
     .setColor("FF5757")
     .setDescription(`${client.bot_emojis.error} | Insert the number more than 1!`)
     .setFooter(
      "This message will be deleted after 10 seconds",
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     );
    message.lineReply(error).then((m) =>
     m.delete({
      timeout: 10000,
     })
    );
    return message.delete({
     timeout: 10000,
    });
   }
   await message.delete();
   await message.channel.bulkDelete(args[0]).then((messages) => {
    let error = new Discord.MessageEmbed() // Prettier
     .setColor("RANDOM")
     .setDescription(`${client.bot_emojis.wastebasket} Deleted ${messages.size}/${args[0]} messages`)
     .setFooter(
      `This message will be deleted after 10 seconds`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     );
    return message.channel.send(error).then((m) =>
     m.delete({
      timeout: 10000,
     })
    );
   });
  } catch (err) {
   message.lineReply({
    embed: {
     color: 16734039,
     description: `Something went wrong... ${client.bot_emojis.sadness}`,
    },
   });
   console.log(err);
  }
 },
};
