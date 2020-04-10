const cnf = require('../config.json');
const { version, Discord } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports.run = async (client, message, args) => {
const prefix = process.env.PREFIX;
const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
let embed = new Discord.RichEmbed()
.setTitle(`Information`)
.setColor('3447003')
.setDescription(`My prefix is: \`${prefix}\`\n`)
.setThumbnail(client.user.displayAvatarURL)
.addField('• Developer', `${cnf.owner}`, true)
/*.addField('• Bot Version', `v${version}`, true)
.addField('• Node', `${cnf.node}`, true)
.addField('• Uptime', `${duration}`, true)
.addField('• Guild Count', `${client.guilds.size}`, true)
.addField('• User Count', `${client.users.size}`, true)
.addField('• Channel Count', `${client.channels.size}`, true)
.addField('• Memory Usage', `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`, true)
.addField('• Useful Links', `[Website](${cnf.website}) | [Invite me!](https://discordapp.com/oauth2/authorize/?permissions=2146958847&scope=bot&client_id=${client.user.id}))`, true)
.setFooter(`Bot created by ${cnf.owner}`)*/
message.channel.send(embed);
}

module.exports.help = {
    name: "info",
    description: "Display a bot info",
    usage: "info",
    type: "General"  
}




