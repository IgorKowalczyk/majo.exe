const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "cat",
 aliases: ["catemoji"],
 description: "Cats is cute",
 category: "Fun",
 usage: "cat",
 run: async (client, message, args) => {
  (async () => {
   let cat = (await neko.sfw.catText());
   message.channel.send(owo.cat).catch(error => {
    message.channel.send({embed: {
     color: 16734039,
     description: "Something went wrong... :cry:"
    }})
   });
  })();
 }
}
