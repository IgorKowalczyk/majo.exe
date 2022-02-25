const { MessageEmbed } = require("discord.js");

module.exports = async (client, message, oldContent, newContent) => {
 try {
  const sqlquery = "SELECT channelid AS res FROM logs WHERE guildid = " + message.guild.id;
  client.database.query(sqlquery, function (error, results, fields) {
   if (error) console.log(error);
   if (!results || results.length == 0) {
    return;
   }
   (async () => {
    await message.guild.channels.fetch();
    const logsetup = await results[0].res;
    const log = await message.guild.channels.cache.find((c) => c.id == logsetup);
    if (message.channel.type === "dm") return;
    if (!message.guild.me.permissions.has("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
    if (!log) return;
    const edited = newContent.toString().substr(0, 1000).replace(/`/g, "'"); // Limit characters
    const orgin = oldContent.toString().substr(0, 1000).replace(/`/g, "'"); // Limit characters
    const event = await new MessageEmbed() // Prettier
     .setTitle(`${client.bot_emojis.edit} Message Edited`)
     .setColor("#4f545c")
     .setThumbnail(message.author.avatarURL())
     .addField("Channel", `<#${message.channel.id}> (ID: \`${message.channel.id}\`)`)
     .addField("Message ID", `\`${message.id}\``)
     .addField("Created at", `${message.createdAt}`)
     .addField("TTS", `\`${message.tts}\``)
     .addField("Pinned", `\`${message.pinned}\``)
     .addField("Send By", `<@${message.author.id}> (ID: \`${message.author.id}\`)`)
     .addField("New Message", `${edited || "I can't fetch the message ~Majo"}`)
     .addField("Old Message", `${orgin || "I can't fetch the message ~Majo"}`)
     .addField("Message link", `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`)
     .setTimestamp()
     .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL() });
    await log.send({ embeds: [event] });
   })();
  });
 } catch (err) {
  console.log(err);
 }
};
