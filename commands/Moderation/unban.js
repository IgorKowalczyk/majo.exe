const Discord = require("discord.js");

module.exports = {
 name: "unban",
 aliases: ["ub"],
 description: "Unbans a member from the server",
 category: "Moderation",
 usage: "unban <user> [reason]",
 run: async (client, message, args) => {
  try {
   if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
    return await message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | I don't have premission to unban members!`,
     },
    });
   }
   if (!message.member.hasPermission("BAN_MEMBERS")) {
    return await message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | You don't have premissions to unban members!`,
     },
    });
   }
   const id = args[0];
   const rgx = /^(?:<@!?)?(\d+)>?$/;
   if (!id) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | Please provide user id!`,
     },
    });
   }
   if (!rgx.test(id)) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | Please provide vaild user id!`,
     },
    });
   }
   const bannedUsers = await message.guild.fetchBans();
   const user = bannedUsers.get(id).user;
   if (!user) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | Unable to find user, please check the provided ID`,
     },
    });
   }
   let reason = args.slice(1).join(" ");
   if (!reason) reason = "`None`";
   if (reason.length > 1024) reason = reason.slice(0, 1021) + "...";
   await message.guild.members.unban(user, reason);
   const embed = new MessageEmbed()
    .setTitle("Unbanned Member")
    .setDescription(`${user.tag} was successfully unbanned.`)
    .addField("Unnbaned by", message.member, true)
    .addField("Member", user.tag, true)
    .addField("Reason", reason)
    .setFooter(
     message.member.displayName,
     message.author.displayAvatarURL({
      dynamic: true,
     })
    )
    .setTimestamp()
    .setColor(message.guild.me.displayHexColor);
   message.lineReply(embed);
  } catch (err) {
   message.lineReply({
    embed: {
     color: 16734039,
     description: `Something went wrong... ${client.bot_emojis.sadness}`,
    },
   });
  }
 },
};
