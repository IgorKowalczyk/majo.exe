const Discord = require("discord.js");
const client = new Discord.Client({disableEveryone: true});
const fs = require("fs");
const http = require("http");
const db = require("quick.db");
const chalk = require("chalk");
const config = require("./config");
require('dotenv').config()

/* Login and Commands */
if (process.env.TOKEN) {
 client.commands = new Discord.Collection();
 client.aliases = new Discord.Collection();
 client.queue = new Map(); 
 ['command', 'event'].forEach(handler => {
  require(`./handlers/${handler}`)(client);
 });
 client.login(process.env.TOKEN)
} else {
 console.log(chalk.red.bold("Error:") + chalk.red(" Bot token is not provided! To give your bot life, you need to enter token value in the ") + chalk.grey.italic.bold(".env") +  chalk.red(" file - ") + chalk.grey.italic.bold("TOKEN=Your_Token ") + chalk.red.underline.bold("REMEMBER: Token is super-secret - do not share it with anyone!"));
 console.log(chalk.red("Stopping..."));
 process.exit(1);
}

if (process.env.DASHBOARD = "true") {
 console.log("Getting dashboard config file...")
 Dashboard = require("./dashboard-run");
 console.log("Done!")
 Dashboard(client);
} else {
  console.log(chalk.blue('Dashboard is now disabled. To enable it change the "DASHBOARD" value in .env file to "true" (Now is set to "') + chalk.blue.underline(`${config.dashboard}`) + chalk.blue('")') + chalk.blue.underline("\n" + client.user.username + " stats: " + `${client.guilds.cache.size}` + " servers, " + `${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}` + " members"));
}

/* /Login and Commands*/
process.on("unhandledRejection", (err) => {
 console.error(err);
});

//-------------------//
// END (of index.js) //
//-------------------//
