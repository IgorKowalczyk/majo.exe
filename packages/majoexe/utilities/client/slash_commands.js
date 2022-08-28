const { glob } = require("glob");
const { promisify } = require("util");
const { Collection } = require("discord.js");

module.exports = async (client) => {
 const globPromise = promisify(glob);
 const slash_commands = await globPromise(`${process.cwd()}/bot/slash_commands/*/*.js`);
 const slash_commands_array = [];
 client.slash_commands = new Collection();
 client.extra_slash_commands = new Collection();
 client.all_commands = 0;
 await slash_commands.map(async (value) => {
  const file = require(value);
  if (typeof file.name != "string" || typeof file != "object") return console.log(chalk.bold(chalk.green.bold("> ") + chalk.bold(chalk.red(`[/]`))) + chalk.red.bold(` Error while loading ${value.split("/").slice(-1)}: `) + chalk.redBright.dim.bold.underline(`Missing command name or name is not a string!`));
  if (typeof file.description !== "string") return console.log(chalk.bold(chalk.green.bold("> ") + chalk.bold(chalk.red(`[/]`))) + chalk.red.bold(` Error while loading ${value.split("/").slice(-1)}: `) + chalk.redBright.dim.bold.underline(`Missing command description or description is not a string!`));
  if (file.options) {
   file.options.forEach((option) => {
    if (option.choices) {
     option.choices.forEach((cmd) => {
      if (cmd.usage && cmd.category) {
       client.extra_slash_commands.set(cmd.usage, cmd);
      }
     });
    } else if (option.type === 1) {
     client.extra_slash_commands.set(option.usage, option);
    }
   });
  }
  client.slash_commands.set(file.name, file);
  slash_commands_array.push(file);
 });
 client.slash_commands_array = slash_commands_array;
 client.all_commands = parseInt(client.slash_commands.size + client.extra_slash_commands.size);
};
