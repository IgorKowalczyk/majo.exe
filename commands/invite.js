const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {

const embed = new Discord.RichEmbed()
.setTitle("Invite the bot")
.setColor(#09a8ca)
.setDescription("Invite the bot here: [invite link](https://discordapp.com/oauth2/authorize/?permissions=2146958847&scope=bot&client_id=${client.user.id})\n\n Check official [website](https://igorkowalczyk.github.io/majobot)\n\n Check official [server](https://discord.gg/f4KtqNB)")
.setFooter("Bot created by TEST")
.setTimestamp()
message.channel.send({embed})

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


