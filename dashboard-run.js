const Discord = require("discord.js");
const client = new Discord.Client({
 disableEveryone: true,
});
const chalk = require("chalk");
const gradient = require("gradient-string");

require("dotenv").config();

client.on("ready", () => {
 if ((process.env.DASHBOARD = "true")) {
  console.log(chalk.bold(gradient.pastel("[SQL]")) + gradient.pastel(" Getting dashboard config file..."));
  const webrun = require("./dashboard/dashboard");
  webrun(client);
 } else {
  console.log(chalk.bold(gradient.pastel("[SQL]")) + gradient.pastel(" Not running dashboard! The dashboard config value (process.env.DASHBOARD) is set to " + process.env.DASHBOARD + ". Please change it to `true` to run the dashboard."));
 }
});

if (process.env.TOKEN) {
 client.login(process.env.TOKEN);
 console.log(chalk.bold(gradient.pastel("[SQL]")) + gradient.pastel(" Web dashboard client logged"));
}
