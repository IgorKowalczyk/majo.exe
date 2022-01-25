const { MessageEmbed } = require("discord.js");
const sql = require("../../../utilities/database");

module.exports = {
 name: "leave",
 aliases: ["leave-messages"],
 description: "Set up welcome messages for guild",
 category: "Setup",
 usage: "leave [channel]",
 run: async (client, message, args) => {
  try {
   if (!message.member.permissions.has("MANAGE_GUILD")) {
    return client.createError(message, `${client.bot_emojis.error} | You don't have permissions to manage leave channels! You need \`MANAGE_GUILD\` permission!`);
   }
   if (args[0]) {
    const channel = message.mentions.channels.first();
    if (!channel) {
     return client.createError(message, `${client.bot_emojis.error} | You must mention channel to set-up\n\n**Usage:** \`${client.prefix} leave [channel]\``);
    }
    const user_perms = channel.permissionsFor(message.author);
    const bot_perms = channel.permissionsFor(message.guild.me);
    if (!user_perms.has("VIEW_CHANNEL") || !user_perms.has("SEND_MESSAGES") || !user_perms.has("MANAGE_GUILD")) {
     return client.createError(message, `${client.bot_emojis.error} | You can't set leave messages to this channel! You need \`MANAGE_GUILD, VIEW_CHANNEL, SEND_MESSAGES\` permissions!\``);
    }
    if (!bot_perms.has("VIEW_CHANNEL") || !bot_perms.has("SEND_MESSAGES") || !bot_perms.has("MANAGE_GUILD")) {
     return client.createError(message, `${client.bot_emojis.error} | I can't set leave messages to this channel! I need \`MANAGE_GUILD, VIEW_CHANNEL, SEND_MESSAGES\` permissions!\``);
    }
    const sqlquery = "SELECT channelid AS res FROM `leave` WHERE guildid = " + message.guild.id;
    sql.query(sqlquery, function (error, results, fields) {
     if (error) return console.log(error);
     if (results[0]) {
      const update = "UPDATE `leave` SET channelid = " + channel.id + " WHERE guildid = " + message.guild.id;
      sql.query(update, function (error, results, fields) {
       if (error) console.log(error);
       const success = new MessageEmbed() // Prettier
        .setDescription(`${client.bot_emojis.sparkles} | Success! Updated leave channel, new leave channel is ${channel} (ID: \`${channel.id}\`)`)
        .setColor("GREEN");
       message.reply({ embeds: [success] });
      });
     } else {
      const insert = "INSERT INTO `leave` (`guildid`, `channelid`) VALUES (" + message.guild.id + "," + channel.id + ");";
      sql.query(insert, function (error, results, fields) {
       if (error) console.log(error);
       const success = new MessageEmbed() // Prettier
        .setDescription(`${client.bot_emojis.sparkles} | Success! New channel for leave is ${channel} (ID: \`${channel.id}\`)`)
        .setColor("GREEN");
       message.reply({ embeds: [success] });
      });
     }
    });
   } else {
    const sqlquery = "SELECT channelid AS res FROM `leave` WHERE guildid = " + message.guild.id;
    sql.query(sqlquery, function (error, results, fields) {
     if (error) return console.log(error);
     if (results[0]) {
      const embed = new MessageEmbed() // Prettier
       .setColor("GREEN")
       .setDescription(`${client.bot_emojis.success} | Your current leave channel is: <#${results[0].res}>. You can channge channel by using \`${client.prefix} leave [channel]\`!`);
      return message.reply({ embeds: [embed] });
     } else {
      const embed = new MessageEmbed() // Prettier
       .setColor("GREEN")
       .setDescription(`${client.bot_emojis.error} | You haven't configured leave channel on this server yet, run \`${prefix} leave [channel]\` to configure leave messages!`);
      return message.reply({ embeds: [embed] });
     }
    });
   }
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
