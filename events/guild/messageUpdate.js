const Discord = require('discord.js');
const config = require("../../config");
const MySQL = require('mysql');

module.exports = async (client, oldMessage, newMessage) => {
 const sql = MySQL.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  charset: 'utf8mb4',
  port: "3306"
 });
 try {
  const sqlquery = 'SELECT channelid AS res FROM logs WHERE guildid = ' + oldMessage.guild.id;
  sql.query(sqlquery, function (error, results, fields) {
   if(error) console.log(error);
   if (!results || results.length == 0) {
    sql.end();
    return;
   }
   const logsetup = results[0].res;
   sql.end();
   const log = oldMessage.guild.channels.cache.find(c => c.id == logsetup && c.type == "text");
   if (oldMessage.author.bot) return;
   if (!oldMessage.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
   if (!log) return;
   if (!newMessage.embeds) return console.log("yes");
   const event = new Discord.MessageEmbed()
    .setTitle(`Message Edited`)
    .setColor('RANDOM')
    .setThumbnail(oldMessage.author.avatarURL())
    .addField("Channel", `<#${oldMessage.channel.id}> (ID: ${oldMessage.channel.id})`)
    .addField("Message ID", `${oldMessage.id}`)
    .addField("Created at", `${oldMessage.createdAt}`)
    .addField("TTS", `${oldMessage.tts}`)
    .addField("Pinned", `${oldMessage.pinned}`)
    .addField("Send By", `<@${oldMessage.author.id}> (ID: ${oldMessage.author.id})`)
    .addField("Old Message", "\`\`\`" + `${oldMessage}` + "\`\`\`")
    .addField("New Message", "\`\`\`" + `${newMessage}` + "\`\`\`")
    .setTimestamp()
    .setFooter(oldMessage.guild.name, oldMessage.guild.iconURL())
   log.send(event);
  });
 } catch (err) {
  console.log(err);
 }
}
