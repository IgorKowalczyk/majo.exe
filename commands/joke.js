const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "joke",
 aliases: ["dad-joke", "dadjoke"],
 description: "Display a random dad joke",
 category: "Fun",
 usage: "joke",
 run: async (client, message, args) => {
  (async () => {
   try {
    const response = await fetch("http://icanhazdadjoke.com/", {
     method: 'get',
     headers: { 'Accept': 'application/json' },
    })
    const body = await response.json();
    console.log(body);
    const embed = new Discord.MessageEmbed()
     .setTitle("Random Dad joke", message.guild.iconURL({ dynamic: true, format: 'png'}))
     .setDescription("Dad said" + body.joke)
     .setColor("RANDOM")
     .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
     .setTimestamp()
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
