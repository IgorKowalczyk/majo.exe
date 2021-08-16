const Discord = require("discord.js");
const config = require("../../config");
const sql = require("../../utilities/database");

module.exports = async (client, channel, oldPermissions, newPermissions) => {
 try {
  const sqlquery = "SELECT channelid AS res FROM logs WHERE guildid = " + channel.guild.id;
  sql.query(sqlquery, function (error, results, fields) {
   if (error) console.log(error);
   if (!results || results.length == 0) {
    return;
   }
   (async () => {
    const logsetup = await results[0].res;
    const log = await channel.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
    if (!log) return;
    if (channel.type == "text") {
     channelping = `<#${channel.id}>`;
    } else {
     channelping = "```" + channel.name + "```";
    }
    const newtopic = await new Discord.MessageEmbed() // Prettier
     .setTitle("📝 Channel permissions changed!", channel.guild.iconURL())
     .addField("Channel name", `${channelping}`)
     .addField("Channel type", `${channel.type}`)
     .addField("Channel ID", `${channel.id}`)
     .addField("Created at", `${channel.createdAt}`)
     .setColor("RANDOM")
     .setTimestamp()
     .setFooter(channel.guild.name, channel.guild.iconURL());
    await log.send(newtopic);
   })();
  });
 } catch (err) {
  console.log(err);
 }
};
