const cnf = require('../config.json');
const Discord = require('discord.js');


module.exports.run = async (client, message, args) => {
// You can change this to whatever you want, i suggest editing it.
let embed = new Discord.RichEmbed()
.setTitle(`${client.user.username} Information`)
.setColor('#36393F')
.setDescription(`My prefix is: \`${prefix}\`\n`)
.setThumbnail(client.user.displayAvatarURL)
.addField('❯ Developer', `<@${cnf.owner}>`, true)
.addField('❯ Bot Version', `${cnf.version}`, true)
.addField('❯ Node', `${cnf.node}`, true)
.addField('❯ Guild Count', `${client.guilds.size}`, true)
.addField('❯ User Count', `${client.users.size}`, true)
.addField('❯ Channel Count', `${client.channels.size}`, true)
.addField('❯ Emojis Count', `${client.emojis.size}`, true)
.addField('❯ Memory Usage', `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`, true)
.addField('❯ Useful Links', `[Website](${cnf.website}) | [Support Server](${cnf.supporturl}) | [Invite ${client.user.username}](https://discordapp.com/oauth2/authorize/?permissions=2146958847&scope=bot&client_id=${client.user.id}) | [Github](${cnf.github})`, false)
.setFooter(`${client.user.username} | By: ${cnf.ownertag}`)
message.channel.send(embed);
}

module.exports.help = {
    name: "info",
    description: "Display a bot info",
    usage: "info",
    type: "General"  
}
