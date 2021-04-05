const Discord = require("discord.js");
const chalk = require('chalk');
const client = new Discord.Client({disableEveryone: true,});
const config = require("../config");
client.config = config;

module.exports = (client) => {
 if (process.env.DASHBOARD = "true") {
  const Dashboard = require("../../dashboard/dashboard");
  Dashboard(client);
 } else {
  console.log(chalk.blue('Dashboard is now disabled. To enable it change the "DASHBOARD" value in .env file to "true" (Now is set to "') + chalk.blue.underline(`${config.dashboard}`) + chalk.blue('")') + chalk.blue.underline("\n" + client.user.username + " stats: " + `${client.guilds.cache.size}` + " servers, " + `${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}` + " members"));
 }
}
