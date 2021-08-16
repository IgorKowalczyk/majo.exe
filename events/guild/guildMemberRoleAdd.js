const Discord = require("discord.js");
const config = require("../../config");
const sql = require("../../utilities/database");

module.exports = async (client, member, role) => {
 try {
  const sqlquery = "SELECT channelid AS res FROM logs WHERE guildid = " + member.guild.id;
  sql.query(sqlquery, function (error, results, fields) {
   if (error) console.log(error);
   if (!results || results.length == 0) {
    return;
   }
   (async () => {
    const logsetup = await results[0].res;
    const log = await member.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
    if (!member.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
    if (!log) return;
    if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
    const embed = await new Discord.MessageEmbed() // Prettier
     .setTitle("📝 User role added")
     .setThumbnail(member.user.avatarURL())
     .setColor("RANDOM")
     .addField("User", `${member.user.username} [Ping: <@${member.user.id}>], (ID: ${member.user.id})`)
     .addField("Role", `<@${role.id}> (ID: ${role.id})`)
     .setTimestamp()
     .setFooter(member.guild.name, member.guild.iconURL());
    log.send(embed);
   })();
  });
 } catch (err) {
  console.log(err);
 }
};
