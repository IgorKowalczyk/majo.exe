const Discord = require("discord.js");
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "eightball",
 aliases: ["8ball", "fortune"],
 description: "Tells you a fortune",
 category: "Fun",
 usage: "eightball <question>",
 run: async (client, message, args) => {
  try {
   if (!args.length) return message.channel.send({embed: {
    color: 16734039,
    description: "You need to enter question :/"
   }})
   const fortunes = ["Yes.", "It is certain.", "It is decidedly so.", "Without a doubt.", "Yes definelty.", "You may rely on it.", "As I see it, yes.", "Most likely.", "Outlook good.", "Signs point to yes.", "Reply hazy, try again.", "Ask again later.", "Better not tell you now...", "Cannot predict now.", "Concentrate and ask again.", "Don't count on it.", "My reply is no.", "My sources say no.", "Outlook not so good...", "Very doubtful.",];  
   await message.channel.send({embed: {
    color: 3447003,
    description: fortunes[Math.floor(Math.random()*fortunes.length)]
   }})
  } catch(err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
