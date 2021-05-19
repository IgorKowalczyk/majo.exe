const Discord = require("discord.js");
const MySQL = require('mysql');

module.exports = {
 name: "set-leave",
 aliases: ["leave-set", "lv-set", "set-leave-channel"],
 description: "Set leave channel for the guild",
 category: "Moderation",
 usage: "set-leave <channel>",
 run: async (client, message, args) => {
  try {
   const channel = message.mentions.channels.first();
   if(!channel) {
    return message.lineReply({embed: {
     color: 16734039,
     description: "❌ | You must enter a channel!"
    }})
   }
   const sql = MySQL.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    charset: 'utf8mb4',
    port: "3306"
   });
   const sqlquery = 'SELECT channelid AS res FROM \`leave\` WHERE guildid = ' + message.guild.id;
   sql.query(sqlquery, function (error, results, fields) {
    if(error) return console.log(error);
    if(results[0]) {
     const update = "UPDATE leave SET channelid = " + channel.id + " WHERE guildid = " + message.guild.id;
     sql.query(update, function (error, results, fields) {
      if(error) console.log(error);
      message.lineReply({embed: {
       color: 4779354,
       description: `✨ | Success! Updated leave channel, new leave channel is ${channel} (ID: ${channel.id})`,
      }})
      // console.log("Updated channel id " + results[0].res)
      })
    } else {
     const insert = "INSERT INTO `leave` (`guildid`, `channelid`) VALUES (" + message.guild.id + "," + channel.id + ");";
     sql.query(insert, function (error, results, fields) {
      if(error) console.log(error);
      message.lineReply({embed: {
       color: 4779354,
       description: `✨ | Success! New channel for leave messages is ${channel} (ID: ${channel.id})`,
      }})
     // console.log("Added channel id: " + results[0].res)
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
 