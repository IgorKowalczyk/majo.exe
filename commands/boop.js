const Discord = require("discord.js");
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "boop",
 aliases: [],
 description: "Boop-Beep!",
 category: "Fun",
 usage: "boop",
 run: async (client, message, args) => {
  const embed = new Discord.MessageEmbed()
   .setColor('RANDOM')
   .setDescription("Beep!")
  message.channel.send(embed);
 }
}
