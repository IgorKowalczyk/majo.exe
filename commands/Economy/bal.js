const Discord = require("discord.js");
const eco = require("../../utilities/economy");
const config = require("../../config");
const prefix = config.prefix;

module.exports = {
 name: "bal",
 aliases: ["balance"],
 description: "Check the user balance",
 category: "Economy",
 usage: "bal",
 run: async (client, message, args) => {
  let money = eco.fetchMoney(message.author.id);
  return message.channel.send(`${message.author} has ${money} coins.`);
 },
};
