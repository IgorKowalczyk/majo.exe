module.exports = {
 name: "slowmode",
 aliases: ["set-slowmode"],
 description: "Set channel slowmode",
 category: "Moderation",
 usage: "slowmode <time>",
 run: async (client, message, args) => {
  try {
   if (!message.guild.me.permissions.has("MANAGE_CHANNEL")) {
    return client.createError(message, `${client.bot_emojis.error} | I don't have premission to set slowmode!`);
   }
   if (!message.member.permissions.has("MANAGE_CHANNEL")) {
    return client.createError(message, `${client.bot_emojis.error} | You don't have premission to set slowmode!`);
   }
   const amount = parseInt(args[0]);
   if (!args[0]) {
    return client.createError(message, `${client.bot_emojis.error} | You must enter time to set slowmode!`);
   }
   if (args[0].includes("-")) {
    return client.createError(message, `${client.bot_emojis.error} | Slowmode can't be negative!`);
   }
   if (amount * 60 * 60 > 21600) {
    return client.createError(message, `${client.bot_emojis.error} | Slowmode can't be longer than \`6 hours\`!`);
   }
   if (isNaN(amount) || !args[0]) {
    return client.createError(message, `${client.bot_emojis.error} | Slowmode must be (positive) number!`);
   }
   if (amount === 0) {
    message.channel.setRateLimitPerUser(0);
    return client.createError(message, `${client.bot_emojis.success} | Slowmode is now \`disabled\`!`, "GREEN");
   }
   if (args[0] === amount + "s") {
    message.channel.setRateLimitPerUser(amount);
    return client.createError(message, `${client.bot_emojis.success} | Slowmode is now set to \`${amount}\` ${amount > 1 ? "seconds" : "second"}`, "GREEN");
   }
   if (args[0] === amount + "min") {
    message.channel.setRateLimitPerUser(amount * 60);
    return client.createError(message, `${client.bot_emojis.success} | Slowmode is now set to \`${amount}\` ${amount > 1 ? "minutes" : "minute"}`, "GREEN");
   }
   if (args[0] === amount + "h") {
    message.channel.setRateLimitPerUser(amount * 60 * 60);
    return client.createError(message, `${client.bot_emojis.success} | Slowmode is now set to \`${amount}\` ${amount > 1 ? "hours" : "hour"}`, "GREEN");
   } else {
    return client.createError(message, `${client.bot_emojis.error} | You can only set seconds(s), minutes(min) and hours(h)`);
   }
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
