const Discord = require("discord.js");
const config = require("../../config");
const moment = require("moment");
const os = require('os');
require("moment-duration-format");

module.exports = {
 name: "info",
 aliases: ["botinfo", "clientinfo", "stats"],
 description: "Shows informations for developers",
 category: "General",
 usage: "info",
 run: async (client, message, args) => {
  try {
   const memory = os.totalmem() -os.freemem(), totalmemory = os.totalmem();
   const percentage =  ((memory/totalmemory) * 100).toFixed(2) + '%'
   const freememory = os.freemem();
   const totalmemoryembed = (totalmemory / Math.pow(1024, 3)).toFixed(2) + "GB";
   const ostype = os.type() + " " + os.release();
   const usedmemory = (memory/ Math.pow(1024, 3)).toFixed(2) + "GB (" + (freememory / Math.pow(1024, 3)).toFixed(2) + "GB free)";
   if(config.dashboard = "true") {
    webpanel = `[Web-Panel](${config.domain}) |`;
   } else {
    webpanel = " ";
   }
   const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
   const embed = new Discord.MessageEmbed()
    .setTitle(`📄 Information for developers`, message.guild.iconURL({ dynamic: true, format: 'png'}))
    .setColor("RANDOM")
    .setDescription(`My prefix is: \`${config.prefix}\`\n`)
    .addField('Head developer', `${config.author} \[[Website](${config.authorwebsite})\]`, true)
    .setThumbnail(client.user.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    .addField('Node', `${process.version}`, true)
    .addField('OS', `${ostype}`, true)
    .addField('Stack', `20 (Support date: 01.04.2025)`, true)
    .addField('Uptime', `${duration}`, true)
    .addField('Guild Count', `${client.guilds.cache.size}`, true)
    .addField('User Count', `${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}`, true)
    .addField('Channel Count', `${client.channels.cache.size}`, true)
    .addField('Memory', `Memory used: ${usedmemory}\nUsed percentage: ${percentage}\nTotal memory: ${totalmemoryembed}`)
    .addField('Useful Links', `[Official server](${config.server}) | ${webpanel} [Invite me](https://discord.com/oauth2/authorize/?permissions=${config.premissions}&scope=bot&client_id=${client.user.id})`)
    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
   message.lineReply(embed);
  } catch(err) {
   message.lineReply({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
