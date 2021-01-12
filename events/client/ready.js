const Discord = require("discord.js");
const chalk = require('chalk');
const client = new Discord.Client({disableEveryone: true,});
const config = require("../../config");
client.config = config;

module.exports = (client) => {
try {
 setInterval(() => {
 const emojis = ["😆", "😄", "😎", "😂", "🥳", "😘", "😜", "🤑", "😁", "😉", "🥰", "😍", "🤯", "🥶", "🤩", "😇", "😊", "☺️", "😌", "😋"];
 const emoji = emojis[Math.floor(Math.random()*emojis.length)];
 var date = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
 const enddate = new Date().getFullYear() + "/06/13";
 const enddateEEP = new Date().getFullYear() + "/04/18";
 const statuslist = [];
 if (date == enddate) {
  statuslist.push(
   `🎉 ${client.guilds.cache.size} servers 🎉`,
   `🎉 ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} members 🎉`,
   `🎉 ${config.prefix} help 🎉`,	
   `🎉 Happy Birthday Discord! 🎉`,
  );	
 } else if (date == enddateEEP) {	
  statuslist.push(	
   `🔥 ${client.guilds.cache.size} servers 🔥`,
   `🔥 ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} members 🔥`,
   `🔥 ${config.prefix} help 🔥`,	
   `🔥 EEP 4 LIFE (04/18)! 🔥`,
  );	
 } else {	
  statuslist.push(	
   `${emoji} | ${client.guilds.cache.size} servers`,
   `${emoji} | ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} members`,
   `${emoji} | ${config.prefix} help`,
  );	
 }	
 const random = Math.floor(Math.random() * (statuslist.length - 1) + 1);
 client.user.setActivity(statuslist[random], { type: 'WATCHING' });
 }, 10000);

client.user.setStatus("online");

const os = require('os');
const memory = os.totalmem() -os.freemem(), totalmemory = os.totalmem();
const percentage =  ((memory/totalmemory) * 100).toFixed(2) + '%'
// const freememory = os.freemem();
console.log("Memory used ", (memory/ Math.pow(1024, 3)).toFixed(2) + "GB")
console.log("Total memory", (memory / 1024 / 1024).toFixed(0) / 100 + "GB")
console.log("Used memory" , percentage);
console.log("OS" + os.type() + os.release() + os.platform());

console.log(chalk.blue("Connected! Logged in as ") + chalk.blue.underline(`${client.user.username} ${client.user.tag}`) + chalk.blue("!"));
} catch(err) {
 console.log(err);
}
}
