const Discord = module.require("discord.js");

module.exports.run = async (client, message, args) => {
  const Embed = {
  "title": "Majo.exe",
  "description": "Invite the bot here: [invite link](https://discordapp.com/oauth2/authorize/?permissions=2146958847&scope=bot&client_id=${client.user.id})",
  "url": "https://igorkowalczyk.github.io/majobot",
  "color": 3447003,
  "thumbnail": {
    "url": "https://cdn.discordapp.com/avatars/544164729354977282/c39c2d7b39e5d6d5d13a8c2bdb010373.png?size=2048"
  }
};

message.author.send(Embed);

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


