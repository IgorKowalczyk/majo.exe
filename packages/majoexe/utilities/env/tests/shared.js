const chalk = require("chalk");

module.exports = async () => {
 if (!process.env.TOKEN) console.log(chalk.blue.bold("[DEBUG]") + chalk.red.bold(` Missing process.env.TOKEN!`));
 if (!process.env.ERRORS_WEBHOOK) console.log(chalk.blue.bold("[DEBUG]") + chalk.red.bold(` Missing process.env.ERRORS_WEBHOOK!`));
 if (!process.env.MYSQL_DATABASE && (process.argv.includes("--bot") || process.argv.includes("--dashboard"))) console.log(chalk.blue.bold("[DEBUG]") + chalk.red.bold(` Missing process.env.MYSQL_DATABASE!`));
 if (!process.env.MYSQL_HOST && (process.argv.includes("--bot") || process.argv.includes("--dashboard"))) console.log(chalk.blue.bold("[DEBUG]") + chalk.red.bold(` Missing process.env.MYSQL_HOST!`));
 if (!process.env.MYSQL_USER && (process.argv.includes("--bot") || process.argv.includes("--dashboard"))) console.log(chalk.blue.bold("[DEBUG]") + chalk.red.bold(` Missing process.env.MYSQL_USER!`));
 if (!process.env.MYSQL_PASSWORD && (process.argv.includes("--bot") || process.argv.includes("--dashboard"))) console.log(chalk.blue.bold("[DEBUG]") + chalk.red.bold(` Missing process.env.MYSQL_PASSWORD!`));
 if (!process.env.AMEAPI && (process.argv.includes("--bot") || process.argv.includes("--dashboard"))) console.log(chalk.blue.bold("[DEBUG]") + chalk.red.bold(` Missing process.env.AMEAPI!`));
 if (!process.env.DOMAIN && (process.argv.includes("--api") || process.argv.includes("--dashboard"))) console.log(chalk.blue.bold("[DEBUG]") + chalk.red.bold(` Missing process.env.DOMAIN!`));
 if (!process.env.PORT && (process.argv.includes("--api") || process.argv.includes("--dashboard"))) console.log(chalk.blue.bold("[DEBUG]") + chalk.red.bold(` Missing process.env.PORT!`));
};
