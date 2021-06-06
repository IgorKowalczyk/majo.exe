const Discord = require("discord.js")
const config = require("../../config")
const MySQL = require("mysql")

module.exports = async (client, oldGuild, newGuild) => {
 try {
  const sql = MySQL.createPool({
   host: process.env.MYSQL_HOST,
   user: process.env.MYSQL_USER,
   password: process.env.MYSQL_PASSWORD,
   database: process.env.MYSQL_DATABASE,
   charset: "utf8mb4",
   port: "3306",
  })
  const sqlquery = "SELECT channelid AS res FROM logs WHERE guildid = " + newGuild.id
  sql.query(sqlquery, function (error, results, fields) {
   if (error) console.log(error)
   if (!results || results.length == 0) {
    sql.end()
    return
   }
   const logsetup = results[0].res
   sql.end()
   ;(async () => {
    const log = await newGuild.channels.cache.find((c) => c.id == logsetup && c.type == "text")
    if (!newGuild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return
    if (!log) return
    if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return
    if (oldGuild.name != newGuild.name) {
     const embed = await new Discord.MessageEmbed().setTitle("Guild name changed").setColor("RANDOM").addField("Old name", `\`\`\`${oldGuild.name}\`\`\``).addField("New name", `\`\`\`${newGuild.name}\`\`\``).setTimestamp().setFooter(newGuild.name, newGuild.iconURL())
     await log.send(embed)
    }
    if (oldGuild.owner != newGuild.owner) {
     const embed = await new Discord.MessageEmbed().setTitle("Guild owner changed").setColor("RANDOM").addField("Old owner", `<@${oldGuild.owner}>`).addField("New owner", `<@${newGuild.owner}>`).setTimestamp().setFooter(newGuild.name, newGuild.iconURL())
     await log.send(embed)
    }
    if (oldGuild.preferredLocale != newGuild.preferredLocale) {
     const embed = await new Discord.MessageEmbed().setTitle("Guild preferred locale changed").setColor("RANDOM").addField("Old preferred locale", `\`\`\`${oldGuild.preferredLocale}\`\`\``).addField("New preferred locale", `\`\`\`${newGuild.preferredLocale}\`\`\``).setTimestamp().setFooter(newGuild.name, newGuild.iconURL())
     log.send(embed)
    }
    if (oldGuild.publicUpdatesChannelID != newGuild.publicUpdatesChannelID) {
     const embed = await new Discord.MessageEmbed().setTitle("Guild public updates channel changed").setColor("RANDOM").addField("Old public updates channel", `<#${oldGuild.publicUpdatesChannelID}>`).addField("New public updates channel", `<#${newGuild.publicUpdatesChannelID}>`).setTimestamp().setFooter(newGuild.name, newGuild.iconURL())
     await log.send(embed)
    }
    if (oldGuild.rulesChannelID != newGuild.rulesChannelID) {
     const embed = await new Discord.MessageEmbed().setTitle("Guild rules channel changed").setColor("RANDOM").addField("Old rules channel", `<#${oldGuild.rulesChannelID}>`).addField("New rules channel", `<#${newGuild.rulesChannelID}>`).setTimestamp().setFooter(newGuild.name, newGuild.iconURL())
     await log.send(embed)
    }
    if (oldGuild.systemChannelID != newGuild.systemChannelID) {
     const embed = await new Discord.MessageEmbed().setTitle("Guild system channel changed").setColor("RANDOM").addField("Old system channel", `<#${oldGuild.systemChannelID}>`).addField("New system channel", `<#${newGuild.systemChannelID}>`).setTimestamp().setFooter(newGuild.name, newGuild.iconURL())
     await log.send(embed)
    }
    if (oldGuild.verificationLevel != newGuild.verificationLevel) {
     const embed = await new Discord.MessageEmbed().setTitle("Guild verification level changed").setColor("RANDOM").addField("Old verification level", `\`\`\`${oldGuild.verificationLevel}\`\`\``).addField("New verification level", `\`\`\`${newGuild.verificationLevel}\`\`\``).setTimestamp().setFooter(newGuild.name, newGuild.iconURL())
     await log.send(embed)
    }
    if (oldGuild.widgetEnabled != newGuild.widgetEnabled) {
     const embed = await new Discord.MessageEmbed().setTitle("Guild widget update").setColor("RANDOM").addField("Old widget channel", `\`\`\`${oldGuild.widgetEnabled}\`\`\``).addField("New widget channel", `\`\`\`${newGuild.widgetEnabled}\`\`\``).setTimestamp().setFooter(newGuild.name, newGuild.iconURL())
     await log.send(embed)
    }
    if (oldGuild.widgetChannelID != newGuild.widgetChannelID) {
     const embed = await new Discord.MessageEmbed().setTitle("Guild widget channel changed").setColor("RANDOM").addField("Old widget channel", `<#${oldGuild.widgetChannelID}>`).addField("New widget channel", `<#${newGuild.widgetChannelID}>`).setTimestamp().setFooter(newGuild.name, newGuild.iconURL())
     await log.send(embed)
    }
   })()
  })
 } catch (err) {
  console.log(err)
 }
}
