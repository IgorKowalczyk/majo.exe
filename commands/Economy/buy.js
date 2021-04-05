const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const config = require("../../config");
const prefix = config.prefix;

module.exports = {
 name: "buy",
 aliases: ["comprar"],
 description: "Comprar item da loja, adicionar um argumento 'lista' para exibir todas as coisas",
 category: "Economia",
 usage: "buy <item>",
 run: async (client, message, args) => {
  try {
   let user = message.author;
   let author = db.fetch(`money_${message.guild.id}_${user.id}`)
   if (args[0] == 'bronze') {
    if (author < 3500) {
     const bronzeerror = new Discord.MessageEmbed()
      .setTitle("Error!", message.guild.iconURL({ dynamic: true, format: 'png'}))
      .setColor(16734039)
      .setDescription(`Você precisa de 3500 sonhos para comprar VIP Bronze`)
      .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
     return message.channel.send(bronzeerror);
    }
    db.fetch(`bronze_${message.guild.id}_${user.id}`);
    db.set(`bronze_${message.guild.id}_${user.id}`, true)
    const bronzesuccess = new Discord.MessageEmbed()
     .setTitle("Succes!", message.guild.iconURL({ dynamic: true, format: 'png'}))
     .setColor("RANDOM")
     .setDescription(`:white_check_mark: VIP Bronze adquirido por 3500 Sonhos`)
     .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    db.subtract(`money_${message.guild.id}_${user.id}`, 3500)
    message.channel.send(bronzesuccess)
   // -------- \\
   } else if(args[0] == 'nikes') {
    if (author < 600) {
     const nikeserror = new Discord.MessageEmbed()
      .setTitle("Error!", message.guild.iconURL({ dynamic: true, format: 'png'}))
      .setColor(16734039)
      .setDescription(`Você precisa de 600 sonhos para comprar alguns Nikes`)
      .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
     return message.channel.send(nikeserror);
    }
    db.fetch(`nikes_${message.guild.id}_${user.id}`)
    db.add(`nikes_${message.guild.id}_${user.id}`, 1)
    const nikessuccess = new Discord.MessageEmbed()
     .setTitle("Succes!", message.guild.iconURL({ dynamic: true, format: 'png'}))
     .setColor("RANDOM")
     .setDescription(`:white_check_mark:  Nikes frescos comprados por 600 Sonhos`)
     .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    db.subtract(`money_${message.guild.id}_${user.id}`, 600)
    message.channel.send(nikessuccess)
    // -------- \\
   } else if(args[0] == 'carro') {
    if (author < 800) {
     const carerror = new Discord.MessageEmbed()
     .setTitle("Error!", message.guild.iconURL({ dynamic: true, format: 'png'}))
     .setColor(16734039)
     .setDescription(`Você precisa de 800 sonhos para comprar um carro novo`)
     .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
     return message.channel.send(carerror);
    }
    db.fetch(`car_${message.guild.id}_${user.id}`)
    db.add(`car_${message.guild.id}_${user.id}`, 1)
    const carsuccess = new Discord.MessageEmbed()
     .setTitle("Succes!", message.guild.iconURL({ dynamic: true, format: 'png'}))
     .setColor("RANDOM")
     .setDescription(`:white_check_mark:  Comprou um carro novo por 800 Sonhos`)
     .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    db.subtract(`money_${message.guild.id}_${user.id}`, 800)
    message.channel.send(carsuccess)
    // -------- \\
   } else if(args[0] == 'mansão') {
    if (author < 1200) {
     const mansionerror = new Discord.MessageEmbed()
      .setTitle("Error!", message.guild.iconURL({ dynamic: true, format: 'png'}))
      .setColor(16734039)
      .setDescription(` Você precisa de 1200 sonhos para comprar uma mansão`)
      .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
     return message.channel.send(mansionerror);
    }
    db.fetch(`house_${message.guild.id}_${user.id}`)
    db.add(`house_${message.guild.id}_${user.id}`, 1)
    const mansionsuccess = new Discord.MessageEmbed()
     .setTitle("Succes!", message.guild.iconURL({ dynamic: true, format: 'png'}))
     .setColor("RANDOM")
     .setDescription(`:white_check_mark: Comprou uma mansão por 1200 Sonhos`)
     .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    db.subtract(`money_${message.guild.id}_${user.id}`, 1200)
    message.channel.send(mansionsuccess)
   // -------- \\
	 } else if(args[0] == 'lista') {
    const list = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setTitle("Lista de todos os itens que você precisa comprar:")
     .addField("Bronze", "Cost: 3500 coins")
	   .addField("Nikes", "Cost: 600 coins")
  	 .addField("Carro", "Cost: 800 coins")
		 .addField("Mansão", "Cost: 1200 coins")
    message.channel.send(list)
   // -------- \\
   } else {
    const noitem = new Discord.MessageEmbed()
     .setColor("FF5757")
     .setTitle("Insira um item para comprar, digite `" + `${prefix}` + "comprar lista` para mostrar todas as coisas")
    message.channel.send(noitem)
   }
 } catch (err) {
  message.channel.send({embed: {
   color: 16734039,
   description: "Algo deu errado... :cry:"
  }})
 }
 }
}
