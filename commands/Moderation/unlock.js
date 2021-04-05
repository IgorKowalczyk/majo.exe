const { userAgent } = require("booru/dist/Constants");
const Discord = require("discord.js");
const config = require("../../config.js")
 
module.exports = {
    name: "unlock",
    aliases: ["destrancar", "destravar"],
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
        SEND_MESSAGES: true,
        VIEW_CHANNEL: true
    })
    const embed = new Discord.MessageEmbed()
    .setTitle(`${message.author.username}#${message.author.discriminator} | UnLock`)
    .setDescription(``)
    .addField('Trancar:', `\`${config.prefix}lock\``, true)
    .addField('Destrancado Por:', `${message.author}`, true)
    .setTimestamp()
    .setThumbnail(avatar)
    .setColor('#8A11C1')
    message.channel.send(embed);
          
}
}