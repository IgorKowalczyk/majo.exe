const Discord = require("discord.js");
const fetch = require("node-fetch");
const config = require("../../config");
const prefix = config.prefix;

module.exports = {
 name: "hug",
 aliases: ["cuddle", "abraçar", "abraço"],
 description: "Dê um abraço para mencionar o usuário",
 category: "Diversão",
 usage: "cuddle <user>",
 run: async (client, message, args) => {
  (async () => {
   try {
    const user = message.mentions.users.first();
    if(!user) {
     return message.channel.send({embed: {
      color: 16734039,
      description: "Você deve mencionar alguém para abraçar!"
     }})
    }
    if(user == message.author) {
     return message.channel.send({embed: {
      color: 5294200,
      description: "Você não pode se abraçar, mas... Ok, pegue o abraço de mim ＼( ^o^ )／ !"
     }})
    }
    if(user == client.user) {
     return message.channel.send({embed: {
      color: 5294200,
      description: "Oh, você tentou me abraçar mas você não pode ... Mas eu posso te abraçar ＼( ^o^ )／"
     }})
    }
    const response = await fetch("https://nekos.life/api/v2/img/cuddle")
    const body = await response.json();
    const embed = new Discord.MessageEmbed()
     .setTitle(user.username + " Acabei de receber um abraço de " + message.author.username, message.guild.iconURL({ dynamic: true, format: 'png'}))
     .setImage(body.url)
     .setURL(body.url)
     .setColor("RANDOM")
     .setDescription((user.toString() + " recebeu um abraço de " + message.author.toString()))
     .setFooter("Requested by " + `${message.author.username}` + " • (this is so cute ＼( ^o^ )／)", message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
     .setTimestamp()
    .setURL(body.url);
    message.channel.send(embed);
   } catch(err) {
    message.channel.send({embed: {
     color: 16734039,
     description: "Algo deu errado... :cry:"
    }})
   }
  })();
 }
}
