const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "unban",
 aliases: ["ub"],
 description: "Unbans a member from the server",
 category: "Moderation",
 usage: "unban <id> [reason]",
 run: async (client, message, args) => {
  try {
   if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
    return client.createError(message, `${client.bot_emojis.error} | I don't have premission to ban members!`);
   }
   if (!message.member.permissions.has("BAN_MEMBERS")) {
    return client.createError(message, `${client.bot_emojis.error} | You don't have premission to ban members!`);
   }
   const id = args[0];
   const rgx = /^(?:<@!?)?(\d+)>?$/;
   if (!id) {
    return client.createError(message, `${client.bot_emojis.error} | You have to provide user ID!\n\n**Usage:** \`${client.prefix} unban <ID> [reason]\``);
   }
   if (!rgx.test(id)) {
    return client.createError(message, `${client.bot_emojis.error} | You have to provide vaild user ID\n\n**Usage:** \`${client.prefix} unban <ID> [reason]\``);
   }
   const bannedUsers = await message.guild.bans.fetch();
   const user = bannedUsers.get(id).user;
   if (!user) {
    return client.createError(message, `${client.bot_emojis.error} | Unable to find user, please check ID\n\n**Usage:** \`${client.prefix} unban <ID> [reason]\``);
   }
   let reason = `${args.slice(1).join(" ") || "No reason provided!"} | Unbanned by: ${message.author.tag}`;
   if (reason.length > 1024) reason = reason.slice(0, 1021) + "...";
   await message.guild.members.unban(user, reason);
   const embed = new MessageEmbed()
    .setDescription(`${client.bot_emojis.success} | \`${user.tag}\` has been unbanned.\n\n>>> Reason: \`${reason}\``)
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

   message.reply({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
