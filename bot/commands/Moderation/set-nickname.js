const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "set-nickname",
 aliases: [],
 description: "Change user nickname",
 category: "Moderation",
 usage: "set-nickname <user> <nickname> [reason]",
 run: async (client, message, args) => {
  try {
   if (!message.member.permissions.has("CHANGE_NICKNAME")) {
    return client.createError(message, `${client.bot_emojis.error} | You don't have premission to change nicknames!`);
   }
   if (!message.guild.me.permissions.has("CHANGE_NICKNAME")) {
    return client.createError(message, `${client.bot_emojis.error} | I don't have premission to change nicknames!`);
   }

   const member = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase());
   if (!member) {
    return client.createError(message, `${client.bot_emojis.error} | You must mention member to change nickname!\n\n**Usage:** \`${client.prefix} set-nickname <member> <nickname> [reason]\``);
   }
   if (member.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) {
    return client.createError(message, `${client.bot_emojis.error} | Cannot change nickname of this user!`);
   }
   if (!args[1]) {
    return client.createError(message, `${client.bot_emojis.error} | Please enter a new nickname!\n\n**Usage:** \`${client.prefix} set-nickname <member> <nickname> [reason]\``);
   }
   let nick = args.slice(1).join(" ");
   member.setNickname(nick);
   const embed = new MessageEmbed() // Prettier
    .setColor("GREEN")
    .setDescription(`> Changed ${member} \`${member.displayName}\` (ID: \`${member.id}\`) nickname to \`${nick}\``);
   message.reply({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
