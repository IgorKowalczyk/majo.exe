const Discord = require('discord.js')
const cooldown = new Set()

module.exports.run = (client, message, args) => {

  if (cooldown.has(message.author.id)) {
    let cooldownemb = new Discord.RichEmbed()
    .setAuthor(`${message.author.username} Cooldown..`, message.author.displayAvatarURL)
    .setDescription(`You need to wait 5 seconds!`)
    .setColor(`RED`)
    .setFooter(`This message will be deleted in 5 seconds..`)
    return message.channel.send(cooldownemb).then(message => {
     message.delete(5000) 
    })

    }
    cooldown.add(message.author.id);

    setTimeout(() => {
        cooldown.delete(message.author.id);
    }, 10000);
 let m421 = args.join(" ");
  if (!m421) return  message.channel.send({embed: {
                color: 16734039,
                description: "Please enter a waifu name!"
            }})
  if (m421.length > 30) return  message.channel.send({embed: {
                color: 16734039,
                title: "I can't rate your waifu. Max name length is 30"
            }})
  let result = Math.floor((Math.random() * 100) + 0);

    const happyrate = new Discord.RichEmbed()
  .setDescription(`I would rate **${m421}** ${result}/100 ?`)
  .setColor(`GREEN`)

      const sadembed = new Discord.RichEmbed()
  .setDescription(`I would rate **${m421}** ${result}/100 ??`)
  .setColor(`GREEN`)

        const idkembed = new Discord.RichEmbed()
  .setDescription(`I would rate **${m421}** ${result}/100 ??`)
  .setColor(`GREEN`)

      const shrugembed = new Discord.RichEmbed()
  .setDescription(`I would rate **${m421}** ${result}/100 ??`)
  .setColor(`GREEN`)

          const okembed = new Discord.RichEmbed()
  .setDescription(`I would rate **${m421}** ${result}/100 ??`)
  .setColor(`GREEN`)

const thumbupembed = new Discord.RichEmbed()
  .setDescription(`I would rate **${m421}** ${result}/100 ??`)
  .setColor(`GREEN`)

const eyesembed = new Discord.RichEmbed()
  .setDescription(`I would rate **${m421}** ${result}/100 ??`)
  .setColor(`GREEN`)

  if (result > 90) return message.channel.send(happyrate)
  if (result < 30) return message.channel.send(sadembed)
  if (result > 40) return message.channel.send(idkembed)
  if (result > 50) return message.channel.send(shrugembed)
  if (result > 60) return message.channel.send(okembed)
  if (result > 70) return message.channel.send(thumbupembed)
  if (result > 80) return message.channel.send(eyesembed)
} 

module.exports.help = {
    name: "ratewaifu",
    description: "Rate a waifu",
    usage: "ratewaifu <name> <points>",
    type: "Fun" 
}