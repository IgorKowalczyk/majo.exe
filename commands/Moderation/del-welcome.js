const Discord = require("discord.js");
const sql = require("../../utilities/database");
const config = require("../../config");
const prefix = process.env.PREFIX;

module.exports = {
 name: "del-welcome",
 aliases: ["welcome-gelete", "w-remove", "delete-welcome-channel", "rem-welcome"],
 description: "Delete welcome channel for the guild",
 category: "Moderation",
 usage: "del-welcome",
 run: async (client, message, args) => {
  try {
   if (!message.member.hasPermission("MANAGE_CHANNELS")) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | You don't have permissions to delete welcome channel! You need \`MANAGE_CHANNELS\` permission!`,
     },
    });
   }
   const sqlquery = "SELECT channelid AS res FROM welcome WHERE guildid = " + message.guild.id;
   sql.query(sqlquery, function (error, results, fields) {
    if (error) return console.log(error);
    if (results[0]) {
     const deletequery = "DELETE FROM welcome WHERE guildid = " + message.guild.id;
     sql.query(deletequery, function (error, results, fields) {
      if (error) return console.log(error);
      message.lineReply({
       embed: {
        color: 4779354,
        description: `${client.bot_emojis.success} | You successfully deleted welcome channel. You can always set new channel using \`${prefix} set-welcome <channel>\`!`,
       },
      });
     });
    } else {
     message.lineReply({
      embed: {
       color: 16734039,
       description: `${client.bot_emojis.error} | You haven't configured welcome system on this server yet so you can't delete the channel, run \`${prefix} set-welcome <channel>\` to configure welcome!`,
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
