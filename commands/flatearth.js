const Discord = require("discord.js");
const fetch = require("node-fetch");
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "flatearth",
 aliases: [],
 description: "Shows why the Earth is flat",
 category: "Fun",
 usage: "flatearth",
 run: async (client, message, args) => {
  try {
   const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("If the earth isn\'t flat, explain this:")
	.setImage("../lib/img/earth.png")
   message.channel.send(embed);
  } catch (err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
