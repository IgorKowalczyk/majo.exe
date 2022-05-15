const chalk = require("chalk");

module.exports = async (client) => {
 console.log(chalk.bold(chalk.green.bold("> ") + chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.cyan.bold(" Registering slash commands..."));
 await client.application.commands.set(client.slash_commands_array);
 console.log(chalk.bold(chalk.green.bold("> ") + chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.cyan.bold(" Successfully registered " + chalk.blue.underline(`${client.slash_commands.size}`) + " (total: " + chalk.blue.underline(client.all_commands) + ") slash commands! (/)"));
};
