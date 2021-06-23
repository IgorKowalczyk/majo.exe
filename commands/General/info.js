const Discord = require("discord.js");
const config = require("../../config");
const moment = require("moment");
const os = require("os");
const osutils = require("os-utils");
require("moment-duration-format");
const { dependencies } = require("../../package.json");

module.exports = {
 name: "info",
 aliases: ["botinfo", "clientinfo", "stats"],
 description: "Shows informations for developers",
 category: "General",
 usage: "info",
 run: async (client, message, args) => {
  try {
   if (process.env.DOMAIN) {
    webpanel = `[Dashboard](${process.env.DOMAIN}) |`;
   } else {
    webpanel = " ";
   }
   function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
   }
   const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
   const embed = new Discord.MessageEmbed() // Prettier()
    .setTitle(
     `📄 Generic Information`,
     message.guild.iconURL({
      dynamic: true,
      format: "png",
     })
    )
    .setColor("RANDOM")
    .setDescription(`Global prefix: \`${process.env.PREFIX}\`\n`)
    .addField("<:owner:856161806199947285> Developer", `${config.author} \[[Website](${config.authorwebsite})\]`)
    .setThumbnail(
     client.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    )
    .addField("<:discordlogo:856166057639149568> Guild Count", `\`${client.guilds.cache.size}\``, true)
    .addField("<:members:856161806606401556> User Count", `\`${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}\``, true)
    .addField("<:channel:856161806586085376> Channel Count", `\`${client.channels.cache.size}\``, true)
    .addField("⏳ Uptime", `\`${duration}\``, true)
    .addField("🏓 Ping", "`" + Math.round(client.ws.ping) + "ms`", true)
    .addField("<:discduckmicroshit:856174395205615647>  Platform", "`" + capitalizeFirstLetter(osutils.platform()) + "`", true)
    .addField("<:node:792080285205790760> Node", "`" + process.version + "`", true)
    .addField("<:discordjs:756951296392560811> Discord.js", "`" + dependencies["discord.js"].replace("^", "v") + "`", true)
    .addField("<:cpu:856174395436171294> CPU", "`" + os.cpus()[0].model.substring(0, os.cpus()[0].model.indexOf("CPU")) || "Intel Xeon" + " (" + osutils.cpuCount() + " cores`", true)
    .addField("<:ram:856174395508391986> Total Memory", "```" + osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split("")[0] + osutils.totalmem().toString().split(".")[1].split("")[1] + "MB```")
    .addField("<:ram:856174395508391986> RAM Usage (VPS)", `\`\`\`${(osutils.totalmem() - osutils.freemem()).toString().split(".")[0] + "." + (osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split("")[0] + (osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split("")[1]}/${osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split("")[0] + osutils.totalmem().toString().split(".")[1].split("")[1]}MB (${(100 - osutils.freememPercentage() * 100).toString().split(".")[0] + "." + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split("")[0] + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split("")[1]}%)\`\`\``)
    .addField("<:ram:856174395508391986> RAM Usage (BOT)", "```" + (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + "MB/" + osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split("")[0] + osutils.totalmem().toString().split(".")[1].split("")[1] + "MB```")
    .addField("🔗 Useful Links", `[Support server](${config.server}) | ${webpanel} [Invite me](https://discord.com/oauth2/authorize/?permissions=${config.premissions}&scope=bot&client_id=${client.user.id})`)
    .setFooter(
     "Requested by " + `${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    );
   message.lineReply(embed);
  } catch (err) {
   console.log(err);
   message.lineReply({
    embed: {
     color: 16734039,
     description: "Something went wrong... :cry:",
    },
   });
  }
 },
};
