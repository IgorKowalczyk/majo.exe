const Discord = require("discord.js")
const MySQL = require("mysql")

module.exports = {
 name: "set-welcome",
 aliases: ["welcome-set", "w-set", "set-welcome-channel"],
 description: "Set welcome channel for the guild",
 category: "Moderation",
 usage: "set-welcome <channel>",
 run: async (client, message, args) => {
  try {
   if (!message.member.hasPermission("MANAGE_CHANNELS")) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: "❌ | You don't have premissions to change welcome channel! You need `MANAGE_CHANNELS` premission!",
     },
    })
   }
   const channel = message.mentions.channels.first()
   if (!channel) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: "❌ | You must enter a channel!",
     },
    })
   }
   const sql = MySQL.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    charset: "utf8mb4",
    port: "3306",
   })
   const sqlquery = "SELECT channelid AS res FROM welcome WHERE guildid = " + message.guild.id
   sql.query(sqlquery, function (error, results, fields) {
    if (error) return console.log(error)
    if (results[0]) {
     const update = "UPDATE welcome SET channelid = " + channel.id + " WHERE guildid = " + message.guild.id
     sql.query(update, function (error, results, fields) {
      if (error) console.log(error)
      message.lineReply({
       embed: {
        color: 4779354,
        description: `✨ | Success! Updated welcome channel, new welcome channel is ${channel} (ID: ${channel.id})`,
       },
      })
      const embed = new Discord.MessageEmbed()
       .setColor("RANDOM")
       .setTitle("Success!")
       .setDescription(`${message.author} set up this channel to send users welcome messages`)
       .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }))
       .setTimestamp()
      channel.send(embed)
     })
    } else {
     const insert = "INSERT INTO `welcome` (`guildid`, `channelid`) VALUES (" + message.guild.id + "," + channel.id + ");"
     sql.query(insert, function (error, results, fields) {
      if (error) console.log(error)
      message.lineReply({
       embed: {
        color: 4779354,
        description: `✨ | Success! New channel for welcome messages is ${channel} (ID: ${channel.id})`,
       },
      })
     })
    }
   })
  } catch (err) {
   console.log(err)
   message.lineReply({
    embed: {
     color: 16734039,
     description: "Something went wrong... :cry:",
    },
   })
  }
 },
}
