const Discord = module.require("discord.js");
const config = require("../../config");
const prefix = config.prefix;

module.exports = {
 name: "prune",
 aliases: ["clear", "p", "c"],
 description: "Remove até 100 mensagens",
 category: "Moderação",
 usage: "prune <amount>",
 run: async (client, message, args) => {
  try {
   if (!message.member.hasPermission("MANAGE_MESSAGES") || !message.member.hasPermission("ADMINISTRATOR")) {
    let error = new Discord.MessageEmbed()
     .setColor("FF5757")
     .setDescription("Você não tem permissão para remover mensagens!")
     .setFooter("Esta mensagem será excluída após 3 segundos", message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    message.channel.send(error).then(m => m.delete({timeout: 3000}))
    return message.delete({timeout: 3000})
   }
   if (isNaN(args[0])) {
    let error = new Discord.MessageEmbed()
     .setColor("FF5757")
     .setDescription("Por favor insira um número válido!")
     .setFooter("Esta mensagem será excluída após 3 segundos", message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    message.channel.send(error).then(m => m.delete({timeout: 3000}))
    return message.delete({timeout: 3000})
   }
   if (args[0] > 100) {
    let error = new Discord.MessageEmbed()
     .setColor("FF5757")
     .setDescription("Insira o número menor que 100!")
     .setFooter("Esta mensagem será excluída após 3 segundos", message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    message.channel.send(error).then(m => m.delete({timeout: 3000}))
    return message.delete({timeout: 3000})
   }
   if (args[0] < 2) {
    let error = new Discord.MessageEmbed()
     .setColor("FF5757")
     .setDescription("Insira o número mais de 1!")
     .setFooter("Esta mensagem será excluída após 3 segundos", message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    message.channel.send(error).then(m => m.delete({timeout: 3000}))
    return message.delete({timeout: 3000})
   }
   await message.delete()
   await message.channel.bulkDelete(args[0])
   .then(messages => {
    let error = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setTitle(":white_check_mark: Successo!", message.guild.iconURL({ dynamic: true, format: 'png'}))
     .setDescription(":wastebasket: Deletedas " + `${messages.size}/${args[0]}` + " mensagems.")
     .setFooter("Esta mensagem será excluída após 3 segundos", message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    return message.channel.send(error).then(m => m.delete({timeout: 3000}))
   })
  } catch(err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Algo deu errado... :cry:"
  }})
  console.log(err)
  }
 }
}
