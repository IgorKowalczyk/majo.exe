const Discord = require("discord.js");
const fetch = require("node-fetch");
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "baka",
 aliases: [],
 description: "BAKA!!!",
 category: "Fun",
 usage: "baka",
 run: async (client, message, args) => {
  (async () => {
   try {
    const response = await fetch("https://nekos.life/api/v2/img/baka")
    const body = await response.json();
    const embed = new Discord.MessageEmbed()
     .setTitle(":rage: Baka!", message.guild.iconURL({ dynamic: true, format: 'png'}))
     .setImage(body.url)
     .setColor("RANDOM")
     .setFooter("Requested by " + `${message.author.username}` + " • (You are a IDIOT!)", message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
     .setTimestamp()
     .setURL(body.url);
    message.channel.send(embed);
   } catch(err) {
    message.channel.send({embed: {
     color: 16734039,
     description: "Something went wrong... :cry:"
    }})
   }
  })();
 }
}

