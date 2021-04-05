const Discord = require('discord.js');
const { readdirSync } = require('fs');
const config = require("../../config");
const prefix = config.prefix;

module.exports = {
 name: "help",
 aliases: ["h", "commands"],
 category: "General",
 description: "Displays all the commands available",
 usage: "help [command]",
 run: async (client, message, args) => {
  try {
   if (args[0]) {
    return getCMD(client, message, args[0]);
   }
   if(!args[0]) {
    return getAll(client, message);
   }
   function getAll(client, message) {
   const commands = readdirSync('./commands/');
   const cmd = readdirSync('./commands/');
   const embed = new Discord.MessageEmbed()
    .setAuthor("Ajuda", message.guild.iconURL())
    .setColor("RANDOM")
    .setTimestamp()
    let categories;
    categories = [...new Set(client.commands.map(cmd => cmd.category))];
    for (const id of categories) {
     const category = client.commands.filter(cmd => cmd.category === id);
     if (id == "Geral") {
      var icon = ":bricks:";
     }
     if (id == "Moderação") {
      var icon = ":hammer:";
     }
     if (id == "Diversão") {
      var icon = ":rofl:";
     }
     if (id == "Musica") {
      var icon = ":notes:";
     }
     if (id == "Economia") {
      var icon = ":moneybag:";
    }
    if (id == "Dono") {
      var icon = ":crown:";
     }
     if (id == "Utilidades") {
      var icon = ":toolbox:";
     }
     if (!id) {
      var icon = ":grey_question:";
     }
     embed.addField(`${icon} ${id} (${category.size})`, category.map(cmd => `${cmd.name}`).join(', '));
    }
    embed.addField(":grey_question: Informações do comando", `${prefix}help <command>`);
    if(config.news && config.newstitle) {
    embed.addField(`${config.newstitle}`, `${config.news}`);
    }
    embed.setFooter("Requested by " + `${message.author.username}` + " • " + `${client.commands.size}` + " Comandos", message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    return message.channel.send(embed);
   }

   function getCMD(client, message, input) {
    const embed = new Discord.MessageEmbed();
    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));
    const info = "Nenhuma informação encontrada para o comando `" + input.toLowerCase() + "`!";
    if (!cmd) {
     try {
      return message.channel.send({embed: {
       color: 16734039,
       description: info
     }})
     } catch (err) {
       message.channel.send({embed: {
      color: 16734039,
      description: "Nenhuma informação encontrada"
     }})
     }
    } else {
     function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
     }
     alliaseslist = cmd.aliases.toString() || "None";
     const hembed = new Discord.MessageEmbed()
      .setTitle(`:grey_question: Ajuda - ${cmd.name} comando`, message.guild.iconURL())
      .setColor('RANDOM')
      .setTimestamp()
      .setDescription("Categoria: `" + cmd.category + "`\n Descrição: `" + cmd.description + "`\n Uso: `" + prefix + " " + cmd.usage + "`\n Aliases: `" + alliaseslist + "`")
      .setFooter('Syntax: <> = required, [] = optional • Requested by ' + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
     message.channel.send(hembed);
    }
   }
  } catch (err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Algo deu errado... :cry:"
   }})
  }
 }
}
