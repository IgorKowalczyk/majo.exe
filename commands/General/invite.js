const Discord = require("discord.js");
const cnf = require('../../config.js');

module.exports = {
 name: "invite",
 aliases: ["inv", "botinv", "convidar"],
 description: "Mostra o link de invite do bot",
 category: "Geral",
 usage: "invite",

run: async (client, message, args) => {
try {
const embed = new Discord.MessageEmbed()
  .setTitle("Convide o Bot")
  .setColor('RANDOM')
  .addField("Convide Para o Servidor Discord", "[Convide o bot aqui (recomendado!)](" + `${cnf.website}` + "/authorize) \n[Convide o bot aqui (normal)](https://discordapp.com/oauth2/authorize/?permissions=8&scope=bot&client_id=" + `${client.user.id})`)
  .addField("Website", `[Visit webiste](${cnf.website})`)
  .addField("Servidor", `[Join to official server](${cnf.server})`)
  .setFooter("Bot criado por " + `${cnf.author}`)
  .setTimestamp()
message.author.send(embed)

message.channel.send({embed: {
            color: 3447003,
            description: "Verifique as DMs."
        }})
} catch (err) {
    message.channel.send({embed: {
                color: 16734039,
                description: "Algo deu errado... :cry:"
            }})
        }
    }
}




