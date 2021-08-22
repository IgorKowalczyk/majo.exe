const Discord = require("discord.js");
const sql = require("../../utilities/database");

module.exports = {
 name: "set-leave",
 aliases: ["leave-set", "lv-set", "set-leave-channel"],
 description: "Set leave channel for the guild",
 category: "Moderation",
 usage: "set-leave <channel>",
 run: async (client, message, args) => {
  try {
   if (!message.member.hasPermission("MANAGE_CHANNELS")) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | You don't have permissions to change leave channel! You need \`MANAGE_CHANNELS\` permission!`,
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
   const sqlquery = "SELECT `channelid` AS res FROM `leave` WHERE `guildid` = " + message.guild.id;
   sql.query(sqlquery, function (error, results, fields) {
    if (error) return console.log(error);
    if (results[0]) {
     const update = "UPDATE `leave` SET `channelid` = " + channel.id + " WHERE `guildid` = " + message.guild.id;
     sql.query(update, function (error, results, fields) {
      if (error) console.log(error);
      message.lineReply({
       embed: {
        color: 4779354,
        description: `${client.bot_emojis.sparkles} | Success! Updated leave channel, new leave channel is ${channel} (ID: ${channel.id})`,
       },
      });
      const embed = new Discord.MessageEmbed() // Prettier
       .setColor("RANDOM")
       .setTitle("Success!")
       .setDescription(`${message.author} set up this channel to send users leave messages`)
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
     const insert = "INSERT INTO `leave` (`guildid`, `channelid`) VALUES (" + message.guild.id + "," + channel.id + ");";
     sql.query(insert, function (error, results, fields) {
      if (error) console.log(error);
      message.lineReply({
       embed: {
        color: 4779354,
        description: `${client.bot_emojis.sparkles} | Success! New channel for leave messages is ${channel} (ID: ${channel.id})`,
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
