const Discord = require("discord.js");
const client = new Discord.Client({disableEveryone: true,});
const fs = require("fs");
const http = require("http");
const db = require("quick.db");
const discord_token = process.env.TOKEN;
const prefix = process.env.PREFIX;
const newUsers = new Discord.Collection();
var botMembers = 0;
const chalk = require('chalk');

/* Login and Commands */
if (discord_token) {
 client.commands = new Discord.Collection();
 client.aliases = new Discord.Collection();
 client.queue = new Map(); 
 ['command', 'event'].forEach(handler => {
   require(`./handlers/${handler}`)(client);
 });
 client.login(discord_token);
} else {
 console.log(chalk.red.bold("Majo.exe Error:") + chalk.red(" Bot token is not provided! To give your bot life, you need to enter token value in the ") + chalk.grey.italic.bold(".env") +  chalk.red(" file - ") + chalk.grey.italic.bold("TOKEN=Your_Token ") + chalk.red.underline.bold("REMEMBER: Token is super-secret - do not share it with anyone!"));
}
/* /Login and Commands*/

// ---------
//    END (of index.js)
// ---------
