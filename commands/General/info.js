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
       `${client.bot_emojis.page} Generic Information`,
       message.guild.iconURL({
        dynamic: true,
        format: "png",
       })
      )
      .setColor("RANDOM")
      .setDescription(`Global prefix: \`${process.env.PREFIX}\`\n`)
      .addField(`${client.bot_emojis.owner_crown} Developer`, `<@${config.owner_id}> [[Website](${config.aurhor_website})]`)
      .setThumbnail(
       client.user.displayAvatarURL({
        dynamic: true,
        format: "png",
        size: 2048,
       })
      )
      .addField(`${client.bot_emojis.discord_logo} Guild Count`, `\`${client.guilds.cache.size} guilds\``, true)
      .addField(`${client.bot_emojis.member} User Count`, `\`${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} members\``, true)
      .addField(`${client.bot_emojis.channel} Channel Count`, `\`${client.channels.cache.size} channels\``, true)
      .addField(`${client.bot_emojis.optical_disk} Operating System`, "```" + capitalize(osutils.platform()) + " (" + os.arch() + ")```", true)
      .addField(`${client.bot_emojis.package} Tools`, `\`\`\`Node.js: ${process.version} | Discord.js: ${dependencies["discord.js"].replace("^", "v")}\`\`\``)
      .addField(`${client.bot_emojis.uptime} Uptime`, `\`\`\`Bot: ${botuptime}\nServer: ${osuptime}\`\`\``)
      // Yea, quite long strings XD
      .addField(`${client.bot_emojis.ping} Ping`, `\`\`\`Bot: ${Math.round(client.ws.ping)}ms | API: ${(Date.now() - message.createdTimestamp).toString().replace(/-/g, "")}ms\`\`\``)
      .addField(`${client.bot_emojis.cpu_icon} CPU`, "```" + cpu.model() + " (" + cpu.count() + " cores)" + " [" + cpupercentage + "% used]```")
      .addField(`${client.bot_emojis.drive_icon} Drive`, `\`\`\`${driveinfo.usedGb}GB/${driveinfo.totalGb}GB (${driveinfo.freePercentage}% free)\`\`\``)
      .addField(`${client.bot_emojis.ram_icon} RAM Usage`, `\`\`\`VPS: ${(osutils.totalmem() - osutils.freemem()).toString().split(".")[0] + "." + (osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split("")[0] + (osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split("")[1]}/${osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split("")[0] + osutils.totalmem().toString().split(".")[1].split("")[1]}MB (${(100 - osutils.freememPercentage() * 100).toString().split(".")[0] + "." + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split("")[0] + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split("")[1]}%)\nBOT: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB/${osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split("")[0] + osutils.totalmem().toString().split(".")[1].split("")[1]}MB (${((100 * (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)) / osutils.totalmem().toString().split(".")[0]).toFixed(2)} %)\`\`\``)
      .addField(`${client.bot_emojis.link} Useful Links`, `[Support server](${config.support_server}) |${process.env.DOMAIN ? " [Dashboard](" + process.env.DOMAIN + "}) |" : ""} [Invite me](https://discord.com/oauth2/authorize/?permissions=${config.permissions}&scope=bot&client_id=${client.user.id})`)
      .setFooter(
       `Requested by ${message.author.username}`,
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
     description: `Something went wrong... ${client.bot_emojis.sadness}`,
    },
   });
  }
 },
};
