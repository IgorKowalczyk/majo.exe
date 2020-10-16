const prefix = process.env.PREFIX;
const { Collection, MessageEmbed, Discord } = require("discord.js");
const chalk = require('chalk');

module.exports = (client) => {
try {
 setInterval(() => {
 var date = new Date()	.toJSON().slice(0, 10).replace(/-/g, "/");	
 const enddate = new Date().getFullYear() + "/06/13";	
 const enddateEEP = new Date().getFullYear() + "/04/18";
 const statuslist = [];	
 if (date == enddate) {	
  statuslist.push(	
   `🎉 ${client.guilds.cache.size} servers 🎉`,	
   `🎉 ${client.users.cache.size} members 🎉`,	
   `🎉 ${prefix} help 🎉`,	
   `🎉 Happy Birthday Discord! 🎉`	
  );	
 } else if (date == enddateEEP) {	
  statuslist.push(	
   `🔥 ${client.guilds.cache.size} servers 🔥`,	
   `🔥 ${client.users.cache.size} members 🔥`,	
   `🔥 ${prefix} help 🔥`,	
   `🔥 EEP 4 LIFE (04/18)! 🔥`	
  );	
 } else {	
  statuslist.push(	
   `${client.guilds.cache.size} servers`,	
   `${client.users.cache.size} members`,	
   `${prefix} help`	
  );	
 }	
 const random = Math.floor(Math.random() * (statuslist.length - 1) + 1);
 client.user.setActivity(statuslist[random], { type: 'WATCHING' });
 }, 10000);
} catch(err) {
 console.log(err);
}

console.log(chalk.blue("Connected! Logged in as ") + chalk.blue.underline(`${client.user.tag}`) + chalk.blue("!"));
}
