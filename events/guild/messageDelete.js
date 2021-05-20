const Discord = require('discord.js');
const config = require("../../config");
const MySQL = require('mysql');

module.exports = async (client, message) => {
 try {
  const sql = MySQL.createPool({
   host: process.env.MYSQL_HOST,
   user: process.env.MYSQL_USER,
   password: process.env.MYSQL_PASSWORD,
   database: process.env.MYSQL_DATABASE,
   charset: 'utf8mb4',
   port: "3306"
  });
  const sqlquery = 'SELECT channelid AS res FROM logs WHERE guildid = ' + message.guild.id;
  sql.query(sqlquery, function (error, results, fields) {
   if(error) console.log(error);
   if (!results || results.length == 0) {
    sql.end();
    return;
   }
   const logsetup = results[0].res;
   sql.end();
   (async () => {
   const log = await message.guild.channels.cache.find(c => c.id == logsetup && c.type == "text");
   if(message.author.bot) return;
   if(message.channel.type === 'dm') return;
   if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
   if(!log) return;
   if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
   const final = message.toString().substr(0, 1000).replaceAll("`", "'"); // Limit characters
   const event = await new Discord.MessageEmbed()
    .setTitle(`Message Deleted`)
    .setColor('RANDOM')
    .setThumbnail(message.author.avatarURL())
    .addField("Channel", `<#${message.channel.id}> (ID: ${message.channel.id})`)
    .addField("Message ID", `${message.id}`)
    .addField("Created at", `${message.createdAt}`)
    .addField("TTS", `${message.tts}`)
    .addField("Pinned", `${message.pinned}`)
    .addField("Send By", `<@${message.author.id}> (ID: ${message.author.id})`)
    .addField("Message", "\`\`\`" + `${final}` + "\`\`\`")
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL())
   await log.send(event)
   })()
  })
 } catch (err) {
  console.log(err);
 }
}
