const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const globPromise = promisify(glob);
const ascii = require("ascii-table");
const chalk = require("chalk");
const table = new ascii();
table.setHeading("Command", "Category", "Load status");
table.setTitleAlign(table.CENTER);

module.exports = async (client) => {
 const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
 commandFiles.map((value) => {
  const file = require(value);
  const splitted = value.split("/");
  const directory = splitted[splitted.length - 2];

  if (file.name) {
   const properties = { directory, ...file };
   client.commands.set(file.name, properties);
  }
  if (file.aliases && Array.isArray(file.aliases)) {
   file.aliases.forEach((alias) => client.aliases.set(alias, file.name));
  }
  table.addRow(file.name, file.category, "OK");
 });

 console.log(chalk.bold(chalk.blue.bold("[MAJO]")) + chalk.cyan.bold(" Please wait... Loading commands..."));
 console.log(chalk.cyan.bold(table.toString()));
 console.log(chalk.bold(chalk.blue.bold("[MAJO]")) + chalk.cyan.bold(" Successfully loaded " + chalk.blue.underline(`${client.commands.size}`) + " commands!"));

 // Events
 const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
 eventFiles.map((value) => require(value));

 // Slash Commands
};
