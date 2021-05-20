const Discord = require('discord.js');
const config = require("../../config");
const MySQL = require('mysql');

module.exports = async (client, guild, user) => {
 try {
  const sql = MySQL.createPool({
   host: process.env.MYSQL_HOST,
   user: process.env.MYSQL_USER,
   password: process.env.MYSQL_PASSWORD,
   database: process.env.MYSQL_DATABASE,
   charset: 'utf8mb4',
   port: "3306"
  });
  const sqlquery = 'SELECT channelid AS res FROM logs WHERE guildid = ' + guild.id;
  sql.query(sqlquery, function (error, results, fields) {
   if(error) console.log(error);
   if (!results || results.length == 0) {
    sql.end();
    return;
   }
   const logsetup = results[0].res;
   sql.end();
   (async () => {
    const log = await guild.channels.cache.find(c => c.id == logsetup && c.type == "text");
    if (!guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
    if(!log) return;
    if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
    guild.fetchAuditLogs().then(logs => {
     const userid = logs.entries.first().executor.id;
     const uavatar = logs.entries.first().executor.avatarURL();
     const embed = new Discord.MessageEmbed()
      .setTitle("User Unbanned")
      .setThumbnail(uavatar)
      .setColor("RANDOM")
      .addField("Unbanned User", `${user.username} [Ping: <@${user.id}>], (ID: ${user.id})`)
      .addField("Unbanned by", `<@${userid}> (ID: ${userid})`)
      .setTimestamp()
      .setFooter(guild.name, guild.iconURL());
     log.send(embed);
    });
   })();
  })
 } catch (err) {
  console.log(err);
 }
}
