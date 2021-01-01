const Discord = require("discord.js");
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "beep",
 aliases: [],
 description: "Beep-Boop!",
 category: "Fun",
 usage: "beep",
 run: async (client, message, args) => {
  const embed = new Discord.MessageEmbed()
   .setColor('RANDOM')
   .setDescription("Boop!")
  message.channel.send(embed);
 }
}
