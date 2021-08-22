const Discord = require("discord.js");

module.exports = {
 name: "say",
 aliases: [],
 description: "Send a message using bot",
 category: "Moderation",
 usage: "say <channel> <message>",
 run: async (client, message, args) => {
  if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
   return await message.lineReply({
    embed: {
     color: 16734039,
     description: `${client.bot_emojis.error} | I don't have premission to manage messages!`,
    },
   });
  }
  if (message.member.hasPermission("MANAGE_MESSAGES")) {
   message.delete();
   const taggedChannel = await message.mentions.channels.first();
   if (taggedChannel) {
    await taggedChannel.send(args.join(" ").replace(taggedChannel, ""));
   } else {
    const saymessage = await args.join(" ");
    if (saymessage.length >= 1) {
     await message.channel.send(saymessage + "\n\n~Message sent by <@" + message.author + ">");
    } else {
     await message.lineReply({
      embed: {
       color: 16734039,
       description: `${client.bot_emojis.sparkles} | You need to enter a message!`,
      },
     });
    }
   }
  } else {
   message.lineReply({
    embed: {
     color: 16734039,
     description: `${client.bot_emojis.error} | You don't have permission to send this message by me!`,
    },
   });
  }
 },
};
