/*const Discord = module.require("discord.js");
const config = require("../../config");
const prefix = config.prefix;

module.exports = {
 name: "ban",
 aliases: ["banir"],
 description: "Bane um membro",
 category: "Moderação",
 usage: "ban <mention> <reason>",
 run: async (client, message, args) => {
  try {
   if (message.member.hasPermission("BAN_MEMBERS")) {
    let mentioned = await message.mentions.members.first();
    let reason = await args.slice(1).join(' ');
    if (!mentioned) {
     return await message.channel.send({embed: {
      color: 16734039,
      description: "Mencione um membro válido!"
     }})
    }
    if (!mentioned.bannable) {
     return await message.channel.send({embed: {
      color: 16734039,
      description: "Você não pode banir este membro!"
     }})  
    }
    if (message.author === mentioned) {
     return await message.channel.send({embed: {
      color: 16734039,
      description: "Você não pode se banir!"
     }})
    }
    if (!reason) {
     reason = "Nenhum motivo fornecido!";
    }
    message.guild.members.ban(mentioned, { reason: reason });
    const ban = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setTitle(":white_check_mark: Sucesso!", message.guild.iconURL({ dynamic: true, format: 'png'}))
     .setDescription(":no_entry: " + mentioned.displayName + " foi banido!")
     .setTimestamp()
     .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    message.channel.send(ban);
   } 
  } catch(err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Algo deu errado... :cry:"
   }})
  }
 }
}*/

const Discord = require('discord.js');
const customisation = require('../../customisation.json');
module.exports = {
    name: "ban",
    aliases: ["banir"],
    description: "Bane um membro",
    category: "Moderação",
    usage: "ban <mention> <reason>",
run: (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.channel.send({embed: {
    color: 16734039,
    description: "Mencione um membro válido!"
   }}).catch(console.error);
  if (message.mentions.users.first().id === message.author.id) return message.channel.send({embed: {
    color: 16734039,
    description: `Você não pode se banir! <a:7_Facepalm:828381097104113709>`
   }});
  if (user.id === client.user.id) return message.channel.send(`Você não pode se banir! <a:7_Facepalm:828381097104113709>`);
  if (message.mentions.users.first().id === "506505845215985674") return message.channel.send({embed: {
    color: 16734039,
    description: "Você não pode banir meu desenvolvedor :wink:"
   }});
  if (reason.length < 1) reason = {embed: {
    color: 16734039,
    description: 'Nenhuma razão fornecida.'
   }};
  let botRolePossition = message.guild.member(client.user).roles.highest.position;
  let rolePosition = message.guild.member(user).roles.highest.position;
  let userRolePossition = message.member.roles.highest.position;
  if (userRolePossition <= rolePosition) return message.channel.send("❌**Erro:** Não pode Banir esse membro porque ele têm cargos mais altos ou iguais a você.")
  if (botRolePossition <= rolePosition) return message.channel.send("❌**Erro:** Não pode Banir esse membro porque ele têm cargos mais altos ou iguais a mim.")
  if (!message.guild.member(user).bannable) {
    message.channel.send(`:redTick: Não consigo proibir esse membro. Meu cargo pode não ser alto o suficiente ou é um erro interno.`);
    return
  }else{
    const embed = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .addField('Action:', 'Ban')
    .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason)
    //.setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }));
    //let obj = JSON.parse(`{"days":7, "reason": ${reason}}`)
    if(user.bot) return;
    message.mentions.users.first().send({embed}).catch(e =>{
      if(e) return
    });
    message.guild.members.ban(user.id, {days:7, reason: reason})
    let logchannel = message.guild.channels.cache.find(x => x.name = 'logs');
    if  (!logchannel){
    message.channel.send({embed})
    }else{
      client.channels.cache.get(logchannel.id).send({embed});
      message.channel.send({embed})
    } 
    if(user.bot) return;
    message.mentions.users.first().send({embed}).catch(e =>{
      if(e) return 
    });
  }
}
};

  exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["bigyeet"],
  permLevel: 2
};

exports.help = {
  name: 'ban',
  description: 'Bans the mentioned user.',
  usage: 'ban [mention] [reason]'
};
