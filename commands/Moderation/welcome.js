const { MessageEmbed } = require("discord.js");
const sql = require("../../utilities/database");

module.exports = {
 name: "welcome",
 aliases: ["welcome-messages"],
 description: "Set up welcome messages for guild",
 category: "Moderation",
 usage: "welcome [channel]",
 run: async (client, message, args) => {
  try {
   if (!message.member.permissions.has("MANAGE_CHANNELS")) {
    return client.createError(message, `${client.bot_emojis.error} | You don't have permissions to manage welcome channels! You need \`MANAGE_CHANNELS\` permission!`);
   }
   if (args[0]) {
    const channel = message.mentions.channels.first();
    if (!channel) {
     return client.createError(message, `${client.bot_emojis.error} | You must mention channel to set-up\n\n**Usage:** \`${client.prefix} welcome [channel]\``);
    }
    const userperms = channel.permissionsFor(message.author);
    if (!userperms.has("MANAGE_CHANNEL")) {
     return client.createError(message, `${client.bot_emojis.error} | You can't set welcome messages to this channel - you don't have permissions to do that! You need \`MANAGE_CHANNEL\` perm!\``);
    }
    const sqlquery = "SELECT channelid AS res FROM welcome WHERE guildid = " + message.guild.id;
    sql.query(sqlquery, function (error, results, fields) {
     if (error) return console.log(error);
     if (results[0]) {
      const update = "UPDATE welcome SET channelid = " + channel.id + " WHERE guildid = " + message.guild.id;
      sql.query(update, function (error, results, fields) {
       if (error) console.log(error);
       const success = new MessageEmbed() // Prettier
        .setDescription(`${client.bot_emojis.sparkles} | Success! Updated welcome channel, new welcome channel is ${channel} (ID: \`${channel.id}\`)`)
        .setColor("GREEN");
       message.reply({ embeds: [success] });
      });
     } else {
      const insert = "INSERT INTO `welcome` (`guildid`, `channelid`) VALUES (" + message.guild.id + "," + channel.id + ");";
      sql.query(insert, function (error, results, fields) {
       if (error) console.log(error);
       const success = new MessageEmbed() // Prettier
        .setDescription(`${client.bot_emojis.sparkles} | Success! New channel for welcome is ${channel} (ID: \`${channel.id}\`)`)
        .setColor("GREEN");
       message.reply({ embeds: [success] });
      });
     }
    });
   } else {
    const sqlquery = "SELECT channelid AS res FROM `welcome` WHERE guildid = " + message.guild.id;
    sql.query(sqlquery, function (error, results, fields) {
     if (error) return console.log(error);
     if (results[0]) {
      const embed = new MessageEmbed() // Prettier
       .setColor("GREEN")
       .setDescription(`${client.bot_emojis.success} | Your current welcome channel is: <#${results[0].res}>. You can channge channel by using \`${client.prefix} welcome [channel]\`!`);
      return message.reply({ embeds: [embed] });
     } else {
      const embed = new MessageEmbed() // Prettier
       .setColor("GREEN")
       .setDescription(`${client.bot_emojis.error} | You haven't configured welcome channel on this server yet, run \`${prefix} welcome [channel]\` to configure welcome messages!`);
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
