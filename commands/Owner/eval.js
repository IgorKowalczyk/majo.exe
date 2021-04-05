const Discord = require("discord.js");
const beautify = require("beautify")
const config = require("../../config");
const prefix = config.prefix;

module.exports = {
 name: "eval",
 aliases: [],
 description: "Avalia e executa o código JavaScript",
 category: "Dono",
 usage: "eval <code>",
 run: async (client, message, args) => {
  try {
   if(message.author.id !== "506505845215985674") {
    return message.channel.send({embed: {
     color: 16734039,
     description: "Você não tem permissão para executar este comando (apenas o dono do bot pode executá-lo)!"
    }});
   }
   if(!args[0]) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "Por favor, coloque o código para avaliar!"
    }});
   }
   if (args.join(" ").toLowerCase().includes("token")) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "Você não pode usar isso (por razões de segurança)!"
    }});
   }
   if (args.join(" ").toLowerCase().includes("secret")) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "Você não pode usar isso (por razões de segurança)!"
    }});
   }
   if (args.join(" ").toLowerCase().includes("process.env")) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "Você não pode usar isso (por razões de segurança)!"
    }});
   }
   const toEval = args.join(" ")
   const evaluated = eval(toEval)
   const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .setTitle("Eval")
    .addField("Avaliar:", `\`\`\`js\n${beautify(args.join(" "), { format: "js"})}\n\`\`\``)
    .addField("Avaliado:", evaluated)
    .addField("Tipo de:", typeof(evaluated))
    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
   message.channel.send(embed);
  } catch (err) {
   const embed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setTitle("Erro!")
    .setDescription("**Codigo de Erro:** *" + err + "*")
    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    .setTimestamp()
   return message.channel.send(embed);
  }
 }
}
