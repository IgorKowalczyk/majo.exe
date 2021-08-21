const Discord = require("discord.js");
const config = require("../../config");
const moment = require("moment");
require("moment-duration-format");
const osutils = require("os-utils");
const osu = require("node-os-utils");
const cpu = osu.cpu;
const os = osu.os;
const drive = osu.drive;
const proc = osu.proc;
const { dependencies } = require("../../package.json");

module.exports = {
 name: "info",
 aliases: ["botinfo", "clientinfo", "stats"],
 description: "Shows informations for developers",
 category: "General",
 usage: "info",
 run: async (client, message, args) => {
  try {
   const botuptime = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
   const osuptime = moment.duration(os.uptime()).format(" D [days], H [hrs], m [mins], s [secs]");
   function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
   }
   cpu.usage().then((cpupercentage) => {
    drive.info().then((driveinf) => {
     const driveinf0 = JSON.stringify(driveinf);
     const driveinfo = JSON.parse(driveinf0);
     const embed = new Discord.MessageEmbed() // Prettier
      .setTitle(
       `📄 Generic Information`,
       message.guild.iconURL({
        dynamic: true,
        format: "png",
       })
      )
      .setColor("RANDOM")
      .setDescription(`Global prefix: \`${process.env.PREFIX}\`\n`)
      .addField("<:owner:856161806199947285> Developer", `<@${config.owner_id}> \[[Website](${config.aurhor_website})\]`)
      .setThumbnail(
       client.user.displayAvatarURL({
        dynamic: true,
        format: "png",
        size: 2048,
       })
      )
      .addField("<:discord_2:876473291777404959> Guild Count", `\`${client.guilds.cache.size} guilds\``, true)
      .addField("<:members:856161806606401556> User Count", `\`${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} members\``, true)
      .addField("<:channel:856161806586085376> Channel Count", `\`${client.channels.cache.size} channels\``, true)
      .addField("💿 Operating System", "```" + capitalize(osutils.platform()) + " (" + os.arch() + ")```", true)
      .addField("📦 Tools", `\`\`\`Node.js: ${process.version} | Discord.js: ${dependencies["discord.js"].replace("^", "v")}\`\`\``)
      .addField("⏳ Uptime", `\`\`\`Bot: ${botuptime}\nServer: ${osuptime}\`\`\``)
      // Yea, quite long strings
      .addField("🏓 Ping", `\`\`\`Bot: ${Math.round(client.ws.ping)}ms | API: ${(Date.now() - message.createdTimestamp).toString().replace(/-/g, "")}ms\`\`\``)
      .addField("<:cpu:856174395436171294> CPU", "```" + cpu.model() + " (" + cpu.count() + " cores)" + " [" + cpupercentage + "% used]```")
      .addField("<:drive:876545424956198952> Drive", `\`\`\`${driveinfo.usedGb}GB/${driveinfo.totalGb}GB (${driveinfo.freePercentage}% free)\`\`\``)
      .addField("<:ram:856174395508391986> RAM Usage", `\`\`\`VPS: ${(osutils.totalmem() - osutils.freemem()).toString().split(".")[0] + "." + (osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split("")[0] + (osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split("")[1]}/${osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split("")[0] + osutils.totalmem().toString().split(".")[1].split("")[1]}MB (${(100 - osutils.freememPercentage() * 100).toString().split(".")[0] + "." + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split("")[0] + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split("")[1]}%)\nBOT: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB/${osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split("")[0] + osutils.totalmem().toString().split(".")[1].split("")[1]}MB (${((100 * (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)) / osutils.totalmem().toString().split(".")[0]).toFixed(2)} %)\`\`\``)
      .addField("🔗 Useful Links", `[Support server](${config.support_server}) |${process.env.DOMAIN ? " [Dashboard](" + process.env.DOMAIN + "}) |" : ""} [Invite me](https://discord.com/oauth2/authorize/?permissions=${config.permissions}&scope=bot&client_id=${client.user.id})`)
      .setFooter(
       "Requested by " + `${message.author.username}`,
       message.author.displayAvatarURL({
        dynamic: true,
        format: "png",
        size: 2048,
       })
      );
     message.lineReply(embed);
    });
   });
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
