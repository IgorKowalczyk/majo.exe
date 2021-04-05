const Discord = require('discord.js');
const config = require("../../config");

module.exports = async (client, guild, user) => {
 try {
  if (!guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
  const log = guild.channels.cache.find(log => log.name === "log")
  if(!log) return;
  if(log.type !== "text") return;
  if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
  if(log) {
   guild.fetchAuditLogs().then(logs => {
    const userid = logs.entries.first().executor.id;
    const uavatar = logs.entries.first().executor.avatarURL();
    if (userid === client.user.id) return;
    const embed = new Discord.MessageEmbed()
     .setTitle("User Banned")
     .setThumbnail(uavatar)
     .setColor("RANDOM")
     .addField("Banned User", `${user.username} [Ping: <@${user.id}>], (ID: ${user.id})`)
     .addField("Banned by", `<@${userid}> (ID: ${userid})`)
     .setTimestamp()
     .setFooter(guild.name, guild.iconURL())
    log.send(embed);
   });
  }
 } catch (err) {
  console.log(err);
 }
}
