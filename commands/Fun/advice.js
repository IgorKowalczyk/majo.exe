const Discord = require("discord.js");
const Random = require("srod-v2")

module.exports = {
 name: "advice",
 aliases: [],
 description: "Get a random advice",
 category: "Fun",
 usage: "advice",
 run: async (client, message, args) => {
  try {
   const Data = await Random.GetAdvice();
   return message.channel.send(Data);
  } catch (err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
 