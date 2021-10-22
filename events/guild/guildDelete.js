const chalk = require("chalk");

module.exports = async (client, guild) => {
 console.log(chalk.bold(chalk.blue.bold("[MAJO]")) + chalk.cyan.bold(` Guild leaved: `) + chalk.blue.bold.underline(guild.name) + chalk.cyan.bold(" (ID: ") + chalk.blue.bold.underline(guild.id) + chalk.cyan.bold(")"));
};
