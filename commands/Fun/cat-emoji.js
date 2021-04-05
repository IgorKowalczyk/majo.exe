const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../config");
const prefix = config.prefix;

module.exports = {
 name: "cat-emoji",
 aliases: [],
 description: "Gatos é fofo",
 category: "Diversão",
 usage: "cat-emoji",
 run: async (client, message, args) => {
  (async () => {
   try {
    let text = (await neko.sfw.catText());
    message.channel.send({embed: {
     color: "RANDOM",
     description: text.cat
    }})
   } catch (err) {
    message.channel.send({embed: {
     color: 16734039,
     description: "Equação matemática inválida!"
    }});
   }
  })();
 }
}
