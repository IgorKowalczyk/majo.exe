const Discord = require("discord.js");
const MySQL = require('mysql');
const config = require("../../config");
const prefix = config.prefix;

module.exports = {
 name: "check-log",
 aliases: ["log-check", "l-check", "check-log-channel"],
 description: "check log channel for the guild",
 category: "Moderation",
 usage: "check-log <channel>",
 run: async (client, message, args) => {
  try {
   const sql = MySQL.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    charset: 'utf8mb4',
    port: "3306"
   });
   sql.connect((err) => {
    if (err) {
     console.error('Impossible to connect to MySQL server. Code: ' + err.code);
     process.exit(99);
    } else {
     console.log('[SQL] Connected to the MySQL server! Connection ID: ' + sql.threadId);
    }
   });
   const sqlquery = 'SELECT channelid AS res FROM logs WHERE guildid = ' + message.guild.id;
   sql.query(sqlquery, function (error, results, fields) {
    if(error) return console.log(error);
    if(results[0]) {
     message.lineReply({embed: {
      color: 4779354,
      description: `✨ | Your current logs channel is: <#${results[0].res}>. You can channge channel by using \`${prefix} set-log <channel>\`!`
     }})
    } else {
     message.lineReply({embed: {
      color: 4779354,
      description: `❌ | You haven't configured logs on this server yet, run \`${prefix} set-log <channel>\` to configure logging!`,
     }})
    }
   })
  } catch(err) {
   message.lineReply({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
 