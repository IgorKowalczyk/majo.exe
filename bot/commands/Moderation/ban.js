const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "ban",
 aliases: [],
 description: "Ban a member",
 category: "Moderation",
 usage: "ban <mention> [reason]",
 run: async (client, message, args) => {
  try {
   if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
    return client.createError(message, `${client.bot_emojis.error} | I don't have premission to ban members!`);
   }
   if (!message.member.permissions.has("BAN_MEMBERS")) {
    return client.createError(message, `${client.bot_emojis.error} | You don't have premission to ban members!`);
   }
   let mentioned = await message.mentions.members.first();
   let message_args = await args.slice(1).join(" ");
   let reason = `${message_args || "No reason provided!"} | Banned by: ${message.author.tag}`;
   if (!mentioned) {
    return client.createError(message, `${client.bot_emojis.error} | Mention a valid member!\n\n**Usage:** \`${client.prefix} ban <mention> [reason]\``);
   }
   if (!mentioned.bannable) {
    return client.createError(message, `${client.bot_emojis.error} | You cannot ban this member!`);
   }
   if (message.author === mentioned) {
    return client.createError(message, `${client.bot_emojis.error} | You can't ban yourself!`);
   }
   if (mentioned.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) {
    return client.createError(message, `${client.bot_emojis.error} | You cant ban this user!`);
   }
   if (reason.length > 1024) reason = reason.slice(0, 1021) + "...";
   message.guild.members.ban(mentioned, {
    reason: reason,
   });
   const embed = new MessageEmbed()
    .setDescription(`${client.bot_emojis.success} | ${mentioned.displayName} has been banned.\n\n>>> Reason: \`${reason}\``)
    .setTimestamp()
    .setColor("GREEN")
    .setFooter({
     text: `Requested by ${message.author.username}`,
     iconURL: message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });
   await message.reply({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
