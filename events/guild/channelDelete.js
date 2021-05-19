const Discord = require('discord.js');
const config = require("../../config");
const MySQL = require('mysql');

module.exports = async (client, channel) => {
 try {
  const sql = MySQL.createPool({
   host: process.env.MYSQL_HOST,
   user: process.env.MYSQL_USER,
   password: process.env.MYSQL_PASSWORD,
   database: process.env.MYSQL_DATABASE,
   charset: 'utf8mb4',
   port: "3306"
  });
  const sqlquery = 'SELECT channelid AS res FROM logs WHERE guildid = ' + channel.guild.id;
  sql.query(sqlquery, function (error, results, fields) {
   if(error) console.log(error);
   if (!results || results.length == 0) {
    sql.end();
    return;
   }
   const logsetup = results[0].res;
   sql.end();
   (async () => {
   const log = await channel.guild.channels.cache.find(c => c.id == logsetup && c.type == "text");
   if (!channel.guild) return;
   if (!channel.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
   if(!log) return;
   if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
   if (channel.type === "text") {
    var type = "Text";
   } else if (channel.type === "voice") {
    var type = "Voice";
   } else if (channel.type === "category") {
    var type = "Category";
   } else if (channel.type === "news") {
    var type = "News Feed";
   } else if (channel.type === "store") {
    var type = "Store channel";
   } else if (!channel.type) {
    var type = "?";
   }
   channel.guild.fetchAuditLogs().then(logs => {
    var userid = logs.entries.first().executor.id;
    var uavatar = logs.entries.first().executor.avatarURL();
    const event = await new Discord.MessageEmbed()
     .setTitle("Channel Deleted")
     .setThumbnail(uavatar)
     .addField("Channel name", `${channel.name} (ID: ${channel.id})`)
     .addField("Channel type", `${type}`)
     .addField("Created at", `${channel.createdAt}`)
     .addField("Created by", `<@${userid}> (ID: ${userid})`)
     .setColor("RANDOM")
     .setTimestamp()
     .setFooter(channel.guild.name, channel.guild.iconURL());
    await log.send(event);
   })()
   });
  })
 } catch (err) {
  console.log(err)
 }
}
