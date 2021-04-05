const Discord = require('discord.js');
const config = require("../../config");
const prefix = config.prefix;

module.exports = async (client, message) => {
 try {
  const queue = new Map();
  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) {
   const embed = new Discord.MessageEmbed()
    .setTitle(`<a:sucess:759354039242063903> Hi!`, message.guild.iconURL())
    .setColor('RANDOM')
    .setDescription("Eu fui marcado por você, aqui estou eu - " + client.user.username + "! Meu prefixo é \`" + prefix + "\` Para ver todos os meus comandos, por favor digite \`" + prefix + "help\`")
    .setTimestamp()
    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
   message.channel.send(embed);
  }

  if (!message.content.startsWith(prefix)) return;
  if (!message.member) message.member = await message.guild.fetchMember(message);
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (!command) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Esse comando não existe, dê uma olhada em " + `${prefix}` + "help!"
   }});
  }

  if (command) {
   command.run(client, message, args);
  }
 } catch (err) {
  console.log(err);
  message.channel.send({embed: {
   color: 16734039,
   description: `<a:nao:789200797794959371> | Erro`,
   fields: [
       {
       name: "Algo deu Ruim",
       value: err
   },
   {
       name: "Por favor contate o dono do bot",
       value: "João Victor#0001"
   },
   {
       name: "Servidor Oficial do bot e do João Victor Player",
       value: "[Entre Já](https://invite.gg/joao_victor_player)"
   }
]
  }});
 }
}
