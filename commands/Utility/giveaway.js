const Discord = require("discord.js");
const ms = require("ms");
const config = require("../../config");
const prefix = config.prefix;

module.exports = {
 name: "giveaway",
 aliases: [],
 description: "Cria um giveaway",
 category: 'Utilidades',
 usage: "giveaway <Hora> <Canal> <Prêmio>",
 run: async (client, message, args) => {
  try {
   if (!args[0]) {
    return message.channel.send({embed: {
     color: 16734039,
     title: "Você não especificou o tempo!",
     description: "Formatação correta: \`number<d/h/m>\`.\nLegend: \`d\` - Day, \`h\` - Hour/s, \`m\` - Minute/s"
    }})
   }
   if (!args[0].endsWith("d") && !args[0].endsWith("h") && !args[0].endsWith("m")) {
    return message.channel.send({embed: {
     color: 16734039,
     title: "Você não usou a formatação correta para o tempo!",
     description: "Formatação correta: \`number<d/h/m>\`.\nLegend: \`d\` - Day, \`h\` - Hour/s, \`m\` - Minute/s"
    }})
   }
   if (isNaN(args[0][0])) {
    return message.channel.send({embed: {
     color: 16734039,
     title: "Você não especificou o tempo!",
     description: "Formatação correta: \`number<d/h/m>\`.\nLegend: \`d\` - Day, \`h\` - Hour/s, \`m\` - Minute/s"
    }})
   }
   let channel = message.mentions.channels.first();
   if (!channel) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "Você deve fornecer um canal na guilda para criar sorteios!"
    }})
   }
   let prize = args.slice(2).join(" ");
   if (!prize) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "Nenhum prêmio especificado!"
    }})
   }
   const endembed = new Discord.MessageEmbed()
    .setTitle(":tada: GIVEAWAY ENDED! :tada:")
    .setDescription("O sorteio pelo prêmio de **" + `${prize}` + "** terminou!")
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter("Requested by " + `${message.author.username}` + " O sorteio terminou em", message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }));
   const success = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(":white_check_mark: Successo!", message.guild.iconURL({ dynamic: true, format: 'png'}))
    .setDescription(":tada: Giveaway criado no " + `${channel}` + "!")
    .setFooter("Esta mensagem será excluída após 10 segundos", message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
   message.channel.send(success).then(m => m.delete({timeout: 10000}))
   const embed = new Discord.MessageEmbed()
    .setTitle(":tada: New giveaway! :tada:", message.guild.iconURL({ dynamic: true, format: 'png'}))
    .setDescription("O usuário" + `${message.author}` + "está hospedando um sorteio para o prêmio de **" + `${award}` + "**\n*Reaja a esta mensagem com :tada: emoji para entrar no sorteio!*")
    .setTimestamp(Date.now() + ms(args[0]))
    .setFooter("Requested by " + `${message.author.username}` + " • O sorteio vai acabar em " + `${args[0]}` + "!", message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    .setColor("RANDOM");
   let m = await channel.send(embed)
   m.react("🎉")
   setTimeout(() => {
    m.edit(endembed);
    if (m.reactions.cache.get("🎉").count <= 1) {
    return channel.send({embed: {
     color: 16734039,
     description: "Poucas pessoas reagiram para que eu iniciasse o sorteio de um vencedor! (" + `${m.reactions.cache.get("🎉").count}` + " reactions)",
    }})
    }
    let winner = m.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot).random();
    const end = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setDescription(":tada: O vencedor do sorteio para **" + `${prize}` + "** é " + `${winner}` + "! :tada:")
    return channel.send(end);
   }, ms(args[0]));
  } catch (err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
