const { MessageEmbed, WebhookClient } = require("discord.js");
const chalk = require("chalk");
const { glob } = require("glob");
const { promisify } = require("util");
const moment = require("moment");
const io = require("@pm2/io");
const os = require('os')

module.exports = async (client) => {
 try {
  function capitalize(string) {
   return string.charAt(0).toUpperCase() + string.slice(1);
  }
  console.log(chalk.bold(chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.cyan.bold(" Loading slash commands... Please wait"));
  const globPromise = promisify(glob);
  const slashCommands = await globPromise(`${process.cwd()}/slash_commands/*/*.js`);
  const arrayOfSlashCommands = [];
  slashCommands.map((value) => {
   const file = require(value);
   client.slashCommands.set(file.name, file);
   arrayOfSlashCommands.push(file);
  });
  await client.application.commands.set(arrayOfSlashCommands);
  console.log(chalk.bold(chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.cyan.bold(" Successfully loaded " + chalk.blue.underline(`${client.slashCommands.size}`) + " slash commands! (/)"));
  console.log(chalk.bold(chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.cyan.bold(" Successfully loaded " + chalk.blue.underline(`${client.commands.size}`) + ` text commands! (${client.prefix})`));
  console.log(chalk.bold(chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.bold.cyan(` Bot User: `) + chalk.blue.underline(`${client.user.tag}`));
  console.log(chalk.bold(chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.bold.cyan(` Bot ID: `) + chalk.blue.underline(`${client.user.id}`));
  console.log(chalk.bold(chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.bold.cyan(` Guild(s): `) + chalk.blue.underline(`${client.guilds.cache.size}`));
  console.log(chalk.bold(chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.bold.cyan(` Watching: `) + chalk.blue.underline(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} members`));
  console.log(chalk.bold(chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.bold.cyan(` Prefix: `) + chalk.blue.underline(`${client.prefix}`));
  console.log(chalk.bold(chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.bold.cyan(` Node.js: `) + chalk.blue.underline(`${process.version}`));
  console.log(chalk.bold(chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.bold.cyan(` Plattform: `) + chalk.blue.underline(`${process.platform} ${process.arch}`));
  console.log(chalk.bold(chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.bold.cyan(` Memory: `) + chalk.blue.underline(`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`));
  console.log(chalk.bold(chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.bold.cyan(" Report generated at: " + chalk.blue.bold.underline(moment().format("LLLL"))));
  console.log(chalk.bold(chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.bold.cyan(" Client connected! Logged to Discord as ") + chalk.bold.blue.underline(client.user.tag));
  require("../../utilities/anti-crash")(client);
  if (!process.env.STATUS_WEBHOOK) throw new Error("[HOST] You need to provide Discord Status Webhook URL in .env - STATUS_WEBHOOK=YOUR_WEBHOOK_URL");
  const statuswebhook = new WebhookClient({ url: process.env.STATUS_WEBHOOK });
  const status = new MessageEmbed() // Prettier
   .setColor("GREEN")
   .setTimestamp()
   .setAuthor({ name: `${capitalize(client.user.username)} is online!`, iconURL: client.user.displayAvatarURL() })
   .setThumbnail(client.user.displayAvatarURL()) // Prettier
   .setDescription(`>>> Guilds: \`${client.guilds.cache.size} servers\`
   Members: \`${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} members\`
   Logged at: <t:${moment(new Date()).unix()}>`);
  statuswebhook.send({
   // Prettier
   username: capitalize(client.user.username) + " Status",
   avatarURL: client.user.displayAvatarURL(),
   embeds: [status],
  });
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
   client.user.setStatus(client.additional_config.display_status);
   if (client.additional_config.rickroll == true) {
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
  if (client.additional_config.pm2.enabled == true) {
   if (client.additional_config.pm2.metrics.ws_ping == true) {
    setInterval(() => {
     client.bot_ping_metrics.update(Math.round(client.ws.ping));
    }, 30000);
   }
   if (client.additional_config.pm2.metrics.users_count == true) {
    setInterval(() => {
     client.users_count.update(client.guilds.cache.reduce((a, g) => a + g.memberCount, 0));
    }, 10000);
   }
   if (client.additional_config.pm2.metrics.guilds_count == true) {
    setInterval(() => {
     client.guilds_count.update(client.guilds.cache.size);
    }, 10000);
   }
  }
 } catch (err) {
  console.log(err);
 }
};
