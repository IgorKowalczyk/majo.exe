const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
  message.author.send("https://discordapp.com/oauth2/authorize?client_id=681536055572430918&scope=bot&permissions=2146958591");
message.channel.send({embed: {
            color: 3447003,
            title: "Check a priv message!"
        }})
}

module.exports.help = {
    name: "botinvite",
    description: "Sends you the bot invite for Majo.exe",
    usage: "botinvite",
    type: "General"  
}