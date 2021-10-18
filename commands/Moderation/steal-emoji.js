const { MessageEmbed, Util } = require("discord.js");

module.exports = {
 name: "steal-emoji",
 aliases: ["emoji", "steal-e", "emoji-steal"],
 description: "Steal the emoji from another server",
 category: "Moderation",
 usage: "steal-emoji <emoji> <new name>",
 run: async (client, message, args) => {
  try {
   const emoji = args[0];
   if (!message.guild.me.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) {
    return client.createError(message, `${client.bot_emojis.error} | I don't have premission to manage emojis!`);
   }
   if (!message.member.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) {
    return client.createError(message, `${client.bot_emojis.error} | You don't have premission to manage emojis`);
   }
   if (!emoji) {
    return client.createError(message, `${client.bot_emojis.error} | Please provide emoji to add\n\n**Usage:** \`${client.prefix} steal-emoji <emoji> <new name>\``);
   }
   let custom = Util.parseEmoji(emoji);
   const name = args[1] ? args[1].replace(/[^a-z0-9]/gi, "") : null;
   if (!name) {
    return client.createError(message, `${client.bot_emojis.error} | Please provide a new emoji name\n\n**Usage:** \`${client.prefix} steal-emoji <emoji> <new name>\``);
   }
   if (name.length < 2 || name > 32) {
    return client.createError(message, `${client.bot_emojis.error} | Emoji name length should be between 2 and 32 characters`);
   }
   if (!custom) {
    return client.createError(message, `${client.bot_emojis.error} | Cannot find that emoji! Please try another emoji!\n\n**Usage:** \`${client.prefix} steal-emoji <emoji> <new name>\``);
   }
   const URL = `https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`;
   message.guild.emojis
    .create(URL, name)
    .then((emoji) => {
     return client.createError(message, `${client.bot_emojis.success} | Emoji ${emoji} was successfully added!`, "GREEN").catch((err) => {
      return client.createError(message, `${client.bot_emojis.error} | I can't add the emoji! Check guild free emoji slots!\n\n**Usage:** \`${client.prefix} steal-emoji <emoji> <new name>\``);
     });
    })
    .catch((err) => {
     return client.createError(message, `${client.bot_emojis.error} | I can't add the emoji! Check guild free emoji slots!\n\n**Usage:** \`${client.prefix} steal-emoji <emoji> <new name>\``);
    });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
