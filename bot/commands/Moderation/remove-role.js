const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "remove-role",
 aliases: ["role-remove", "removerole", "roleremove"],
 description: "Remove role from member",
 category: "Moderation",
 usage: "remove-role <member> <role> [reason]",
 run: async (client, message, args) => {
  try {
   const mention = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase());
   const role = message.mentions.roles.first();
   if (!message.guild.me.permissions.has("MANAGE_ROLES")) {
    return client.createError(message, `${client.bot_emojis.error} | I don't have premission to manage roles!`);
   }
   if (!message.member.permissions.has("MANAGE_ROLES")) {
    return client.createError(message, `${client.bot_emojis.error} | You don't have premission to manage roles!`);
   }
   let reason = `${args.join(" ") || "No reason provided!"} | Role removed by: ${message.author.tag}`;
   if (reason.length > 1024) reason = reason.slice(0, 1021) + "...";
   if (!mention) {
    return client.createError(message, `${client.bot_emojis.error} | You must mention member to remove role!\n\n**Usage:** \`${client.prefix} remove-role <member> <role> [reason]\``);
   }
   if (!role) {
    return client.createError(message, `${client.bot_emojis.error} | You must specify role to remove!\n\n**Usage:** \`${client.prefix} remove-role <member> <role> [reason]\``);
   }
   if (mention.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) {
    return client.createError(message, `${client.bot_emojis.error} | You cant remove role from this user!`);
   }
   await mention.roles.remove(role, {
    reason: reason,
   });
   const embed = new MessageEmbed()
    .setColor("GREEN")
    .setTitle("Role removed!")
    .setDescription(`Successfully removed ${role} role from ${mention.user}!`)
    .setFooter({
     text: `Requested by ${message.author.username}`,
     iconURL: message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    })
    .setThumbnail(mention.user.displayAvatarURL());
   message.reply({ embeds: [embed] });
  } catch (err) {
   // console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
