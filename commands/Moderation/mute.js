const Discord = require('discord.js');
const customisation = require('../../customisation.json');
module.exports = {
    name: "mute",
    aliases: ["mutar", "unmute", "desmutar"],
    usage: "un/mute [usuário] [rasão]",
    commandCategory: "Moderação",
    cooldownTime: '5',
    enabled: true,
    guildOnly: false,
    permLevel: 2,


run: async (client, message, args) => {
  let reason = args.slice(1).join(' ');
  if(!message.mentions.users.first())return message.reply("Por favor mencione alguém para silenciá-lo")
  let user = message.mentions.users.first();
  let muteRole = client.guilds.cache.get(message.guild.id).roles.cache.find(val => val.name === 'Muted');
  if(message.mentions.users.first().id === "242263403001937920") return message.reply('Você não pode me silenciar.:facepalm:')
  if(message.author.id === message.mentions.users.first()) return message.reply("Você não pode se silenciar :facepalm:");
  if (!muteRole) {
    try {
        muteRole = await message.guild.roles.create({ data: {
            name:"Muted",
            color: "#000000",
            permissions:[]
        }});

        message.guild.channels.cache.forEach(async (channel, id) => {
            await channel.createOverwrite(muteRole, {
                SEND_MESSAGES: false,
                MANAGE_MESSAGES: false,
                READ_MESSAGES: false,
                ADD_REACTIONS: false
            });
        });
    } catch(e) {
        console.log(e.stack);
    }
  }
  if (reason.length < 1) reason = 'Nenhuma razão fornecida';
  if (message.mentions.users.size < 1) return message.reply('Você deve mencionar alguém para silenciá-los.').catch(console.error);

  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) return message.reply(':x: Eu não tenho as permissões corretas.').catch(console.error);
  if (message.guild.member(user).roles.cache.has(muteRole.id)) {
    if(message.content.includes(`${config.prefix}mute`)) return message.reply("Esse usuário já foi silenciado")
    message.guild.member(user).roles.remove(muteRole).then(() => {
      const embed = new Discord.MessageEmbed()
      .setColor(0x00FFFF)
      .setTimestamp()
      .addField('Açao:', 'Unmute')
      .addField('Usuário:', `${user.username}#${user.discriminator} (${user.id})`)
      .addField('Moderador:', `${message.author.username}#${message.author.discriminator}`)
      .addField('Razão', reason)
      //.setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
      .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }));
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
    });
  } else {
    if(message.content.includes(`${config.prefix}unmute`)) return message.reply("Esse usuário não foi silenciado **ainda**")
    message.guild.member(user).roles.add(muteRole).then(() => {
      const embed = new Discord.MessageEmbed()
      .setColor(0x00FFFF)
      .setTimestamp()
      .addField('Açao:', 'Mute')
      .addField('Usuário:', `${user.username}#${user.discriminator} (${user.id})`)
      .addField('Moderador:', `${message.author.username}#${message.author.discriminator}`)
      .addField('Razão', reason)
      .setFooter(`© Cryptonix X Mod Bot by ${customisation.ownername}`);
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
    });
  }
}
};
