const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (client, message, args) => { 
  let user = message.mentions.members.first() 

  let member = db.fetch(`money_${message.guild.id}_${message.author.id}`)

  let embed1 = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`:x: Mention someone to pay`);

  if (!user) {
      return message.channel.send(embed1)
  }
  let embed2 = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`:x: Specify an amount to pay`);
  
  if (!args[1]) {
      return message.channel.send(embed2)
  }

    if (isNaN(args[1])) return message.channel.send({embed: {
                    color: 16734039,
                    description: "You must enter the amount of money to pay!"
                }})

  let embed3 = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`:x: You can't pay someone negative money`);

  if (message.content.includes('-')) { 
      return message.channel.send(embed3)
  }
  let embed4 = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`:x: You don't have that much money`);

  if (member < args[1]) {
      return message.channel.send(embed4)
  }

  let embed5 = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`:white_check_mark:  You have payed ${user.user.username} ${args[1]} coins`);

  message.channel.send(embed5)
  db.add(`money_${message.guild.id}_${user.id}`, args[1])
  db.subtract(`money_${message.guild.id}_${message.author.id}`, args[1])

}

module.exports.help = {
    name: "pay",
    description: "Pay money to mentioned user",
    usage: "pay <mention> <money>",
    type: "Economy"  
}
