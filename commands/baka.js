const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "baka",
 aliases: [],
 description: "BAKA!!!",
 category: "Fun",
 usage: "baka",
 run: async (client, message, args) => {
 fetch("https://nekos.life/api/v2/img/baka")
  .then(response => response.text())
  .then(data => {
  console.log(data);
   const embed = new Discord.MessageEmbed()
    .setTitle("BAKA!!!")
    .setImage(data.res.url)
    .setColor("RANDOM")
    .setFooter("idiot!" + data.res.url)
    .setURL(data.res.url);
   message.channel.send(embed);
  }).catch((err) => {
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
   console.log(err);
  })
 }
}
