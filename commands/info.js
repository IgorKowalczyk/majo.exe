const cnf = require('../config.json');
const { version } = require("discord.js");
const moment = require("moment");
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
.addField('• Node', `${process.version}`, {code: "asciidoc"}))
.addField('• Discord', `v${version}`,)
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

