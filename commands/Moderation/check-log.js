const Discord = require("discord.js");
const config = require("../../config");
const prefix = process.env.PREFIX;
const sql = require("../../utilities/database");

module.exports = {
 name: "check-log",
 aliases: ["log-check", "l-check", "check-log-channel"],
 description: "check log channel for the guild",
 category: "Moderation",
 usage: "check-log",
 run: async (client, message, args) => {
  try {
   if (!message.member.hasPermission("MANAGE_CHANNELS")) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | You don't have permissions to check log channel! You need \`MANAGE_CHANNELS\` permission!`,
     },
    });
   }
   const sqlquery = "SELECT channelid AS res FROM logs WHERE guildid = " + message.guild.id;
   sql.query(sqlquery, function (error, results, fields) {
    if (error) return console.log(error);
    if (results[0]) {
     message.lineReply({
      embed: {
       color: 4779354,
       description: `${client.bot_emojis.success} | Your current logs channel is: <#${results[0].res}>. You can channge channel by using \`${prefix} set-log <channel>\`!`,
      },
     });
    } else {
     message.lineReply({
      embed: {
       color: 16734039,
       description: `${client.bot_emojis.error} | You haven't configured logs on this server yet, run \`${prefix} set-log <channel>\` to configure logging!`,
      },
     });
    }
   });
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
