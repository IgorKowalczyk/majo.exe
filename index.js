const Discord = require("discord.js");
const client = new Discord.Client({disableEveryone: true,});
const fs = require("fs");
const http = require("http");
const db = require("quick.db");
const chalk = require("chalk");

const config = require("./config");
const token = config.token;
const prefix = config.prefix;

/* Login and Commands */
if (token) {
 client.commands = new Discord.Collection();
 client.aliases = new Discord.Collection();
 client.queue = new Map(); 
 ['command', 'event'].forEach(handler => {
   require(`./handlers/${handler}`)(client);
 });
 client.login(token);
} else {
 console.log(chalk.red.bold("Error:") + chalk.red(" Bot token is not provided! To give your bot life, you need to enter token value in the ") + chalk.grey.italic.bold(".env") +  chalk.red(" file - ") + chalk.grey.italic.bold("TOKEN=Your_Token ") + chalk.red.underline.bold("REMEMBER: Token is super-secret - do not share it with anyone!"));
}
/* /Login and Commands*/

process.on("unhandledRejection", (err) => {
  console.error(err);
});

//-------------------//
// END (of index.js) //
//-------------------//
