const Discord = require("discord.js");
const calc = require("../../utilities/calculator");

module.exports = {
 name: "calculator",
 aliases: [],
 description: "Discord calculator (GUI)",
 category: "Utility",
 usage: "calculator",
 run: async (client, message, args) => {
  await calc(message);
 },
};
