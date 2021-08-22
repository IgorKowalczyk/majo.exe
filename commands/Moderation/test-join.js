const Discord = require("discord.js");

module.exports = {
 name: "test-join",
 aliases: ["debug-join", "join-debug"],
 description: "Emits the guild member join event",
 category: "Moderation",
 usage: "test-join",
 run: async (client, message, args) => {
  try {
   if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
    return await message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | I don't have premission to debug join event! I need \`BAN_MEMBERS\` premission!`,
     },
    });
   }
   if (!message.member.hasPermission("BAN_MEMBERS")) {
    return await message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | You don't have premission to debug join event! You need \`BAN_MEMBERS\` premission!`,
     },
    });
   }
   client.emit("guildMemberAdd", message.member);
   message.lineReply({
    embed: {
     color: 4779354,
     description: `${client.bot_emojis.sparkles} | Success! Member join event emitted, watch your majo welcome channel (if you have one!)`,
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
