const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../../config");
const prefix = config.prefix;

module.exports = {
 name: "addmoney",
 aliases: ["addsonhos", "as"],
 description: "Adiciona sonhos ao usuário mencionado",
 category: "Economia",
 usage: "addmoney <user> <money>",
 run: async (client, message, args) => {
  try {
   if (message.author.id !== "506505845215985674") {
    let user = message.mentions.members.first();
    if (!user) return message.channel.send({embed: {
     color: 16734039,
     description: "Você deve mencionar alguém para adicionar dinheiro!"
    }})
    if (isNaN(args[1])) return message.channel.send({embed: {
     color: 16734039,
     description: "Você deve inserir a quantia de dinheiro para adicionar!"
    }})
    const negative = new Discord.MessageEmbed()
     .setColor("FF5757")
     .setDescription(`Você não pode depositar dinheiro negativo`);
    if (message.content.includes('-')) { 
     return message.channel.send(negative).catch(err => console.log(err))
    }
    db.add(`money_${message.guild.id}_${user.id}`, args[1])
    let bal = await db.fetch(`money_${message.guild.id}_${user.id}`)
    let moneyEmbed = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setTitle(":white_check_mark: Sucesso!", message.guild.iconURL({ dynamic: true, format: 'png'}))
     .setDescription(`:money_with_wings: Adicionado \`${args[1]}\` sonhos\n:moneybag: novo saldo total: \`${bal}\``)
     .setTimestamp()
     .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
     message.channel.send(moneyEmbed)
   } else {
    message.channel.send({embed: {
     color: 16734039,
     description: "Você não tem permissão para executar este comando (apenas o dono do bot pode executá-lo)!"
    }})
   }
  } catch(err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Algo deu errado... :cry:"
   }})
  }
 }
}
