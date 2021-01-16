const Discord = require('discord.js');
const config = require("../../config");

module.exports = async (client, oldMember, newMember) => {
/*
try {
 var logChannel = oldMember.guild.channels.cache.find(c => c.name === "log");
 if (!logChannel) return;
 oldMember.guild.fetchAuditLogs().then(logs => {
  var userID = logs.entries.first().executor.id;
  var userAvatar = logs.entries.first().executor.avatarURL();
  var userTag = logs.entries.first().executor.tag;
  if (oldMember.nickname !== newMember.nickname) {
   if (oldMember.nickname === null) {
    var oldNM = "``???? ??????``";
   } else {
    var oldNM = oldMember.nickname;
   }
   if (newMember.nickname === null) {
    var newNM = "``???? ??????``";
   } else {
    var newNM = newMember.nickname;
   }
   let updateNickname = new Discord.MessageEmbed()
    .setTitle("**UPDATE MEMBER NICKNAME**")
    .setThumbnail(userAvatar)
    .setColor("RANDOM")
    .setDescription(`**\n**:spy: Successfully \`\`CHANGE\`\` Member Nickname.\n\n**User:** ${oldMember} (ID: ${oldMember.id})\n**Old Nickname:** ${oldNM}\n**New Nickname:** ${newNM}\n**By:** <@${userID}> (ID: ${userID})`)
    .setTimestamp()
    .setFooter(oldMember.guild.name, oldMember.guild.iconURL());
   logChannel.send(updateNickname);
  }
  if (oldMember.roles.cache.size < newMember.roles.cache.size) {
   let role = newMember.roles.cache.filter(r => !oldMember.roles.cache.has(r.id)).first();
   let roleAdded = new Discord.MessageEmbed()
    .setTitle("**ADDED ROLE TO MEMBER**")
    .setThumbnail(oldMember.guild.iconURL())
    .setColor("RANDOM")
    .setDescription(`**\n**:white_check_mark: Successfully \`\`ADDED\`\` Role to **${oldMember.user.username}**\n\n**User:** <@${oldMember.id}> (ID: ${oldMember.user.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
    .setTimestamp()
    .setFooter(userTag, userAvatar);
   logChannel.send(roleAdded);
   }
   if (oldMember.roles.cache.size > newMember.roles.cache.size) {
    let role = oldMember.roles.cache.filter(r => !newMember.roles.cache.has(r.id)).first();
    let roleRemoved = new Discord.MessageEmbed()
     .setTitle("**REMOVED ROLE FROM MEMBER**")
     .setThumbnail(oldMember.guild.iconURL())
     .setColor("RANDOM")
   .setDescription(`**\n**:negative_squared_cross_mark: Successfully \`\`REMOVED\`\` Role from **${oldMember.user.username}**\n\n**User:** <@${oldMember.user.id}> (ID: ${oldMember.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
    .setTimestamp()
    .setFooter(userTag, userAvatar);
   logChannel.send(roleRemoved);
  }
 });
 if (oldMember.guild.owner.user.id !== newMember.guild.owner.user.id) {
  let newOwner = new Discord.MessageEmbed()
   .setTitle("**UPDATE GUILD OWNER**")
   .setThumbnail(oldMember.guild.iconURL())
   .setColor("RANDOM")
   .setDescription(`**\n**:white_check_mark: Successfully \`\`TRANSFER\`\` The OwnerShip.\n\n**Old Owner:** <@${oldMember.user.id}> (ID: ${oldMember.user.id})\n**New Owner:** <@${newMember.user.id}> (ID: ${newMember.user.id})`)
   .setTimestamp()
   .setFooter(oldMember.guild.name, oldMember.guild.iconURL());
  logChannel.send(newOwner);
 } 
} catch (err) {
 let embed = new Discord.MessageEmbed()
  .setColor("#FF0000")
  .setTitle("Error!")
  .setDescription("**Error Code:** *" + err + "*")
  .setTimestamp();
 console.log(err);
}
*/
}
