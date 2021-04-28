const Discord = require("discord.js");
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "flatearth",
 aliases: [],
 description: "Demonstrates that the earth really is flat",
 category: "Fun",
 usage: "flatearth",
 run: async (client, message, args) => {
  try {
   const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("If the earth isn\'t flat, explain this:")
	.setImage('https://media1.tenor.com/images/462b6d76beee0f9501d20535dae9c00b/tenor.gif?itemid=13792633')
    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    .setTimestamp()
   message.channel.send(embed);
  } catch (err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
