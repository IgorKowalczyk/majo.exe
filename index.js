const Discord = require("discord.js");
const client = new Discord.Client({disableEveryone: true});
const fs = require("fs");
const http = require("http");
const db = require("quick.db");
const chalk = require("chalk");
const config = require("./config");
require('dotenv').config()
const { GiveawaysManager } = require('discord-giveaways');


/* Login and Commands */
if (process.env.TOKEN) {
 client.commands = new Discord.Collection();
 client.aliases = new Discord.Collection();
 client.queue = new Map();
 const manager = new GiveawaysManager(client, {
  storage: './giveaways.json',
  updateCountdownEvery: 10000,
  hasGuildMembersIntent: false,
  default: {
   botsCanWin: false,
   exemptPermissions: ['MANAGE_MESSAGES', 'ADMINISTRATOR'],
   embedColor: '#FF0000',
   embedColorEnd: '#000000',
   reaction: '🎉'
  }
 });
 client.giveawaysManager = manager;
 require('events').EventEmitter.prototype._maxListeners = 70;
 require('events').defaultMaxListeners = 70;
 ['command', 'event'].forEach(handler => {
  require(`./handlers/${handler}`)(client);
 });
 client.login(process.env.TOKEN);
} else {
 console.log(chalk.red.bold("Error:") + chalk.red(" Bot token is not provided! To give your bot life, you need to enter token value in the ") + chalk.grey.italic.bold(".env") +  chalk.red(" file - ") + chalk.grey.italic.bold("TOKEN=Your_Token ") + chalk.red.underline.bold("REMEMBER: Token is super-secret - do not share it with anyone!"));
 console.log(chalk.red("Stopping..."));
 process.exit(1);
}


//-------------------//
// END (of index.js) //
//-------------------//
