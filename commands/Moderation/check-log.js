const Discord = require("discord.js")
const MySQL = require("mysql")
const config = require("../../config")
const prefix = config.prefix

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
      description: "❌ | You don't have premissions to check log channel! You need `MANAGE_CHANNELS` premission!",
     },
    })
   }
   const sql = MySQL.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    charset: "utf8mb4",
    port: "3306",
   })
   const sqlquery = "SELECT channelid AS res FROM logs WHERE guildid = " + message.guild.id
   sql.query(sqlquery, function (error, results, fields) {
    if (error) return console.log(error)
    if (results[0]) {
     message.lineReply({
      embed: {
       color: 4779354,
       description: `✨ | Your current logs channel is: <#${results[0].res}>. You can channge channel by using \`${prefix} set-log <channel>\`!`,
      },
     })
    } else {
     message.lineReply({
      embed: {
       color: 16734039,
       description: `❌ | You haven't configured logs on this server yet, run \`${prefix} set-log <channel>\` to configure logging!`,
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
