const Discord = require("discord.js");
const { Database } = require("../utilities/mysql/database");
const chalk = require("chalk");

class majo {
 constructor() {
  this.client = new Discord.Client({
   allowedMentions: {
    parse: ["users", "roles"],
    repliedUser: false,
   },
   failIfNotExists: false,
   presence: {
    status: "online",
    afk: false,
   },
   intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_PRESENCES, Discord.Intents.FLAGS.GUILD_MEMBERS],
  });
  const db = new Database();
  db.events.on("ready", () => {
   db.setup();
  });
  this.client.database = db.connection;
 }
 login() {
  process.env.SESSION_SECRET = "";
  for (let i = 0; i <= 15; i++) {
   process.env.SESSION_SECRET += Math.random().toString(16).slice(2, 8).toUpperCase().slice(-6) + i;
  }
  if (process.env.TOKEN) {
   this.client.login(process.env.TOKEN);
  }
  return this.client;
 }
 reload() {
  this.client.destroy();
  this.client.login(process.env.token);
 }
 destroy() {
  this.client.destroy();
 }
 log_info() {
  console.log(chalk.blue.bold(`[❔]`) + chalk.cyan.bold(` Green`) + chalk.green.bold(` ">" `) + chalk.cyan.bold(`= logs from Majo.exe Bot`));
  console.log(chalk.blue.bold(`[❔]`) + chalk.cyan.bold(` Magenta`) + chalk.magenta.bold(` ">" `) + chalk.cyan.bold(`= logs from Majo.exe Dashboard`));
  console.log(chalk.blue.bold(`[❔]`) + chalk.cyan.bold(` Red`) + chalk.red.bold(` ">" `) + chalk.cyan.bold(`= logs from Majo.exe API`));
  console.log(chalk.blue.bold(`[❔]`) + chalk.cyan.bold(` White`) + chalk.white.bold(` ">" `) + chalk.cyan.bold(`= logs from Majo.exe Database`));
 }
 bot() {
  if (process.argv.includes(`--bot`)) require("../bot/index")(this.client);
  return true;
 }
 // WIP | /web/web.js
 web() {
  if (process.argv.includes(`--api`)) require("../dashboard/dashboard")(this.client);
  return true;
 }
}

module.exports = { majo };
