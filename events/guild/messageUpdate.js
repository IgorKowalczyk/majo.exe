const Discord = require("discord.js")
const config = require("../../config")
const sql = require("../../utilities/database")

module.exports = async (client, oldMessage, newMessage) => {
 try {
  const sqlquery = "SELECT channelid AS res FROM logs WHERE guildid = " + oldMessage.guild.id
  sql.query(sqlquery, function (error, results, fields) {
   if (error) console.log(error)
   if (!results || results.length == 0) {
    return
   }
   const logsetup = results[0].res
   ;(async () => {
    const log = await oldMessage.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text")
    if (oldMessage.author.bot) return
    if (!oldMessage.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return
    if (!log) return
    if (!newMessage.embeds) return console.log("yes")
    const oldone = oldMessage.toString().substr(0, 1000).replace(/`/g, "'") // To awoid quiting code block
    const newone = newMessage.toString().substr(0, 1000).replace(/`/g, "'") // To awoid quiting code block
    const event = await new Discord.MessageEmbed()
     .setTitle(`Message Edited`)
     .setColor("RANDOM")
     .setThumbnail(oldMessage.author.avatarURL())
     .addField("Channel", `<#${oldMessage.channel.id}> (ID: ${oldMessage.channel.id})`)
     .addField("Message ID", `${oldMessage.id}`)
     .addField("Created at", `${oldMessage.createdAt}`)
     .addField("TTS", `${oldMessage.tts}`)
     .addField("Pinned", `${oldMessage.pinned}`)
     .addField("Send By", `<@${oldMessage.author.id}> (ID: ${oldMessage.author.id})`)
     .addField("Old Message", "```" + `${oldone || "I can't fetch the message ~Majo"}` + "```")
     .addField("New Message", "```" + `${newone || "I can't fetch the message ~Majo"}` + "```")
     .setTimestamp()
     .setFooter(oldMessage.guild.name, oldMessage.guild.iconURL())
    await log.send(event)
   })()
  })
 } catch (err) {
  console.log(err)
 }
}
