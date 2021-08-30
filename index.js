const Discord = require("discord.js");
require("dotenv").config();
const client = new Discord.Client({
 disableEveryone: true,
 allowedMentions: {
  repliedUser: false,
 },
 ws: {
  properties: { $browser: "Discord iOS" }, // To change the bot online icon to phone
 },
});
const chalk = require("chalk");
const { GiveawaysManager } = require("discord-giveaways");
const logs = require("discord-logs");
const sql = require("./utilities/database");
const emojis = require("./emojis_config");
const config = require("./config");
let command_count = 0;
let message_count = 0;
client.config = config;
client.bot_emojis = emojis;
client.message_count = message_count;
client.command_count = command_count;
logs(client);
require("./utilities/inline_reply");
require("discord-buttons")(client);

sql.query("CREATE TABLE IF NOT EXISTS `logs` (`guildid` VARCHAR(32) NOT NULL, `channelid` VARCHAR(32) NOT NULL, UNIQUE(`guildid`));", function (error, results, fields) {
 if (error) throw new Error(error);
 console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(" Fetched table `logs`! Status: Success"));
});
sql.query("CREATE TABLE IF NOT EXISTS `welcome` (`guildid` VARCHAR(32) NOT NULL, `channelid` VARCHAR(32) NOT NULL, UNIQUE(`guildid`));", function (error) {
 if (error) throw new Error(error);
 console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(" Fetched table `welcome`! Status: Success"));
});
sql.query("CREATE TABLE IF NOT EXISTS `reputation` (`memberid` VARCHAR(32) NOT NULL, `rep` BIGINT NOT NULL, UNIQUE(`memberid`));", function (error) {
 if (error) throw new Error(error);
 console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(" Fetched table `reputation`! Status: Success"));
});
sql.query("CREATE TABLE IF NOT EXISTS `leave` (`guildid` VARCHAR(32) NOT NULL, `channelid` VARCHAR(32) NOT NULL, UNIQUE(`guildid`));", function (error) {
 if (error) throw new Error(error);
 console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(" Fetched table `leave`! Status: Success"));
});
sql.query("CREATE TABLE IF NOT EXISTS `stats` (`messages` BIGINT, `commands` BIGINT);", function (error) {
 if (error) throw new Error(error);
 console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(" Fetched table `stats`! Status: Success"));
});

/* Giveaways db config */
sql.query("CREATE TABLE IF NOT EXISTS `giveaways` (`id` INT(1) NOT NULL AUTO_INCREMENT, `message_id` VARCHAR(64) NOT NULL, `data` JSON NOT NULL, PRIMARY KEY (`id`));", (err) => {
 if (err) throw new Error(err);
 console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(" Fetched table `giveaways`! Status: Success"));
});
const Giveaways = class extends GiveawaysManager {
 async getAllGiveaways() {
  return new Promise((resolve, reject) => {
   sql.query("SELECT `data` FROM `giveaways`", (err, res) => {
    if (err) {
     return reject(err);
    }
    const giveaways = res.map((row) => JSON.parse(row.data));
    resolve(giveaways);
   });
  });
 }
 async saveGiveaway(messageID, giveawayData) {
  return new Promise((resolve, reject) => {
   sql.query("INSERT INTO `giveaways` (`message_id`, `data`) VALUES (?,?)", [messageID, JSON.stringify(giveawayData)], (err, res) => {
    if (err) {
     return reject(err);
    }
    resolve(true);
   });
  });
 }
 async editGiveaway(messageID, giveawayData) {
  return new Promise((resolve, reject) => {
   sql.query("UPDATE `giveaways` SET `data` = ? WHERE `message_id` = ?", [JSON.stringify(giveawayData), messageID], (err, res) => {
    if (err) {
     return reject(err);
    }
    resolve(true);
   });
  });
 }
 async deleteGiveaway(messageID) {
  return new Promise((resolve, reject) => {
   sql.query("DELETE FROM `giveaways` WHERE `message_id` = ?", messageID, (err, res) => {
    if (err) {
     return reject(err);
    }
    resolve(true);
   });
  });
 }
};
/* ---- */

/* Stats */
setInterval(() => {
 const total_messages_sql = "SELECT messages AS res FROM `stats`";
 sql.query(total_messages_sql, function (error, results, fields) {
  if (error) return console.log(error);
  if (results[0]) {
   const sum = parseInt(Object.values(JSON.parse(JSON.stringify(results[0])))) + client.message_count;
   const update = `UPDATE stats SET messages = ${sum}`;
   sql.query(update, function (error, results, fields) {
    if (error) return console.log(error);
    if (client.config.advanved_logging == true) console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(` Client total messages stats updated! [${sum}]`));
   });
  } else {
   const update = "INSERT INTO `stats` (`messages`) VALUES (" + client.message_count + ")";
   sql.query(update, function (error, results, fields) {
    if (error) return console.log(error);
    if (client.config.advanved_logging == true) console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(" Client total messages stats added!"));
   });
  }
 });
 const total_commands_sql = "SELECT commands AS res FROM `stats`";
 sql.query(total_commands_sql, function (error, results, fields) {
  if (error) return console.log(error);
  if (results[0]) {
   const sum = parseInt(Object.values(JSON.parse(JSON.stringify(results[0])))) + client.command_count;
   const update = `UPDATE stats SET commands = ${sum}`;
   sql.query(update, function (error, results, fields) {
    if (error) return console.log(error);
    if (client.config.advanved_logging == true) console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(` Client total commands stats updated! [${sum}]`));
   });
  } else {
   const update = "INSERT INTO `stats` (`commands`) VALUES (" + client.command_count + ")";
   sql.query(update, function (error, results, fields) {
    if (error) return console.log(error);
    if (client.config.advanved_logging == true) console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(` Client total messages stats added! [${client.command_count}]`));
   });
  }
 });
}, 60000);

/* Login and Commands */
if (process.env.TOKEN) {
 client.commands = new Discord.Collection();
 client.aliases = new Discord.Collection();
 client.snipes = new Discord.Collection();
 client.queue = new Map();
 const manager = new Giveaways(client, {
  updateCountdownEvery: 10000,
  hasGuildMembersIntent: true,
  default: {
   botsCanWin: false,
   exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
   embedColor: "RANDOM",
   embedColorEnd: "RANDOM",
   reaction: "843845378352873492", // Unicode Emoji or Discord Emoji ID
  },
 });
 client.giveawaysManager = manager;
 require("events").EventEmitter.prototype._maxListeners = 70;
 require("events").defaultMaxListeners = 70;
 ["command", "event"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
 });
 client.login(process.env.TOKEN);
} else {
 throw new Error("[MAJO] Bot token is not provided! To give your bot life, you need to enter token value in the .env file - TOKEN=Your_Bot_Token");
}
/* ---- */
