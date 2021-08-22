const Discord = require("discord.js");

module.exports = {
 name: "slowmode",
 aliases: ["set-slowmode"],
 description: "Set channel slowmode",
 category: "Moderation",
 usage: "slowmode <time>",
 run: async (client, message, args) => {
  try {
   if (!message.guild.me.hasPermission("MANAGE_CHANNEL")) {
    return await message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | I don't have premission to set slowmode!`,
     },
    });
   }
   if (!message.member.hasPermission("MANAGE_CHANNEL")) {
    return await message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | You don't have premission to set slowmode!`,
     },
    });
   }
   const amount = parseInt(args[0]);
   if (args[0].includes("-")) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | Slowmode can't be negative!`,
     },
    });
   }
   if (amount * 60 * 60 > 21600) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | Slowmode can't be longer than 6 hours!`,
     },
    });
   }
   if (isNaN(amount) || !args[0]) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | It doesn't seem to be valid number`,
     },
    });
   }
   if (args[0] === amount + "s") {
    message.channel.setRateLimitPerUser(amount);
    if (amount > 1) {
     return message.lineReply({
      embed: {
       color: 4779354,
       description: `${client.bot_emojis.success} | Slowmode is now set to ` + amount + " seconds",
      },
     });
    } else {
     return message.lineReply({
      embed: {
       color: 4779354,
       description: `${client.bot_emojis.success} | Slowmode is now set to ` + amount + " second",
      },
     });
    }
   }
   if (args[0] === amount + "min") {
    message.channel.setRateLimitPerUser(amount * 60);
    if (amount > 1) {
     return message.lineReply({
      embed: {
       color: 4779354,
       description: `${client.bot_emojis.success} | Slowmode is now set to ` + amount + " minutes",
      },
     });
    } else {
     return message.lineReply({
      embed: {
       color: 4779354,
       description: `${client.bot_emojis.success} | Slowmode is now set to ` + amount + " minute",
      },
     });
    }
   }
   if (args[0] === amount + "h") {
    message.channel.setRateLimitPerUser(amount * 60 * 60);
    if (amount > 1) {
     return message.lineReply({
      embed: {
       color: 4779354,
       description: `${client.bot_emojis.success} | Slowmode is now set to ` + amount + " hours",
      },
     });
    } else {
     return message.lineReply({
      embed: {
       color: 4779354,
       description: `${client.bot_emojis.success} | Slowmode is now set to ` + amount + " hour",
      },
     });
    }
   } else {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | You can only set seconds(s), minutes(min) and hours(h)`,
     },
    });
   }
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
