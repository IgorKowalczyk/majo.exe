const Discord = require("discord.js");
const chalk = require('chalk');
const config = require("../../config");

module.exports = (client) => {
 try {
  setInterval(() => {
   const emojis = ["😆", "😄", "😎", "😂", "🥳", "😘", "😜", "🤑", "😁", "😉", "🥰", "😍", "🤯", "🥶", "🤩", "😇", "😊", "☺️", "😌", "😋"];
   const emoji = emojis[Math.floor(Math.random()*emojis.length)];
   var date = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
   const enddate = new Date().getFullYear() + "/04/26";
  // const enddateEEP = new Date().getFullYear() + "/04/18";
   const statuslist = [];
   if (date == enddate) {
    statuslist.push(
     `🎉 ${client.guilds.cache.size} servidores 🎉`,
     `🎉 ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} membrps 🎉`,
     `🎉 ${config.prefix} help 🎉`,	
     `🎉 Feliz Aniversário João Victor! 🎉`,
    );	
 /*  } else if (date == enddateEEP) {	
    statuslist.push(	
     `🔥 ${client.guilds.cache.size} servidores 🔥`,
     `🔥 ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} membros 🔥`,
     `🔥 ${config.prefix} help 🔥`,	
     `🔥 EEP 4 LIFE (04/18)! 🔥`,
    );	*/
   } else {	
    statuslist.push(	
     `${emoji} | ${client.guilds.cache.size} servidores`,
     `${emoji} | ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} membros`,
     `${emoji} | ${config.prefix}help`,
//     `🧙‍♀️ Baila Grachi, Dulce Grachi 🧙‍♀️`,
    );	
   }	
   const random = Math.floor(Math.random() * (statuslist.length - 1) + 1);
   client.user.setActivity(statuslist[random], { type: 'WATCHING' });
  }, 10000);
  
  client.user.setStatus("online");

  console.log(chalk.blue("Connected! Logged in as ") + chalk.blue.underline(`${client.user.username}`) + chalk.blue("!")); // ${client.user.tag}
 } catch(err) {
  console.log(err);
 }
}
