const mysql = require("mysql");
const chalk = require("chalk");
const { EventEmitter } = require("events");
require("dotenv").config();

class Database {
 constructor() {
  this.connection = mysql.createConnection({
   host: process.env.MYSQL_HOST,
   user: process.env.MYSQL_USER,
   password: process.env.MYSQL_PASSWORD,
   database: process.env.MYSQL_DATABASE,
   charset: "utf8mb4",
   port: "3306",
  });
  this.events = new EventEmitter();
  this.connect();
 }
 connect() {
  this.connection.connect((err) => {
   if (err) {
    throw new Error(`Impossible to connect to MySQL server. Code: ${err.code}`);
   } else {
    this.events.emit("ready", this.connection)
    console.log(chalk.white.bold("> ") + chalk.blue.bold("[SQL]") + chalk.cyan.bold(" Connected to the MySQL server! Connection ID: ") + chalk.blue.bold.underline(this.connection.threadId));
   }
  });
 }
 setup() {
  if(this.connection.state !== "disconnected") {
  this.connection.query("CREATE TABLE IF NOT EXISTS `guild_settings` ( `guild_id` BIGINT(64) NOT NULL , `anti_selfbots` INT(1), `prefix` VARCHAR(10) DEFAULT '', PRIMARY KEY (`guild_id`)); ", function (error) {
   if (error) throw new Error(error);
   console.log(chalk.white.bold("> ") + chalk.blue.bold("[SQL]") + chalk.cyan.bold(" Fetched table ") + chalk.blue.underline('"guild_settings"') + chalk.cyan.bold(" | Status: ") + chalk.blue.bold("200"));
  });
  this.connection.query("CREATE TABLE IF NOT EXISTS `guild_stats` ( `guild_id` BIGINT(64) NOT NULL , `joins` JSON NULL, `leaves` JSON NULL, `last_updated` DATE NOT NULL, PRIMARY KEY (`guild_id`));", function (error) {
   if (error) throw new Error(error);
   console.log(chalk.white.bold("> ") + chalk.blue.bold("[SQL]") + chalk.cyan.bold(" Fetched table ") + chalk.blue.underline('"guild_stats"') + chalk.cyan.bold(" | Status: ") + chalk.blue.bold("200"));
  });
  this.connection.query("CREATE TABLE IF NOT EXISTS `users` ( `user_id` varchar(32) NOT NULL , `reputation` bigint(20), `ban` INT(1), PRIMARY KEY(`user_id`))", function (error) {
   if (error) throw new Error(error);
   console.log(chalk.white.bold("> ") + chalk.blue.bold("[SQL]") + chalk.cyan.bold(" Fetched table ") + chalk.blue.underline('"users"') + chalk.cyan.bold(" | Status: ") + chalk.blue.bold("200"));
  });
  this.connection.query("CREATE TABLE IF NOT EXISTS `giveaways` (`id` INT(1) NOT NULL AUTO_INCREMENT, `message_id` VARCHAR(64) NOT NULL, `data` JSON NOT NULL, PRIMARY KEY (`id`));", (err) => {
   if (err) throw new Error(err);
   console.log(chalk.white.bold("> ") + chalk.blue.bold("[SQL]") + chalk.cyan.bold(" Fetched table ") + chalk.blue.underline('"giveaways"') + chalk.cyan.bold(" | Status: ") + chalk.blue.bold("200"));
  });
  this.connection.query("CREATE TABLE IF NOT EXISTS `welcome` (`guildid` VARCHAR(32) NOT NULL, `channelid` VARCHAR(32) NOT NULL, UNIQUE(`guildid`));", function (error) {
   if (error) throw new Error(error);
   console.log(chalk.white.bold("> ") + chalk.blue.bold("[SQL]") + chalk.cyan.bold(" Fetched table ") + chalk.blue.underline('"welcome"') + chalk.cyan.bold(" | Status: ") + chalk.blue.bold("200"));
  });
  this.connection.query("CREATE TABLE IF NOT EXISTS `leave` (`guildid` VARCHAR(32) NOT NULL, `channelid` VARCHAR(32) NOT NULL, UNIQUE(`guildid`));", function (error) {
   if (error) throw new Error(error);
   console.log(chalk.white.bold("> ") + chalk.blue.bold("[SQL]") + chalk.cyan.bold(" Fetched table ") + chalk.blue.underline('"leave"') + chalk.cyan.bold(" | Status: ") + chalk.blue.bold("200"));
  });
  this.connection.query("CREATE TABLE IF NOT EXISTS `logs` (`guildid` VARCHAR(32) NOT NULL, `channelid` VARCHAR(32) NOT NULL, UNIQUE(`guildid`));", function (error, results, fields) {
   if (error) throw new Error(error);
   console.log(chalk.white.bold("> ") + chalk.blue.bold("[SQL]") + chalk.cyan.bold(" Fetched table ") + chalk.blue.underline('"logs"') + chalk.cyan.bold(" | Status: ") + chalk.blue.bold("200"));
  });
 } else {
  throw new Error(`MySQL connection is ${this.connection.state}! Can't run setup!`);
 }
}
}

module.exports = { Database };
