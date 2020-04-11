const Discord = module.require("discord.js");
const cnf = require('../config.json');

module.exports.run = async (client, message, args) => {

const embed = new Discord.RichEmbed()
.setTitle("Invite")
.setColor(3447003)
.setDescription("Invite the bot")
.addField("Invite ", "[Invite the bot here](https://discordapp.com/oauth2/authorize/?permissions=2146958847&scope=bot&client_id=" + `${client.user.id}`)
.addField("Website ", "[Check the official webiste](https://igorkowalczyk.github.io/majobot)")
.addField("Server ", "[Join official server](https://discord.gg/f4KtqNB)")
.setFooter("Bot created by " + `${cnf.owner}`)
.setTimestamp()
message.author.send({embed})

message.channel.send({embed: {
            color: 3447003,
            title: "Check a priv message!"
        }})
}

module.exports.help = {
    name: "invite",
    description: "Sends a bot invite",
    usage: "invite",
    type: "General"  
}


