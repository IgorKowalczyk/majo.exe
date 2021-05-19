const Discord = require("discord.js");

module.exports = {
 name: "pepe",
 aliases: ["pp"],
 description: "Show user PP size",
 category: "Fun",
 usage: "pepe <user>",
 run: async (client, message, args) => {
  try {
   const user = message.mentions.author.first() || message.author; 
   const pepe = "8" + "=".repeat(Math.floor(Math.random() * 15)) + "D";
   const embed = new MessageEmbed()
    .setTitle(`Pepe :smirk:`, user.displayAvatarURL({ dynamic: true }))
    .setDescription(`${user}, you're Pepe is **${pepe}** long!`)
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
   message.channel.send(embed);
  } catch(err) {
    console.log(err)
    message.lineReply({embed: {
     color: 16734039,
     description: "Something went wrong... :cry:"
    }})
   }
  }
 }
  