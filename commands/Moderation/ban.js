const Discord = require("discord.js");

module.exports = {
 name: "ban",
 aliases: [],
 description: "Ban a member",
 category: "Moderation",
 usage: "ban <mention> <reason>",
 run: async (client, message, args) => {
  try {
   if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
    return await message.lineReply({
     embed: {
      color: 16734039,
      description: "<:error:860884617770303519> | I don't have premission to ban members!",
     },
    });
   }
   if (!message.member.hasPermission("BAN_MEMBERS")) {
    return await message.lineReply({
     embed: {
      color: 16734039,
      description: "<:error:860884617770303519> | You don't have premission to ban members!",
     },
    });
   }
    let mentioned = await message.mentions.members.first();
    let reason = await args.slice(1).join(" ");
    if (!mentioned) {
     return await message.lineReply({
      embed: {
       color: 16734039,
       description: "<:error:860884617770303519> | Mention a valid member!",
      },
     });
    }
    if (!mentioned.bannable) {
     return await message.lineReply({
      embed: {
       color: 16734039,
       description: "<:error:860884617770303519> | You cannot ban this member!",
      },
     });
    }
    if (message.author === mentioned) {
     return await message.lineReply({
      embed: {
       color: 16734039,
       description: "<:error:860884617770303519> | You can't ban yourself!",
      },
     });
    }
    if (!reason) {
     reason = "No reason provided! Banned by " + message.author + ". ~Majo.exe - The best discord bot!";
    }
    message.guild.members.ban(mentioned, {
     reason: reason,
    });
    await message.lineReply({
     embed: {
      color: 16734039,
      description: "⛔ " + mentioned.displayName + " has been banned. Reason: `" + reason + "`!",
     },
    });
  } catch (err) {
   message.lineReply({
    embed: {
     color: 16734039,
     description: "Something went wrong... :cry:",
    },
   });
  }
 },
};
