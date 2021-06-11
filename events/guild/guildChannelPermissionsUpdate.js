const Discord = require("discord.js");
const config = require("../../config");
const sql = require("../../utilities/database");

module.exports = async (client, channel, oldPermissions, newPermissions) => {
 try {
  const sqlquery = "SELECT channelid AS res FROM logs WHERE guildid = " + newChannel.guild.id;
  sql.query(sqlquery, function (error, results, fields) {
   if (error) console.log(error);
   if (!results || results.length == 0) {
    return;
   }
   const logsetup = results[0].res;
   (async () => {
    const log = await channel.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
    const newtopic = new Discord.MessageEmbed()
     .setTitle("Channel Description changed")
     .setThumbnail(uavatar)
     .addField("Old premissions", `\`\`\`\ ${newPermissions || "Unknown"} \`\`\` `)
     .addField("New premissions", `\`\`\`\ ${newPermissions || "Unknown"} \`\`\` `)
     .addField("Channel id", `${channel.id}`)
     //.addField("Channel type", `${type}`)
     //.addField("Changed by", `<@${userid}> (ID: ${userid})`)
     .addField("Created at", `${channel.createdAt}`)
     .setColor("RANDOM")
     .setTimestamp()
     .setFooter(channel.guild.name, channel.guild.iconURL());
    log.send(newtopic);
   })();
  });
 } catch (err) {}
};
