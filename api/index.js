if (Number(process.version.slice(1).split(".")[0]) < 16) throw new Error("Majo.exe requires Node.js v16 or higher. Re-run the bot with Node.js v16 or higher!");
const { Permissions, MessageEmbed, WebhookClient, Client } = require("discord.js");
const Discord = require("discord.js");
const client = new Client({
 allowedMentions: {
  parse: ["users", "roles"],
  repliedUser: true,
 },
 // Uncomment line below (and delete line after ofc) if you enabled all indents!
 //intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_BANS, Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Discord.Intents.FLAGS.GUILD_INTEGRATIONS, Discord.Intents.FLAGS.GUILD_WEBHOOKS, Discord.Intents.FLAGS.GUILD_INVITES, Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_PRESENCES, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING, Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING],
 intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_BANS, Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Discord.Intents.FLAGS.GUILD_INTEGRATIONS, Discord.Intents.FLAGS.GUILD_WEBHOOKS, Discord.Intents.FLAGS.GUILD_INVITES, Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING, Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING],
});
const express = require("express");
const chalk = require("chalk");
const { readdirSync } = require("fs");
const config = require("../config/main_config");
const additional_config = require("../config/additional_config");
const rate_limit = require("express-rate-limit");
const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);
const app = express();
require("dotenv").config();
client.on("ready", () => {
 const port = parseInt(process.env.PORT) + 1;
 function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
 }
 process.env.API_SESSION_SECRET = "";
 for (let i = 0; i <= 15; i++) {
  process.env.API_SESSION_SECRET += Math.random().toString(16).slice(2, 8).toUpperCase().slice(-6) + i;
 }
 console.log(chalk.bold(chalk.bold.red("> ") + chalk.blue.bold("[API]")) + chalk.cyan.bold(" Starting api..."));
 console.log(chalk.bold(chalk.bold.red("> ") + chalk.blue.bold("[API]")) + chalk.cyan.bold(" Setting up api endpoints..."));
 config.secure_connection = false; // Bypass secure_connection for testing
 if (config.secure_connection == true) {
  app.enable("trust proxy");
  app.use((req, res, next) => {
   req.secure ? next() : res.redirect("https://" + req.headers.host + req.url);
  });
 }
 app.locals.domain = process.env.DOMAIN.split("//")[1];
 app.set("view engine", "html");
 readdirSync(`${process.cwd()}/api/endpoints`).forEach((dir) => {
  const endpoints = readdirSync(`${process.cwd()}/api/endpoints/${dir}/`).filter((file) => file.endsWith(".js"));
  const endpoint = endpoints.map((eachendp) => {
   require(`${process.cwd()}/api/endpoints/${dir}/${eachendp}`)(app, client);
   console.log(chalk.bold(chalk.bold.red("> ") + chalk.blue.bold("[API]")) + chalk.cyan.bold(` Loaded endpoint ${process.env.DOMAIN}:${port}/api/${dir}/${eachendp.replace(".js", "")}`));
  });
 });
 app.get("*", (req, res, next) => {
  res.send({
   code: 0,
   message: "Invaild endpoint!",
  });
 });
 app.listen(port, null, null, () => {
  console.log(chalk.bold(chalk.bold.red("> ") + chalk.blue.bold("[API]")) + chalk.cyan.bold(` API is up and running on url ${process.env.DOMAIN} and port ${port}!`));
 });
});
client.login(process.env.TOKEN);
