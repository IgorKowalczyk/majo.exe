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
      description: "<:error:860884617770303519> | I don't have premission to kick members!",
     },
    });
   }
   if (!message.member.hasPermission("KICK_MEMBERS")) {
    return await message.channel.send({
     embed: {
      color: 16734039,
      description: "<:error:860884617770303519> | You don't have permission to kick members",
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
   if (!mentioned.kickable) {
    return await message.lineReply({
     embed: {
      color: 16734039,
      description: "<:error:860884617770303519> | You cannot kick this member!",
     },
    });
   }
   if (message.author === mentioned) {
    return await message.lineReply({
     embed: {
      color: 16734039,
      description: "<:error:860884617770303519> | You cant kick yourself!",
     },
    });
   }
   if (!reason) {
    reason = "No reason provided! ~Kicked by Majo.exe, the best discord bot";
   }
   mentioned.kick(reason);
   await message.lineReply({
    embed: {
     color: 16734039,
     description: ":arrow_right: " + mentioned.displayName + " has been kicked. Reason: `" + reason + "`!",
    },
   });
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
