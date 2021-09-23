const Discord = require("discord.js");
const chalk = require("chalk");
const { glob } = require("glob");
const { promisify } = require("util");

module.exports = async (client) => {
 try {
  function capitalize(string) {
   return string.charAt(0).toUpperCase() + string.slice(1);
  }
  setInterval(() => {
   const emojis = ["😆", "😄", "😎", "😂", "🥳", "😘", "😜", "😁", "😉", "🥰", "😍", "🤯", "🤩", "😇", "😊", "☺️", "😌", "😋", "😳", "😚", "😏", "😱", "🥵", "😶‍🌫️", "🤕", "😴", "( ͡° ͜ʖ ͡°)"]; // Smirk is here becase of Luna_CatArt#4514 idea XD
   const emoji = emojis[Math.floor(Math.random() * emojis.length)];
   var date = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
   const discordbday = new Date().getFullYear() + "/05/13";
   const statuslist = [];
   if (date == discordbday) {
    statuslist.push(
     `🎉 ${client.guilds.cache.size} servers 🎉`, // Prettier
     `🎉 ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} members 🎉`, // Prettier
     `🎉 ${process.env.PREFIX} help 🎉`
    );
   } else {
    statuslist.push(
     `${emoji} | ${client.guilds.cache.size} servers!`, // Prettier
     `${emoji} | ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} members!`, // Prettier
     `${emoji} | ${process.env.PREFIX} help`, // Prettier
     `${emoji} | Waiting for verification! (${client.guilds.cache.size} guilds 🥰)`
    );
   }
   const random = Math.floor(Math.random() * (statuslist.length - 1) + 1);
   if (client.config.rickroll == true) {
    client.user.setActivity(statuslist[random], {
     type: "STREAMING",
     url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    });
   } else {
    client.user.setActivity(statuslist[random], {
     type: "WATCHING",
    });
   }
   if (client.config.advanved_logging == true) console.log(chalk.bold(chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.cyan.bold(" Successfully changed client status"));
  }, 10000);
  client.user.setStatus("online");
  const globPromise = promisify(glob);
  const slashCommands = await globPromise(`${process.cwd()}/scommands/*/*.js`);
  const arrayOfSlashCommands = [];
  slashCommands.map((value) => {
   const file = require(value);
   client.slashCommands.set(file.name, file);
   arrayOfSlashCommands.push(file);
  });
  await client.application.commands.set(arrayOfSlashCommands);
  console.log(chalk.bold(chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.cyan.bold(" Successfully loaded " + chalk.blue.underline(`${client.slashCommands.size}`) + " slash commands!"));
  console.log(chalk.bold(chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.cyan.bold(" Successfully loaded " + chalk.blue.underline(`${client.commands.size}`) + " commands!"));
  const datelog = new Date();
  currentDate = datelog.getDate();
  month = datelog.getMonth() + 1;
  year = datelog.getFullYear();
  hour = datelog.getHours();
  min = datelog.getMinutes();
  sec = datelog.getSeconds();
  console.log(chalk.bold(chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.bold.cyan(" Generated at: " + chalk.blue.bold.underline(currentDate + "/" + month + "/" + year + " | " + hour + ":" + min + "." + sec)));
  console.log(chalk.bold(chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.bold.cyan(" Client connected! Logged to Discord as ") + chalk.bold.blue.underline(client.user.tag) + chalk.bold.cyan(" (ID: ") + chalk.bold.blue.underline(client.user.id) + chalk.bold.cyan(")!"));
  /* Status Webhook */
  if (!process.env.STATUS_WEBHOOK) throw new Error("[HOST] You need to provide Discord Status Webhook URL in .env - STATUS_WEBHOOK=YOUR_WEBHOOK_URL");
  const statuswebhook = new Discord.WebhookClient({ url: process.env.STATUS_WEBHOOK });
  const status = new Discord.MessageEmbed() // Prettier
   .setColor("#18A64E")
   .setTimestamp()
   .setAuthor(`${capitalize(client.user.username)} is online!`)
   .setThumbnail(client.user.displayAvatarURL()) // Prettier
   .setDescription(`• Guilds: \`${client.guilds.cache.size}\`
   • Members: \`${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}\`
   • Logged at: \`${datelog}\``);
  statuswebhook.send({
   // Prettier
   username: capitalize(client.user.username) + " Status",
   avatarURL: client.user.displayAvatarURL(),
   embeds: [status],
  });
 } catch (err) {
  console.log(err);
 }
};
