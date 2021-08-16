const Discord = require("discord.js");
const config = require("../../config");
const sql = require("../../utilities/database");

module.exports = async (client, channel, oldTopic, newTopic) => {
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
    const newtopic = await new Discord.MessageEmbed() // Prettier
     .setTitle("📝 Channel topic changed!", channel.guild.iconURL())
     .addField("Channel name", `${channel.name}`)
     .addField("Old topic", `\`\`\`${oldTopic}\`\`\``)
     .addField("New topic", `\`\`\`${newTopic}\`\`\``)
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
