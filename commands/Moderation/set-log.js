const Discord = require("discord.js");
const sql = require("../../utilities/database");

module.exports = {
 name: "set-log",
 aliases: ["log-set", "l-set", "set-log-channel"],
 description: "Set log channel for the guild",
 category: "Moderation",
 usage: "set-log <channel>",
 run: async (client, message, args) => {
  try {
   if (!message.member.hasPermission("MANAGE_CHANNELS")) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | You don't have permissions to change logging channel! You need \`MANAGE_CHANNELS\` permission!`,
     },
    });
   }
   const channel = message.mentions.channels.first();
   if (!channel) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | You must enter a channel!`,
     },
    });
   }
   const sqlquery = "SELECT channelid AS res FROM logs WHERE guildid = " + message.guild.id;
   sql.query(sqlquery, function (error, results, fields) {
    if (error) return console.log(error);
    if (results[0]) {
     const update = "UPDATE logs SET channelid = " + channel.id + " WHERE guildid = " + message.guild.id;
     sql.query(update, function (error, results, fields) {
      if (error) console.log(error);
      message.lineReply({
       embed: {
        color: 4779354,
        description: `${client.bot_emojis.sparkles} | Success! Updated logs channel, new logs channel is ${channel} (ID: ${channel.id})`,
       },
      });
      const embed = new Discord.MessageEmbed() // Prettier
       .setColor("RANDOM")
       .setTitle("Success!")
       .setDescription(`${message.author} has set this channel for logging all events!`)
       .setFooter(
        `Requested by ${message.author.username}`,
        message.author.displayAvatarURL({
         dynamic: true,
         format: "png",
         size: 2048,
        })
       )
       .setTimestamp();
      channel.send(embed);
     });
    } else {
     const insert = "INSERT INTO `logs` (`guildid`, `channelid`) VALUES (" + message.guild.id + "," + channel.id + ");";
     sql.query(insert, function (error, results, fields) {
      if (error) console.log(error);
      message.lineReply({
       embed: {
        color: 4779354,
        description: `${client.bot_emojis.sparkles} | Success! New channel for logs is ${channel} (ID: ${channel.id})`,
       },
      });
     });
    }
   });
  } catch (err) {
   console.log(err);
   message.lineReply({
    embed: {
     color: 16734039,
     description: `Something went wrong... ${client.bot_emojis.sadness}`,
    },
   });
  }
 },
};
