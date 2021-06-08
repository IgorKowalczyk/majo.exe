const Discord = require("discord.js");
const config = require("../../config");
const moment = require("moment");
const osutils = require("os-utils");
require("moment-duration-format");

module.exports = {
 name: "info",
 aliases: ["botinfo", "clientinfo", "stats"],
 description: "Shows informations for developers",
 category: "General",
 usage: "info",
 run: async (client, message, args) => {
  try {
   if ((config.dashboard = "true")) {
    webpanel = `[Dashboard](${config.domain}) |`;
   } else {
    webpanel = " ";
   }
   const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
   const embed = new Discord.MessageEmbed()
    .setTitle(`📄 Information for developers`, message.guild.iconURL({ dynamic: true, format: "png" }))
    .setColor("RANDOM")
    .setDescription(`My global prefix is: \`${config.prefix}\`\n`)
    .addField("Developer", `${config.author} \[[Website](${config.authorwebsite})\]`, true)
    .setThumbnail(client.user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }))
    .addField("Guild Count", `${client.guilds.cache.size}`, true)
    .addField("User Count", `${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}`, true)
    .addField("Channel Count", `${client.channels.cache.size}`, true)
    .addField("Uptime", `${duration}`, true)
    .addField("Ping", Math.round(client.ws.ping) + "ms", true)
    .addField("Platform", osutils.platform())
    .addField("Node", `${process.version}`, true)
    .addField("CPU Cores", osutils.cpuCount() + " Cores", true)
    //.addField("CPU Usage", `${(osutils.cpuUsage * 100).toString().split(".")[0] + "." + (osutils.cpuUsage * 100).toString().split(".")[1].split('')[0] + (osutils.cpuUsage * 100).toString().split(".")[1].split('')[1]}%`, true)
    .addField("Total Memory", osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split("")[0] + osutils.totalmem().toString().split(".")[1].split("")[1] + "MB", true)
    .addField("RAM Usage Of VPS", `${(osutils.totalmem() - osutils.freemem()).toString().split(".")[0] + "." + (osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split("")[0] + (osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split("")[1]}/${osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split("")[0] + osutils.totalmem().toString().split(".")[1].split("")[1]}MB`, true)
    .addField("RAM Usage Of Bot", (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + "MB/" + osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split("")[0] + osutils.totalmem().toString().split(".")[1].split("")[1] + "MB", true)
    .addField("RAM Usage Of VPS %", `${(100 - osutils.freememPercentage() * 100).toString().split(".")[0] + "." + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split("")[0] + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split("")[1]}%`, true)
    .addField("Useful Links", `[Support server](${config.server}) | ${webpanel} [Invite me](https://discord.com/oauth2/authorize/?permissions=${config.premissions}&scope=bot&client_id=${client.user.id})`)
    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }));
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
