const Discord = require("discord.js");
const fetch = require("node-fetch");

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
 const body = await response.text();
  console.log(body.url);
   const embed = new Discord.MessageEmbed()
    .setTitle("BAKA!!!")
    .setImage(body.url)
    .setColor("RANDOM")
    .setFooter("idiot!" + body.url)
    .setURL(body.url);
   message.channel.send(embed);
 } catch(err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
   console.log(err);
  }
 })();
 }
}
