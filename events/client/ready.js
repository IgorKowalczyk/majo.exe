const Discord = require("discord.js");
const chalk = require('chalk');
const config = require("../../config");

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
     `${emoji} | Waiting for verification! (${client.guilds.cache.size} guilds 🥰)`,
    );	
   }	
   const random = Math.floor(Math.random() * (statuslist.length - 1) + 1);
   client.user.setActivity(statuslist[random], { type: 'WATCHING' });
  }, 10000);
  
  client.user.setStatus("online");
  const datelog = new Date();
   currentDate = datelog.getDate();
   month = datelog.getMonth() + 1;
   year = datelog.getFullYear();
   hour = datelog.getHours();
   min  = datelog.getMinutes();
   sec  = datelog.getSeconds();
  console.log("Generated at: " + currentDate + "/" + month + "/" + year + " | " + hour + ":" + min + "." + sec);
  console.log(chalk.blue("Connected! Logged in as ") + chalk.blue.underline(`${client.user.username}`) + chalk.blue("!")); // ${client.user.tag}
 } catch(err) {
  console.log(err);
 }
}
