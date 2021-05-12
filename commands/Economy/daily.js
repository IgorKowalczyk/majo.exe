const Discord = require("discord.js");

module.exports = {
 name: "daily",
 aliases: [],
 description: "Get a daily money",
 category: "Economy",
 usage: "daily",
 run: async (client, message, args) => {
  try {
   let amount = Math.floor(Math.random() * 500) + 100;
   let add = await client.economy.daily(message.author.id, message.guild.id, amount);
   if (add.cooldown) return message.reply(`You already claimed your daily coins. Come back after ${add.time.days} days, ${add.time.hours} hours, ${add.time.minutes} minutes & ${add.time.seconds} seconds.`);
   return message.reply(`you claimed ${add.amount} as your daily coins and now you have total ${add.money} coins.`);
  } catch (err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
