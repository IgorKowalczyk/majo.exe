const Discord = require("discord.js");
const client = new Discord.Client({disableEveryone: true});
const config = require("./config");
require('dotenv').config()

client.on('ready', () => {
 if (process.env.DASHBOARD = "true") {
  console.log("[HOST] Getting dashboard config file...")
  const webrun = require("./dashboard/dashboard");
  webrun(client);
 } else {
  console.log("[HOST] Not running dashboard");
 }
});

if (process.env.TOKEN) {
 client.login(process.env.TOKEN);
 console.log("[HOST] Web dashboard client logged");
}

module.exports = (client) => {
 readdirSync('./commands/').forEach(file => {
   let pull = require(`../commands/${file}`);
    if (pull.name && pull.category) {
     client.commands.set(pull.name, pull);
    }
    if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
 });
}
