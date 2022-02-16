const { glob } = require("glob");
const { promisify } = require("util");
const chalk = require("chalk");
const fetch = require("node-fetch");

module.exports = async (client) => {
 console.log(chalk.bold(chalk.green.bold("> ") + chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.cyan.bold(" Loading slash commands... Please wait"));
 const globPromise = promisify(glob);
 const slash_commands = await globPromise(`${process.cwd()}/bot/slash_commands/*/*.js`);
 const slash_commands_array = [];
 slash_commands.map((value) => {
  const file = require(value);
  if (typeof file.name != "string" || typeof file != "object") return console.log(chalk.bold(chalk.green.bold("> ") + chalk.bold(chalk.red(`[/]`))) + chalk.red.bold(` Error while loading ${value.split("/").slice(-1)}: `) + chalk.redBright.dim.bold.underline(`Missing command name or name is not a string!`));
  if (typeof file.description !== "string") return console.log(chalk.bold(chalk.green.bold("> ") + chalk.bold(chalk.red(`[/]`))) + chalk.red.bold(` Error while loading ${value.split("/").slice(-1)}: `) + chalk.redBright.dim.bold.underline(`Missing command description or description is not a string!`));
  client.slash_commands.set(file.name, file);
  slash_commands_array.push(file);
 });
 await client.application.commands.set(slash_commands_array);
 //console.log(chalk.bold(chalk.green.bold("> ") + chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.cyan.bold(" Setting permissions for slash commands (/)... Please wait"));
 await fetch(`https://discordapp.com/api/v9/applications/${client.config.id}/commands`, {
  method: "GET",
  headers: {
   authorization: `Bot ${client.token}`,
  },
 })
  .then((res) => res.json())
  .then((body) => {
   body.forEach((obj) => {
    if (obj.default_permission != true) {
     const cmd = client.slash_commands.get(obj.name);
     client.application.commands.permissions.add({ command: obj.id, permissions: cmd.permissions, guild: client.config.support_server_id });
    }
   });
  });
 //console.log(chalk.bold(chalk.green.bold("> ") + chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.cyan.bold(" Setting permissions for slash commands (/) done!"));
 console.log(chalk.bold(chalk.green.bold("> ") + chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.cyan.bold(" Successfully loaded " + chalk.blue.underline(`${client.slash_commands.size}`) + " slash commands! (/)"));
};
