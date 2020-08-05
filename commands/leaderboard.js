const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (client, message, args) => {
    const embed = new Discord.RichEmbed()
    .setDescription(`**Input a Leaderboard Option**\n\nCoin Leaderboard: !majo leaderboard coins\nFresh Nikes Leaderboard: !majo leaderboard nikes\nCar Leaderboard: !majo leaderboard car\nMansion Leaderboard: !majo leaderboard mansion`)
    .setColor("#FFFFFF")


  if(!args[0]) return message.channel.send(embed)

    if (args[0] == 'coins') {
    let money = db.fetch(`money_${message.guild.id}`)
    let content = "";

    for (let i = 0; i < money.length; i++) {
        let user = client.users.get(money[i].ID.split('_')[2]).username

      

        content += `${i+1}. ${user} ~ ${money[i].data}\n`
    
      }

    const embed = new Discord.RichEmbed()
    .setDescription(`**${message.guild.name}'s Coin Leaderboard**\n\n${content}`)
    .setColor("#FFFFFF")

    message.channel.send(embed)
  } else if(args[0] == 'nikes') {
    let nike = db.fetch(`nikes_${message.guild.id}`, { sort: '.data'})
    let content = "";

    for (let i = 0; i < nike.length; i++) {
        let user = client.users.get(nike[i].ID.split('_')[2]).username

        content += `${i+1}. ${user} ~ ${nike[i].data}\n`
    }

    const embed = new Discord.RichEmbed()
    .setDescription(`**${message.guild.name}'s Fresh Nikes Leaderboard**\n\n${content}`)
    .setColor("#FFFFFF")

    message.channel.send(embed)
  } else if(args[0] == 'car') {
    let cars = db.fetch(`car_${message.guild.id}`, { sort: '.data'})
    let content = "";

    for (let i = 0; i < cars.length; i++) {
        let user = client.users.get(cars[i].ID.split('_')[2]).username

        content += `${i+1}. ${user} ~ ${cars[i].data}\n`
    }

    const embed = new Discord.RichEmbed()
    .setDescription(`**${message.guild.name}'s Car Leaderboard**\n\n${content}`)
    .setColor("#FFFFFF")

    message.channel.send(embed)
  } else if(args[0] == 'mansion') {
    let mansions = db.fetch(`house_${message.guild.id}`, { sort: '.data'})
    let content = "";

    for (let i = 0; i < mansions.length; i++) {
        let user = client.users.get(mansions[i].ID.split('_')[2]).username

        content += `${i+1}. ${user} ~ ${mansions[i].data}\n`
    }

    const embed = new Discord.RichEmbed()
    .setDescription(`**${message.guild.name}'s Mansion Leaderboard**\n\n${content}`)
    .setColor("#FFFFFF")

    message.channel.send(embed)
  }

}
module.exports.help = {
    name: "leaderboard",
    description: "Show server economy leaderboard",
    usage: "leaderboard <option>",
    type: "Economy" 
}