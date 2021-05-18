const Discord = require("discord.js");
const MySQL = require('mysql');

module.exports = {
 name: "log-set",
 aliases: [],
 description: "Set log channel for the guild",
 category: "Moderation",
 usage: "log-set <channel>",
 run: async (client, message, args) => {
  try {
   const sql = MySQL.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    charset: 'utf8mb4',
    port: "3306"
   });
   const channel = message.mentions.channels.first();
   const sqlquery = 'SELECT channelid AS res FROM logs WHERE guildid = ' + message.guild.id;
   sql.query(sqlquery, function (error, results, fields) {
    if(error) console.log(error);
    console.log("test" + results[0].res);
    if(!results.res || results.res.lenght == 0) {
     const sqlquery3 = "INSERT INTO `logs` VALUES (" + message.guild.id + "," + channel + ")"
     sql.query(sqlquery3, function (error, results, fields) {
      console.log("success, added");
     })
    } else {
    const sqlquery2 = "UPDATE logs SET channelid = " + channel + "WHERE guildid = " + message.guild.id;
    sql.query(sqlquery2, function (error, results, fields) {
    console.log("success, updated");
    })
    }
   })
  } catch (err) {
   console.log(err);
   message.lineReply({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
 