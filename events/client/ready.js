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
   const statuslist = [
    {
     msg: `outside (JK who does that?) ${emoji}`,
     type: "PLAYING",
    },
    {
     msg: `alone 😢`,
     type: "PLAYING",
    },
    {
     msg: `with your heart 💔`,
     type: "PLAYING",
    },
    {
     msg: `with over ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} users ${emoji}!`,
     type: "PLAYING",
    },
    {
     msg: `who even reads these anyways? 🤕`,
     type: "PLAYING",
    },
    {
     msg: `the haters hate ${emoji}`,
     type: "WATCHING",
    },
    {
     msg: `${client.prefix} help! ${emoji}`,
     type: "WATCHING",
    },
    {
     msg: `you (turn around) 🔪`,
     type: "WATCHING",
    },
    {
     msg: `grass grow 🥬`,
     type: "WATCHING",
    },
    {
     msg: `over ${client.guilds.cache.size} servers ${emoji}!`,
     type: "WATCHING",
    },
    {
     msg: `funny cat videos 🐈`,
     type: "WATCHING",
    },
    {
     msg: `Déjà vu 🎶`,
     type: "WATCHING",
    },
    {
     msg: `the world crumble 🤯`,
     type: "WATCHING",
    },
    {
     msg: `over you from above 👼`,
     type: "WATCHING",
    },
    {
     msg: `your conversations ${emoji}`,
     type: "LISTENING",
    },
   ];
   const random = Math.floor(Math.random() * (statuslist.length - 1) + 1);
   client.user.setStatus(client.config.display_status);
   if (client.config.rickroll == true) {
    client.user.setActivity(statuslist[random].msg, {
     type: "STREAMING",
     url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    });
   } else {
    client.user.setActivity(statuslist[random].msg, {
     type: statuslist[random].type,
    });
   }
   if (client.config.advanved_logging == true) console.log(chalk.bold(chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.cyan.bold(" Successfully changed client status"));
  }, 10000);

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
   .setColor("GREEN")
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
