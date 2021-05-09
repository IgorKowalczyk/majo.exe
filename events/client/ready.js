const Discord = require("discord.js");
const chalk = require('chalk');
const config = require("../../config");

module.exports = (client) => {
 try {
  setInterval(() => {
   const emojis = ["😆", "😄", "😎", "😂", "🥳", "😘", "😜", "🤑", "😁", "😉", "🥰", "😍", "🤯", "🥶", "🤩", "😇", "😊", "☺️", "😌", "😋"];
   const emoji = emojis[Math.floor(Math.random()*emojis.length)];
   var date = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
   const discordbday = new Date().getFullYear() + "/05/13";
   const statuslist = [];
   if (date == discordbday) {
    statuslist.push(
     `🎉 ${client.guilds.cache.size} servers 🎉`,
     `🎉 ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} members 🎉`,
     `🎉 ${config.prefix} help 🎉`,	
     `🎉 Happy Birthday Discord! 🎉`,
    );	
   } else {	
    statuslist.push(	
     /*
     `${emoji} | ${client.guilds.cache.size} servers`,
     `${emoji} | ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} members`,
     `${emoji} | ${config.prefix} help`,
     `${emoji} | Waiting for verification! (${client.guilds.cache.size} guilds 🥰)`,
     */
     `[*] | ${client.guilds.cache.size} servers`,
     `[*] | ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} members`,
     `[*] | ${config.prefix} help`,
     `[*] | Waiting for verification! (${client.guilds.cache.size} guilds)`,
    );	
   }	
   const random = Math.floor(Math.random() * (statuslist.length - 1) + 1);
   client.user.setActivity(statuslist[random], { type: 'LISTENING' });
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
  const statuschannel = client.channels.cache.get(config.statuschannel)
  if (statuschannel) {
   statuschannel.send({embed: {
    color: 4779354,
    description: ":green_circle: | Bot Status - Online",
   }})
  } else {
   return;
  }
} catch(err) {
  console.log(err);
 }
}
