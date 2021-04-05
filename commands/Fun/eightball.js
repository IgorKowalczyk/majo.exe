const Discord = require("discord.js");
const config = require("../../config");
const prefix = config.prefix;

module.exports = {
 name: "eightball",
 aliases: ["8ball", "fortune"],
 description: "Diz-lhe uma fortuna",
 category: "Diversão",
 usage: "eightball <question>",
 run: async (client, message, args) => {
  try {
   if (!args.length) return message.channel.send({embed: {
    color: 16734039,
    description: "Você precisa inserir a pergunta :/"
   }})
   const fortunes = ["Sim.", "É certo.", "É decididamente assim.", "Sem dúvida.", "Sim, definitivamente.", "Pode confiar nisso.", "A meu ver, sim.","Provavelmente.","Outlook bom.","Os sinais apontam para sim.","Resposta nebulosa, tente novamente.","Pergunte novamente mais tarde.","Melhor não dizer agora...","Não é possível prever agora.","Concentre-se e pergunte novamente.","Não conte com isso.","Minha resposta é não.","Minhas fontes dizem que não.","O Outlook não é tão bom ...", "Muito duvidoso.",];  
   await message.channel.send({embed: {
    color: 3447003,
    description: fortunes[Math.floor(Math.random()*fortunes.length)]
   }})
  } catch(err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Algo deu errado... :cry:"
   }})
  }
 }
}
