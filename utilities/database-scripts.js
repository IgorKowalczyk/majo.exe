const sql = require("./database");
const chalk = require("chalk");

sql.query("CREATE TABLE IF NOT EXISTS `logs` (`guildid` VARCHAR(32) NOT NULL, `channelid` VARCHAR(32) NOT NULL, UNIQUE(`guildid`));", function (error, results, fields) {
 if (error) throw new Error(error);
 console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(" Fetched table ") + chalk.blue.underline("logs") + chalk.cyan.bold("! Status: ") + chalk.blue.bold("Success (OK)") + chalk.cyan.bold("!"));
});
sql.query("CREATE TABLE IF NOT EXISTS `welcome` (`guildid` VARCHAR(32) NOT NULL, `channelid` VARCHAR(32) NOT NULL, UNIQUE(`guildid`));", function (error) {
 if (error) throw new Error(error);
 console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(" Fetched table ") + chalk.blue.underline("welcome") + chalk.cyan.bold("! Status: ") + chalk.blue.bold("Success (OK)") + chalk.cyan.bold("!"));
});
sql.query("CREATE TABLE IF NOT EXISTS `reputation` (`memberid` VARCHAR(32) NOT NULL, `rep` BIGINT NOT NULL, UNIQUE(`memberid`));", function (error) {
 if (error) throw new Error(error);
 console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(" Fetched table ") + chalk.blue.underline("reputation") + chalk.cyan.bold("! Status: ") + chalk.blue.bold("Success (OK)") + chalk.cyan.bold("!"));
});
sql.query("CREATE TABLE IF NOT EXISTS `leave` (`guildid` VARCHAR(32) NOT NULL, `channelid` VARCHAR(32) NOT NULL, UNIQUE(`guildid`));", function (error) {
 if (error) throw new Error(error);
 console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(" Fetched table ") + chalk.blue.underline("leave") + chalk.cyan.bold("! Status: ") + chalk.blue.bold("Success (OK)") + chalk.cyan.bold("!"));
});
sql.query("CREATE TABLE IF NOT EXISTS `giveaways` (`id` INT(1) NOT NULL AUTO_INCREMENT, `message_id` VARCHAR(64) NOT NULL, `data` JSON NOT NULL, PRIMARY KEY (`id`));", (err) => {
 if (err) throw new Error(err);
 console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(" Fetched table ") + chalk.blue.underline("giveaways") + chalk.cyan.bold("! Status: ") + chalk.blue.bold("Success (OK)") + chalk.cyan.bold("!"));
});
