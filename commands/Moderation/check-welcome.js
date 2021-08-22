const Discord = require("discord.js");
const sql = require("../../utilities/database");
const config = require("../../config");
const prefix = process.env.PREFIX;

module.exports = {
 name: "check-welcome",
 aliases: ["welcome-check", "w-check", "check-welcome-channel"],
 description: "Check welcome channel for the guild",
 category: "Moderation",
 usage: "check-welcome",
 run: async (client, message, args) => {
  try {
   if (!message.member.hasPermission("MANAGE_CHANNELS")) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | You don't have permissions to check welcome channel! You need \`MANAGE_CHANNELS\` permission!`,
     },
    });
   }
   const sqlquery = "SELECT channelid AS res FROM welcome WHERE guildid = " + message.guild.id;
   sql.query(sqlquery, function (error, results, fields) {
    if (error) return console.log(error);
    if (results[0]) {
     message.lineReply({
      embed: {
       color: 4779354,
       description: `${client.bot_emojis.success} | Your current welcome channel is: <#${results[0].res}>. You can channge channel by using \`${prefix} set-welcome <channel>\`!`,
      },
     });
    } else {
     message.lineReply({
      embed: {
       color: 16734039,
       description: `${client.bot_emojis.error} | You haven't configured welcome on this server yet, run \`${prefix} set-welcome <channel>\` to configure welcome messages!`,
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
