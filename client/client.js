const Discord = require("discord.js");
const crypto = require("crypto");
const { Database } = require("../utilities/mysql/database");
const LoginError = require("../utilities/errors/util");
const MissingENV = require("../utilities/errors/util");
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
 async start() {
  require("../utilities/client/anti-crash")(this);
  process.env.SESSION_SECRET = crypto.randomBytes(64).toString("hex");
  if (!process.env.TOKEN) throw new LoginError("No token provided! Please provide it in .env");
  this.login(process.env.TOKEN);
 }
 async reload() {
  if (!process.env.TOKEN) throw new MissingENV("No token provided! Please provide it in .env", "TOKEN");
  this.destroy();
  this.login(process.env.TOKEN);
 }
 async bot() {
  if (process.argv.includes(`--bot`)) require("../bot/index")(this);
  return true;
 }
 async web() {
  if (process.argv.includes(`--dashboard`) || process.argv.includes(`--api`)) require("../dashboard/dashboard")(this);
  return true;
 }
}

module.exports = { Client };
