const Discord = require("discord.js");
const sql = require("../../utilities/database");

module.exports = async (client, guild, oldLevel, newLevel) => {
 try {
  const sqlquery = "SELECT channelid AS res FROM logs WHERE guildid = " + guild.id;
  sql.query(sqlquery, function (error, results, fields) {
   if (error) console.log(error);
   if (!results || results.length == 0) {
    return;
   }
   (async () => {
    const logsetup = await results[0].res;
    const log = await guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
    if (!guild) return;
    if (!guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
    if (!log) return;
    const embed = await new Discord.MessageEmbed() // Prettier
     .setTitle("<a:boost:854794292190773308> Server boost level decreases :sob:")
     .setThumbnail(guild.iconURL())
     .setColor("RANDOM")
     .setDescription("<a:boost:854794292190773308> " + guild.name + " now have" + newLevel + "boost level (Previous level: " + oldLevel + ")")
     .setTimestamp()
     .setFooter(guild.name, guild.iconURL());
    log.send(embed);
   })();
  });
 } catch (err) {
  console.log(err);
 }
};
