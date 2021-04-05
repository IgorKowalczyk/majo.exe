const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const config = require("../../config");
const prefix = config.prefix;

module.exports = {
 name: "daily",
 aliases: ["d"],
 description: "Obter sonhos diários",
 category: "Economia",
 usage: "daily",
 run: async (client, message, args) => {
  try {
   let user = message.author;
   let timeout = 86400000;
   let amount = 200;
   let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);
   if (daily !== null && timeout - (Date.now() - daily) > 0) {
    let time = ms(timeout - (Date.now() - daily));
    const timeEmbed = new Discord.MessageEmbed()
     .setTitle("Error!", message.guild.iconURL({ dynamic: true, format: 'png'}))
     .setColor(16734039)
     .setDescription(`Você já coletou sua recompensa diária\nRecolha-a novamente em ${time.hours}h ${time.minutes}m ${time.seconds}s `)
     .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
     message.channel.send(timeEmbed)
   } else {
     const moneyEmbed = new Discord.MessageEmbed()
     .setTitle("Succes!", message.guild.iconURL({ dynamic: true, format: 'png'}))
     .setColor("RANDOM")
     .setDescription(`:white_check_mark: Você coletou sua recompensa diária de ${amount} Sonhos`)
     .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    message.channel.send(moneyEmbed)
    db.add(`money_${message.guild.id}_${user.id}`, amount)
    db.set(`daily_${message.guild.id}_${user.id}`, Date.now())
   }
  } catch (err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Algo deu errado... :cry:"
   }})
  }
 }
}
