const Discord = require('discord.js');

module.exports = async (voiceOld, voiceNew) => {
try {
 var logChannel = voiceNew.guild.channels.cache.find(c => c.name === 'log');  
 if (!logChannel) return;
 voiceOld.guild.fetchAuditLogs().then(logs => {
  var userID = logs.entries.first().executor.id;
  var userTag = logs.entries.first().executor.tag;
  var userAvatar = logs.entries.first().executor.avatarURL();
  if (voiceOld.serverMute === false && voiceNew.serverMute === true) {
   let serverMutev = new Discord.MessageEmbed()
    .setTitle("**VOICE MUTE**")
    .setThumbnail(voiceOld.user.avatarURL())
    .setColor("RANDOM")
    .setDescription(`**User:** <@${voiceOld.user.id}> (ID: ${voiceOld.user.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
    .setTimestamp()
    .setFooter(userTag, userAvatar);
   logChannel.send(serverMutev);
  }
  if (voiceOld.serverMute === true && voiceNew.serverMute === false) {
   let serverUnmutev = new Discord.MessageEmbed()
    .setTitle("**VOICE UNMUTE**")
    .setThumbnail(voiceOld.user.avatarURL())
    .setColor("RANDOM")
    .setDescription(`**User:** <@${voiceOld.user.id}> (ID: ${voiceOld.user.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
    .setTimestamp()
   .setFooter(userTag, userAvatar);
   logChannel.send(serverUnmutev);
  }
  if (voiceOld.serverDeaf === false && voiceNew.serverDeaf === true) {
   let serverDeafv = new Discord.MessageEmbed()
    .setTitle("**VOICE DEAFEN**")
    .setThumbnail(voiceOld.user.avatarURL())
    .setColor("RANDOM")
    .setDescription(`**User:** <@${voiceOld.user.id}> (ID: ${voiceOld.user.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID:  ${voiceOld.voiceChannel.id})`)
    .setTimestamp()
    .setFooter(userTag, userAvatar);
   logChannel.send(serverDeafv);
  }
  if (voiceOld.serverDeaf === true && voiceNew.serverDeaf === false) {
   let serverUndeafv = new Discord.MessageEmbed()
    .setTitle("**VOICE UNDEAFEN**")
    .setThumbnail(voiceOld.user.avatarURL())
    .setColor("RANDOM")
    .setDescription(`**User:** <@${voiceOld.user.id}> (ID: ${voiceOld.user.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
    .setTimestamp()
    .setFooter(userTag, userAvatar);
   logChannel.send(serverUndeafv);
  }
 });

 if (voiceOld.voiceChannelID !== voiceNew.voiceChannelID && !voiceOld.voiceChannel) {
  let voiceJoin = new Discord.MessageEmbed()
   .setTitle("**JOIN VOICE ROOM**")
   .setColor("RANDOM")
   .setThumbnail(voiceOld.user.avatarURL())
   .setDescription(`**\n**:arrow_lower_right: Successfully \`\`JOIN\`\` To Voice Channel.\n\n**Channel:** \`\`${voiceNew.voiceChannel.name}\`\` (ID: ${voiceNew.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`)
   .setTimestamp()
   .setFooter(voiceOld.user.tag, voiceOld.user.avatarURL());
  logChannel.send(voiceJoin);
 }
 if (voiceOld.voiceChannelID !== voiceNew.voiceChannelID && !voiceNew.voiceChannel) {
  let voiceLeave = new Discord.MessageEmbed()
   .setTitle("**LEAVE VOICE ROOM**")
   .setColor("RANDOM")
   .setThumbnail(voiceOld.user.avatarURL())
   .setDescription(`**\n**:arrow_upper_left: Successfully \`\`LEAVE\`\` From Voice Channel.\n\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`)
   .setTimestamp()
   .setFooter(voiceOld.user.tag, voiceOld.user.avatarURL());
  logChannel.send(voiceLeave);
 }

 if (voiceOld.voiceChannelID !== voiceNew.voiceChannelID && voiceNew.voiceChannel && voiceOld.voiceChannel != null) {
  let voiceLeave = new Discord.MessageEmbed()
   .setTitle("**CHANGED VOICE ROOM**")
   .setColor("RANDOM")
   .setThumbnail(voiceOld.user.avatarURL())
   .setDescription(`**\n**:repeat: Successfully \`\`CHANGED\`\` The Voice Channel.\n\n**From:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannelID})\n**To:** \`\`${voiceNew.voiceChannel.name}\`\` (ID: ${voiceNew.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`)
   .setTimestamp()
   .setFooter(voiceOld.user.tag, voiceOld.user.avatarURL());
  logChannel.send(voiceLeave);
 }
} catch (err) {
 let embed = new Discord.MessageEmbed()
  .setColor("#FF0000")
  .setTitle("Error!")
  .setDescription("**Error Code:** *" + err + "*")
  .setTimestamp();
 console.log(err);
}
}
