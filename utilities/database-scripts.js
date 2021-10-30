const sql = require("./database");
const chalk = require("chalk");

sql.query("CREATE TABLE IF NOT EXISTS `guild_settings` ( `guild_id` BIGINT(64) NOT NULL , `anti_selfbots` INT(1), `prefix` VARCHAR(10) DEFAULT '', PRIMARY KEY (`guild_id`)); ", function (error) {
 if (error) throw new Error(error);
 console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(" Fetched table ") + chalk.blue.underline('"guild_settings"') + chalk.cyan.bold(" | Status: ") + chalk.blue.bold("200"));
});
sql.query("CREATE TABLE IF NOT EXISTS `users` ( `user_id` INT(32) NOT NULL , `reputation` bigint(20), `ban` INT(1), PRIMARY KEY(`user_id`))", function (error) {
 if (error) throw new Error(error);
 console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(" Fetched table ") + chalk.blue.underline('"users"') + chalk.cyan.bold(" | Status: ") + chalk.blue.bold("200"));
});
sql.query("CREATE TABLE IF NOT EXISTS `giveaways` (`id` INT(1) NOT NULL AUTO_INCREMENT, `message_id` VARCHAR(64) NOT NULL, `data` JSON NOT NULL, PRIMARY KEY (`id`));", (err) => {
 if (err) throw new Error(err);
 console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(" Fetched table ") + chalk.blue.underline('"giveaways"') + chalk.cyan.bold(" | Status: ") + chalk.blue.bold("200"));
});
sql.query("CREATE TABLE IF NOT EXISTS `welcome` (`guildid` VARCHAR(32) NOT NULL, `channelid` VARCHAR(32) NOT NULL, UNIQUE(`guildid`));", function (error) {
 if (error) throw new Error(error);
 console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(" Fetched table ") + chalk.blue.underline('"welcome"') + chalk.cyan.bold(" | Status: ") + chalk.blue.bold("200"));
});
sql.query("CREATE TABLE IF NOT EXISTS `leave` (`guildid` VARCHAR(32) NOT NULL, `channelid` VARCHAR(32) NOT NULL, UNIQUE(`guildid`));", function (error) {
 if (error) throw new Error(error);
 console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(" Fetched table ") + chalk.blue.underline('"leave"') + chalk.cyan.bold(" | Status: ") + chalk.blue.bold("200"));
});
sql.query("CREATE TABLE IF NOT EXISTS `logs` (`guildid` VARCHAR(32) NOT NULL, `channelid` VARCHAR(32) NOT NULL, UNIQUE(`guildid`));", function (error, results, fields) {
 if (error) throw new Error(error);
 console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(" Fetched table ") + chalk.blue.underline('"logs"') + chalk.cyan.bold(" | Status: ") + chalk.blue.bold("200"));
});
