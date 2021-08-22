const Discord = require("discord.js");

module.exports = {
 name: "ban",
 aliases: [],
 description: "Ban a member",
 category: "Moderation",
 usage: "ban <mention> <reason>",
 run: async (client, message, args) => {
  try {
   if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
    return await message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | I don't have premission to ban members!`,
     },
    });
   }
   if (!message.member.hasPermission("BAN_MEMBERS")) {
    return await message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | You don't have premission to ban members!`,
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
   if (!mentioned.bannable) {
    return await message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | You cannot ban this member!`,
     },
    });
   }
   if (message.author === mentioned) {
    return await message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | You can't ban yourself!`,
     },
    });
   }
   if (!reason) {
    reason = "No reason provided! Banned by " + message.author;
   }
   message.guild.members.ban(mentioned, {
    reason: reason,
   });
   await message.lineReply({
    embed: {
     color: 16734039,
     description: `${client.bot_emojis.success} | ${mentioned.displayName} has been banned. Reason: \`${reason}\``,
    },
   });
  } catch (err) {
   message.lineReply({
    embed: {
     color: 16734039,
     description: `Something went wrong... ${client.bot_emojis.sadness}`,
    },
   });
  }
 },
};
