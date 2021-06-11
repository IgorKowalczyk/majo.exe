const Discord = require("discord.js");
const client = new Discord.Client({
 disableEveryone: true,
 allowedMentions: {
  repliedUser: false,
 },
});
const chalk = require("chalk");
const { GiveawaysManager } = require("discord-giveaways");
const logs = require('discord-logs');
logs(client);
require("dotenv").config();
require("./utilities/inline_reply");
require("discord-buttons")(client);
const sql = require("./utilities/database");

/* Logging system config */
sql.query("CREATE TABLE IF NOT EXISTS `logs` (`guildid` VARCHAR(32) NOT NULL, `channelid` VARCHAR(32) NOT NULL, UNIQUE(`guildid`));", function (error, results, fields) {
 if (error) console.error(error);
 console.log("[SQL] Fetched table `logs`! Status: Success");
});
/* ---- */

/* Welcome and leave messages config */
/* = Welcome message = */
sql.query("CREATE TABLE IF NOT EXISTS `welcome` (`guildid` VARCHAR(32) NOT NULL, `channelid` VARCHAR(32) NOT NULL, UNIQUE(`guildid`));", function (error) {
 if (error) console.error(error);
 console.log("[SQL] Fetched table `welcome`! Status: Success");
});
/* = Leave message = */
sql.query("CREATE TABLE IF NOT EXISTS `leave` (`guildid` VARCHAR(32) NOT NULL, `channelid` VARCHAR(32) NOT NULL, UNIQUE(`guildid`));", function (error) {
 if (error) console.error(error);
 console.log("[SQL] Fetched table `leave`! Status: Success");
});
/* ---- */

/* Giveaways config */
sql.query("CREATE TABLE IF NOT EXISTS `giveaways` (`id` INT(1) NOT NULL AUTO_INCREMENT, `message_id` VARCHAR(64) NOT NULL, `data` JSON NOT NULL, PRIMARY KEY (`id`));", (err) => {
 if (err) console.error(err);
 console.log("[SQL] Fetched table `giveaways`! Status: Success");
});
const Giveaways = class extends GiveawaysManager {
 async getAllGiveaways() {
  return new Promise((resolve, reject) => {
   sql.query("SELECT `data` FROM `giveaways`", (err, res) => {
    if (err) {
     console.error(err);
     sql.end();
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
     console.error(err);
     sql.end();
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
     console.error(err);
     sql.end();
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
     console.error(err);
     sql.end();
     return reject(err);
    }
    resolve(true);
   });
  });
 }
};
/* ---- */

/* Login and Commands */
if (process.env.TOKEN) {
 client.commands = new Discord.Collection();
 client.aliases = new Discord.Collection();
 client.queue = new Map();
 const manager = new Giveaways(client, {
  updateCountdownEvery: 10000,
  hasGuildMembersIntent: true,
  default: {
   botsCanWin: false,
   exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
   embedColor: "RANDOM",
   embedColorEnd: "RANDOM",
   reaction: "843845378352873492",
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
 console.log(chalk.red.bold("Error:") + chalk.red(" Bot token is not provided! To give your bot life, you need to enter token value in the ") + chalk.grey.italic.bold(".env") + chalk.red(" file - ") + chalk.grey.italic.bold("TOKEN=Your_Token ") + chalk.red.underline.bold("REMEMBER: Token is super-secret - do not share it with anyone!"));
 console.log(chalk.red("Stopping..."));
 process.exit(1);
}
/* ---- */
