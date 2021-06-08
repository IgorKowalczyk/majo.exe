const client = require("nekos.life");
const Discord = require("discord.js");
const neko = new client();

module.exports = {
 name: "cat-emoji",
 aliases: [],
 description: "Cats is cute",
 category: "Fun",
 usage: "cat-emoji",
 run: async (client, message, args) => {
  (async () => {
   try {
    let text = await neko.sfw.catText();
    message.lineReply({
     embed: {
      color: "RANDOM",
      description: text.cat,
     },
    });
   } catch (err) {
    message.lineReply({
     embed: {
      color: 16734039,
      description: "Something went wrong... :cry:",
     },
    });
   }
  })();
 },
};
