const chalk = require("chalk");

module.exports = async (client, guild) => {
 console.log(chalk.bold(chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.cyan.bold(` Guild leaved: `) + chalk.blue.bold.underline(guild.name) + chalk.cyan.bold(" (ID: ") + chalk.blue.bold.underline(guild.id) + chalk.cyan.bold(" | Members: ") + chalk.blue.bold.underline(guild.memberCount) + chalk.cyan.bold(")"));
 client.database.query(`DELETE FROM guild_stats WHERE guild_id = '${guild.id}'`);
};
