const Discord = require("discord.js");
const sql = require("../../utilities/database");
const config = require("../../config");
const prefix = config.prefix;

module.exports = {
 name: "del-leave",
 aliases: ["leave-gelete", "lv-remove", "delete-leave-channel", "rem-leave"],
 description: "Delete leave channel for the guild",
 category: "Moderation",
 usage: "del-leave",
 run: async (client, message, args) => {
  try {
   if (!message.member.hasPermission("MANAGE_CHANNELS")) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: "❌ | You don't have premissions to delete leave channel! You need `MANAGE_CHANNELS` premission!",
     },
    });
   }
   const sqlquery = "SELECT channelid AS res FROM `leave` WHERE guildid = " + message.guild.id;
   sql.query(sqlquery, function (error, results, fields) {
    if (error) return console.log(error);
    if (results[0]) {
     const deletequery = "DELETE FROM leave WHERE guildid = " + message.guild.id;
     sql.query(deletequery, function (error, results, fields) {
      if (error) return console.log(error);
      message.lineReply({
       embed: {
        color: 4779354,
        description: `✨ | You successfully deleted leave channel. You can always set new channel using \`${prefix} set-leave <channel>\`!`,
       },
      });
     });
    } else {
     message.lineReply({
      embed: {
       color: 16734039,
       description: `❌ | You haven't configured leave system on this server yet so you can't delete the channel, run \`${prefix} set-leave <channel>\` to configure leave!`,
      },
     });
    }
   });
  } catch (err) {
   message.lineReply({
    embed: {
     color: 16734039,
     description: "Something went wrong... :cry:",
    },
   });
  }
 },
};
