const { glob } = require("glob");
const { promisify } = require("util");
const chalk = require("chalk");

module.exports = async (client) => {
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
};
