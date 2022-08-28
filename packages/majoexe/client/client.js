const { Intents, Client } = require("discord.js");
const crypto = require("crypto");
const config = require("../config/main_config");
const { Database } = require("../utilities/mysql/database");
const LoginError = require("../utilities/errors/login_error");
const chalk = require("chalk");
const intents = new Intents(4095);
class DClient extends Client {
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
  this.database = db.connection;
  this.database.events = db.events;
  this.database.events.on("ready", () => {
   db.setup();
  });
  require("../utilities/string/capitalize");
  if (config.bypass_modules.bot || process.argv.includes(`--bot`) || config.bypass_modules.dashboard || process.argv.includes(`--dashboard`)) {
   require("../utilities/client/slash_commands")(this);
  }
 }
 async init() {
  if (!process.env.TOKEN) throw new LoginError("No token provided! Please provide it in .env");
  process.env.SESSION_SECRET = crypto.randomBytes(64).toString("hex");
  this.login(process.env.TOKEN);
  this.on("ready", async () => {
   require("../utilities/client/anti-crash")(this);
   console.log(chalk.green.bold("> ") + chalk.blue.bold(`[${this.user.username.toUpperCase().split(" ")[0]}]`) + chalk.bold.cyan(" Client connected! Logged to Discord as ") + chalk.bold.blue.underline(this.user.tag));
  });
 }
 async reload() {
  if (!process.env.TOKEN) throw new LoginError("No token provided! Please provide it in .env", "TOKEN");
  this.destroy();
  this.login(process.env.TOKEN);
 }
 async start_bot() {
  if (config.bypass_modules.bot || process.argv.includes(`--bot`)) {
   try {
    console.log(chalk.bold.green("> ") + chalk.blue.bold(`[MAJO.EXE]`) + chalk.cyan.bold(" Setting up bot..."));
    require("../bot/index")(this);
   } catch (e) {
    console.log(e);
   }
  } else {
   return false;
  }
 }
 async start_web() {
  if (config.bypass_modules.api || config.bypass_modules.dashboard || process.argv.includes(`--api`) || process.argv.includes(`--dashboard`)) {
   try {
    require("../web/web")(this);
   } catch (e) {
    console.log(e);
   }
  } else {
   return false;
  }
 }
}

module.exports = { DClient };
