const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
message.author.send({embed: {
                    color: 3447003,
                    title: "Majo.exe",
					description: "Invite the bot here: [invite link](https://discordapp.com/oauth2/authorize?client_id=681536055572430918&scope=bot&permissions=2146958591) \n Check website: [majobot](https://igorkowalczyk.github.io)\n Join to official server [PL]:"
					}})
message.author.send("https://discord.gg/f4KtqNB");

message.channel.send({embed: {
            color: 3447003,
            title: "Check a priv message!"
        }})
}

module.exports.help = {
    name: "invite",
    description: "Sends you the bot invite for Majo.exe",
    usage: "invite",
    type: "General"  
}