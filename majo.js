// Majo.exe
// WIP

// Todo: move all folders to /api | /dashboard | /bot
const chalk = require("chalk");
require("dotenv").config();
require("./utilities/ascii");
require("./utilities/checks");

if (!process.env.TOKEN) return console.log(chalk.bold(chalk.red(`[X]`)) + chalk.bold.redBright(` Skipping everything! Token is not provided!`));

console.log(chalk.bold(chalk.blue(`[❔]`) + chalk.cyan(` Green`) + chalk.green(` ">" `) + chalk.cyan(`= logs from Majo.exe Bot`)));
console.log(chalk.bold(chalk.blue(`[❔]`) + chalk.cyan(` Magenta`) + chalk.magenta(` ">" `) + chalk.cyan(`= logs from Majo.exe Dashboard`)));
console.log(chalk.bold(chalk.blue(`[❔]`) + chalk.cyan(` Red`) + chalk.red(` ">" `) + chalk.cyan(`= logs from Majo.exe API`)));
if (process.env.RUN_BOT == "true") {
 console.log(chalk.bold(chalk.green(`[✅]`)) + chalk.bold.greenBright(` Running Majo.exe Bot! (1/3) `));
 require("./bot/index");
} else {
 console.log(chalk.bold(chalk.red(`[❌]`)) + chalk.bold.red(` Skipping Bot launch! (1/3) `) + chalk.bold.red.dim(`[Set RUN_BOT to "true" in .env]`));
}

if (process.env.RUN_DASHBOARD == "true") {
 console.log(chalk.bold(chalk.green(`[✅]`)) + chalk.bold.greenBright(` Running Majo.exe Dashboard! (2/3) `));
 require("./dashboard/dashboard");
 //require("./dashboard/index")
} else {
 console.log(chalk.bold(chalk.red(`[❌]`)) + chalk.bold.red(` Skipping Dashboard launch! (2/3) `) + chalk.bold.red.dim(`[Set RUN_DASHBOARD to "true" in .env]`));
}

if (process.env.RUN_API == "true") {
 console.log(chalk.bold(chalk.green(`[✅]`)) + chalk.bold.greenBright(` Running Majo.exe API! (3/3) `));
 //require("./api/index")
} else {
 console.log(chalk.bold(chalk.red(`[❌]`)) + chalk.bold.red(` Skipping API launch! (3/3) `) + chalk.bold.red.dim(`[Set RUN_API to "true" in .env]`));
}
