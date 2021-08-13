const Discord = require("discord.js");
const client = new Discord.Client({
 disableEveryone: true,
});
const chalk = require("chalk");

require("dotenv").config();

client.on("ready", () => {
 if (process.env.DASHBOARD == "true") {
  console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(" Getting dashboard config file..."));
  const webrun = require("./dashboard/dashboard");
  webrun(client);
 } else {
  console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(" Not running dashboard! The dashboard config value (process.env.DASHBOARD) is set to " + process.env.DASHBOARD + ". Please change it to `true` to run the dashboard."));
 }
});

if (process.env.TOKEN) {
 client.login(process.env.TOKEN);
 console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(" Web dashboard client logged"));
} else {
 throw new Error("[MAJO] You need to enter bot token to run dashboard!");
}
