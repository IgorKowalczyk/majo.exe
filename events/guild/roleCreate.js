const Discord = require("discord.js");
const config = require("../../config");

module.exports = async (client, role) => {
 try {
  /*
 if (!role.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
 const log = role.guild.channels.cache.find(channel => channel.name.includes('log'));
 if (!logChannel) return;
 role.guild.fetchAuditLogs().then(logs => {
  var userID = logs.entries.first().executor.id;
  var userAvatar = logs.entries.first().executor.avatarURL();
  let roleCreate = new Discord.MessageEmbed() // Prettier
   .setTitle("**ROLE CREATE**")
   .setThumbnail(userAvatar)
   .setDescription(`**\n**:white_check_mark: Successfully \`\`CREATE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
   .setColor("RANDOM")
   .setTimestamp()
   .setFooter(role.guild.name, role.guild.iconURL());
   log.send(roleCreate);
 });
  */
 } catch (err) {
  console.log(err);
 }
};
