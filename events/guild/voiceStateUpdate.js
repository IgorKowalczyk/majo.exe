const Discord = require('discord.js');
const config = require("../../config");

module.exports = async (client, oldState, newState, guild) => {
/*
try {
 var logChannel = oldState.guild.channels.cache.find(c => c.name === 'log');  
 if (!logChannel) return;
 oldState.guild.fetchAuditLogs().then(logs => {
  var userID = logs.entries.first().executor.id;
  var userTag = logs.entries.first().executor.tag;
  var userAvatar = logs.entries.first().executor.avatarURL();
  if (oldState.serverMute === false && newState.serverMute === true) {
   let serverMutev = new Discord.MessageEmbed()
    .setTitle("**VOICE MUTE**")
    .setThumbnail(oldState.user.avatarURL())
    .setColor("RANDOM")
    .setDescription(`**User:** <@${oldState.user.id}> (ID: ${oldState.user.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${oldState.voiceChannel.name}\`\` (ID: ${oldState.voiceChannel.id})`)
    .setTimestamp()
    .setFooter(userTag, userAvatar);
   logChannel.send(serverMutev);
  }
  if (oldState.serverMute === true && newState.serverMute === false) {
   let serverUnmutev = new Discord.MessageEmbed()
    .setTitle("**VOICE UNMUTE**")
    .setThumbnail(oldState.user.avatarURL())
    .setColor("RANDOM")
    .setDescription(`**User:** <@${oldState.user.id}> (ID: ${oldState.user.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${oldState.voiceChannel.name}\`\` (ID: ${oldState.voiceChannel.id})`)
    .setTimestamp()
   .setFooter(userTag, userAvatar);
   logChannel.send(serverUnmutev);
  }
  if (oldState.serverDeaf === false && newState.serverDeaf === true) {
   let serverDeafv = new Discord.MessageEmbed()
    .setTitle("**VOICE DEAFEN**")
    .setThumbnail(oldState.user.avatarURL())
    .setColor("RANDOM")
    .setDescription(`**User:** <@${oldState.user.id}> (ID: ${oldState.user.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${oldState.voiceChannel.name}\`\` (ID:  ${oldState.voiceChannel.id})`)
    .setTimestamp()
    .setFooter(userTag, userAvatar);
   logChannel.send(serverDeafv);
  }
  if (oldState.serverDeaf === true && newState.serverDeaf === false) {
   let serverUndeafv = new Discord.MessageEmbed()
    .setTitle("**VOICE UNDEAFEN**")
    .setThumbnail(oldState.user.avatarURL())
    .setColor("RANDOM")
    .setDescription(`**User:** <@${oldState.user.id}> (ID: ${oldState.user.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${oldState.voiceChannel.name}\`\` (ID: ${oldState.voiceChannel.id})`)
    .setTimestamp()
    .setFooter(userTag, userAvatar);
   logChannel.send(serverUndeafv);
  }
 });

 if (oldState.voiceChannelID !== newState.voiceChannelID && !oldState.voiceChannel) {
  let voiceJoin = new Discord.MessageEmbed()
   .setTitle("**JOIN VOICE ROOM**")
   .setColor("RANDOM")
   .setThumbnail(oldState.user.avatarURL())
   .setDescription(`**\n**:arrow_lower_right: Successfully \`\`JOIN\`\` To Voice Channel.\n\n**Channel:** \`\`${newState.voiceChannel.name}\`\` (ID: ${newState.voiceChannelID})\n**User:** ${oldState} (ID: ${oldState.id})`)
   .setTimestamp()
   .setFooter(oldState.user.tag, oldState.user.avatarURL());
  logChannel.send(voiceJoin);
 }
 if (oldState.voiceChannelID !== newState.voiceChannelID && !newState.voiceChannel) {
  let voiceLeave = new Discord.MessageEmbed()
   .setTitle("**LEAVE VOICE ROOM**")
   .setColor("RANDOM")
   .setThumbnail(oldState.user.avatarURL())
   .setDescription(`**\n**:arrow_upper_left: Successfully \`\`LEAVE\`\` From Voice Channel.\n\n**Channel:** \`\`${oldState.voiceChannel.name}\`\` (ID: ${oldState.voiceChannelID})\n**User:** ${oldState} (ID: ${oldState.id})`)
   .setTimestamp()
   .setFooter(oldState.user.tag, oldState.user.avatarURL());
  logChannel.send(voiceLeave);
 }

 if (oldState.voiceChannelID !== newState.voiceChannelID && newState.voiceChannel && oldState.voiceChannel != null) {
  let voiceLeave = new Discord.MessageEmbed()
   .setTitle("**CHANGED VOICE ROOM**")
   .setColor("RANDOM")
   .setThumbnail(oldState.user.avatarURL())
   .setDescription(`**\n**:repeat: Successfully \`\`CHANGED\`\` The Voice Channel.\n\n**From:** \`\`${oldState.voiceChannel.name}\`\` (ID: ${oldState.voiceChannelID})\n**To:** \`\`${newState.voiceChannel.name}\`\` (ID: ${newState.voiceChannelID})\n**User:** ${oldState} (ID: ${oldState.id})`)
   .setTimestamp()
   .setFooter(oldState.user.tag, oldState.user.avatarURL());
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
*/
}
