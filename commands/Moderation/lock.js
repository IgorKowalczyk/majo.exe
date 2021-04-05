const { userAgent } = require("booru/dist/Constants");
const Discord = require("discord.js");
const config = require("../../config.js")
 
module.exports = {
    name: "lock",
    aliases: ["trancar", "travar"],
    description: "tranca o canal",
    category: "Moderação",
    usage: "lock",
run: async (client, message, args) => {
 
  let luis = args.slice(" ").join(" ")
  if(!luis) luis = "Motivo não Informado"
      let avatar = message.author.avatarURL({ dynamic: true, format: "gif", size: 1024 });
            if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        const embed = new Discord.MessageEmbed()
        .setDescription(`${message.author}, Você requer permissão **GERENCIAR CANAL**`)
        return message.channel.send(embed);
      }
    message.delete();
    message.channel.createOverwrite(message.guild.id, {
        SEND_MESSAGES: false,
        VIEW_CHANNEL: true
    })
    const embed = new Discord.MessageEmbed()
    .setTitle(`${message.author.username}#${message.author.discriminator} | Lock`)
    .setDescription(``)
    .addField('Destrancar:', `\`${config.prefix}unlock\``, true)
    .addField('Trancado Por:', `${message.author}`, true)
    .addField('Motivo:', luis)
    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    .setTimestamp()
    .setThumbnail(avatar)
    .setColor('#8A11C1')
    message.channel.send(embed);
          
}
}