const Discord = require("discord.js")
const sql = require("../../utilities/database")
const config = require("../../config")
const prefix = config.prefix

module.exports = {
 name: "check-leave",
 aliases: ["leave-check", "lv-check", "check-leave-channel"],
 description: "Check leave channel for the guild",
 category: "Moderation",
 usage: "check-leave",
 run: async (client, message, args) => {
  try {
   if (!message.member.hasPermission("MANAGE_CHANNELS")) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: "❌ | You don't have premissions to check leave channel! You need `MANAGE_CHANNELS` premission!",
     },
    })
   }
   const sqlquery = "SELECT channelid AS res FROM `leave` WHERE guildid = " + message.guild.id
   sql.query(sqlquery, function (error, results, fields) {
    if (error) return console.log(error)
    if (results[0]) {
     message.lineReply({
      embed: {
       color: 4779354,
       description: `✨ | Your current leave channel is: <#${results[0].res}>. You can channge channel by using \`${prefix} set-leave <channel>\`!`,
      },
     })
    } else {
     message.lineReply({
      embed: {
       color: 16734039,
       description: `❌ | You haven't configured leave on this server yet, run \`${prefix} set-leave <channel>\` to configure leave messages!`,
      },
     })
    }
   })
  } catch (err) {
   message.lineReply({
    embed: {
     color: 16734039,
     description: "Something went wrong... :cry:",
    },
   })
  }
 },
}
