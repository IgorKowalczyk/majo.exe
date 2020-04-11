const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {

message.author.send("Invite the bot here: [invite link](https://discordapp.com/oauth2/authorize/?permissions=2146958847&scope=bot&client_id=${client.user.id})");

message.author.send("https://discord.gg/f4KtqNB");

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


