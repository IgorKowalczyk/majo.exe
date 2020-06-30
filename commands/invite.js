const Discord = require("discord.js");
const cnf = require('../config.json');

module.exports.run = async (client, message, args) => {
try {
const embed = new Discord.RichEmbed()
  .setTitle("Invite the bot")
  .setColor('RANDOM')
  .addField("Invite to Discord server", "[Invite the bot here (Recomended!)](" + `${cnf.website}` + "/authorize) \n[Invite the bot here (Normal)](https://discordapp.com/oauth2/authorize/?permissions=8&scope=bot&client_id=" + `${client.user.id})`)
  .addField("Website", `[Visit webiste](${cnf.website})`)
  .addField("Server", `[Join to official server](${cnf.server})`)
  .setFooter("Bot created by " + `${cnf.owner}`)
  .setTimestamp()
message.author.send({embed})

message.channel.send({embed: {
            color: 3447003,
            description: "Check a priv message!"
        }})
} catch (err) {
    message.channel.send({embed: {
                color: 16734039,
                description: "Something went wrong... :cry:"
            }})
}
}

module.exports.help = {
    name: "invite",
    description: "Sends a bot invite",
    usage: "invite",
    type: "General"  
}


