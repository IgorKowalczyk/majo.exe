const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "add-role",
 aliases: ["role-add", "addrole", "roleadd"],
 description: "Add role to member",
 category: "Moderation",
 usage: "add-role <member> <role> [reason]",
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
   let reason = `${args.join(" ") || "No reason provided!"} | Role added by: ${message.author.tag}`;
   if (reason.length > 1024) reason = reason.slice(0, 1021) + "...";
   if (!mention) {
    return client.createError(message, `${client.bot_emojis.error} | You must mention member to add role!\n\n**Usage:** \`${client.prefix} add-role <member> <role> [reason]\``);
   }
   if (!role) {
    return client.createError(message, `${client.bot_emojis.error} | You must specify role to add!\n\n**Usage:** \`${client.prefix} add-role <member> <role> [reason]\``);
   }
   if (mention.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) {
    return client.createError(message, `${client.bot_emojis.error} | You cant add role to this user!`);
   }
   await mention.roles.add(role, {
    reason: reason,
   });
   const embed = new MessageEmbed()
    .setColor("GREEN")
    .setTitle("Role added!")
    .setDescription(`Successfully added ${role} role to ${mention.user}!`)
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
