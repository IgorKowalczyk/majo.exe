const cnf = require('../config.json');
const Discord = require('discord.js');
require("moment-duration-format");

module.exports.run = async (client, message, args) => {
// You can change this to whatever you want, i suggest editing it.
const prefix = process.env.PREFIX;
const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
let embed = new Discord.RichEmbed()
.setTitle(`Information`)
.setColor('3447003')
.setDescription(`My prefix is: \`${prefix}\`\n`,)
.setThumbnail(client.user.displayAvatarURL)
.addField('• Developer', `${cnf.owner}`,)
.addField('• Bot Version', `${cnf.version}`,)
.addField('• Node', `${cnf.node}`,)
.addField('• Uptime', `${duration}`,)
.addField('• Guild Count', `${client.guilds.size}`,)
.addField('• User Count', `${client.users.size}`,)
.addField('• Channel Count', `${client.channels.size}`,)
.addField('• Memory Usage', `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,)
.addField('• Useful Links', `[Website](${cnf.website}) | [Support Server](${cnf.supporturl}) | [Invite me!](https://discordapp.com/oauth2/authorize/?permissions=2146958847&scope=bot&client_id=${client.user.id}))`,)
.setFooter(`Bot created by ${cnf.owner}`,)
message.channel.send(embed);
}

module.exports.help = {
    name: "info",
    description: "Display a bot info",
    usage: "info",
    type: "General"  
}









const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  message.channel.send(`= STATISTICS =
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${duration}
• Users      :: ${client.users.size.toLocaleString()}
• Servers    :: ${client.guilds.size.toLocaleString()}
• Channels   :: ${client.channels.size.toLocaleString()}
• Discord.js :: v${version}
• Node       :: ${process.version}`, {code: "asciidoc"});
};





