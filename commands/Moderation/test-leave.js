const Discord = require("discord.js");

module.exports = {
 name: "test-leave",
 aliases: ["debug-leave", "join-leave"],
 description: "Emits the guild member leave event",
 category: "Moderation",
 usage: "test-leave",
 run: async (client, message, args) => {
  try {
   if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
    return await message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | I don't have premission to debug join leave! I need \`BAN_MEMBERS\` premission!`,
     },
    });
   }
   if (!message.member.hasPermission("BAN_MEMBERS")) {
    return await message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | You don't have premission to debug leave event! You need \`BAN_MEMBERS\` premission!`,
     },
    });
   }
   client.emit("guildMemberLeave", message.member);
   message.lineReply({
    embed: {
     color: 4779354,
     description: `${client.bot_emojis.sparkles} | Success! Member leave event emitted, watch your majo welcome channel (if you have one!)`,
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
