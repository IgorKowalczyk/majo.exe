const Discord = require("discord.js");
const crypto = require("crypto");
const chalk = require("chalk");
const { Database } = require("../utilities/mysql/database");
const { LoginError } = require("../utilities/errors/util");
const intents = new Discord.Intents(4095);

class Client extends Discord.Client {
 constructor() {
  super({
   intents,
   allowedMentions: {
    parse: ["users", "roles"],
    repliedUser: false,
   },
   failIfNotExists: false,
  });
  const db = new Database();
  this.db_events = db.events;
  this.db_events.on("ready", () => {
   db.setup();
  });
  this.database = db.connection;
 }
 log_info() {
  console.log(chalk.blue.bold(`[❔]`) + chalk.cyan.bold(` Green`) + chalk.green.bold(` ">" `) + chalk.cyan.bold(`= logs from Majo.exe Bot`));
  console.log(chalk.blue.bold(`[❔]`) + chalk.cyan.bold(` Magenta`) + chalk.magenta.bold(` ">" `) + chalk.cyan.bold(`= logs from Majo.exe Dashboard`));
  console.log(chalk.blue.bold(`[❔]`) + chalk.cyan.bold(` Red`) + chalk.red.bold(` ">" `) + chalk.cyan.bold(`= logs from Majo.exe API`));
  console.log(chalk.blue.bold(`[❔]`) + chalk.cyan.bold(` White`) + chalk.white.bold(` ">" `) + chalk.cyan.bold(`= logs from Majo.exe Database`));
 }
 secure() {
  process.env.SESSION_SECRET = "";
  process.env.SESSION_SECRET = crypto.randomBytes(64).toString("hex");
 }
 start(token) {
  if (!token) throw new LoginError("No token provided! Please provide it in .env");
  this.secure();
  this.login(token);
 }
 reload() {
  if (!process.env.TOKEN) throw new MissingENV("No token provided! Please provide it in .env", "TOKEN");
  this.destroy();
  this.login(process.env.token);
 }
 bot() {
  if (process.argv.includes(`--bot`)) require("../bot/index")(this);
  return true;
 }
 web() {
  if (process.argv.includes(`--dashboard`) || process.argv.includes(`--api`)) require("../dashboard/dashboard")(this);
  return true;
 }
}

module.exports = { Client };
