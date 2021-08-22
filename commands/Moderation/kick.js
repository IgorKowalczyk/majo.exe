const Discord = require("discord.js");

module.exports = {
 name: "kick",
 aliases: [],
 description: "Kicks a member from guild",
 category: "Moderation",
 usage: "kick <mention> <reason>",
 run: async (client, message, args) => {
  try {
   if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
    return await message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | I don't have premission to kick members!`,
     },
    });
   }
   if (!message.member.hasPermission("KICK_MEMBERS")) {
    return await message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | You don't have permission to kick members`,
     },
    });
   }
   let mentioned = await message.mentions.members.first();
   let reason = await args.slice(1).join(" ");
   if (!mentioned) {
    return await message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | Mention a valid member!`,
     },
    });
   }
   if (!mentioned.kickable) {
    return await message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | You cannot kick this member!`,
     },
    });
   }
   if (message.author === mentioned) {
    return await message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | You cant kick yourself!`,
     },
    });
   }
   if (!reason) {
    reason = `No reason provided! ~Kicked by ${message.author}`;
   }
   mentioned.kick(reason);
   await message.lineReply({
    embed: {
     color: 16734039,
     description: `${client.bot_emojis.success} | ${mentioned.displayName} has been kicked. Reason: \`${reason}\``,
    },
   });
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
