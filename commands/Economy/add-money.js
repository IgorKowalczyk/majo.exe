const Discord = require("discord.js");
const eco = require("../../utilities/economy");
const config = require("../../config");
const prefix = config.prefix;

module.exports = {
 name: "add-money",
 aliases: [],
 description: "Add balance to user",
 category: "Economy",
 usage: "add-money",
 run: async (client, message, args) => {
  let money = eco.addMoney(message.author.id, message.guild.id, 5000)
  return message.channel.send(`${message.author} i added ${money || "0"} coins to your bank account!`);
 },
};
