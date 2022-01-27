// Majo.exe

const chalk = require("chalk");
require("dotenv").config();
require("./utilities/ascii");
require("./utilities/checks");

console.log(process.argv.includes( `--bot` ))
if (!process.env.TOKEN) return console.log(chalk.bold(chalk.red(`[X]`)) + chalk.bold.redBright(` Skipping everything! Token is not provided!`));

console.log(chalk.bold(chalk.blue(`[❔]`) + chalk.cyan(` Green`) + chalk.green(` ">" `) + chalk.cyan(`= logs from Majo.exe Bot`)));
console.log(chalk.bold(chalk.blue(`[❔]`) + chalk.cyan(` Magenta`) + chalk.magenta(` ">" `) + chalk.cyan(`= logs from Majo.exe Dashboard`)));
console.log(chalk.bold(chalk.blue(`[❔]`) + chalk.cyan(` Red`) + chalk.red(` ">" `) + chalk.cyan(`= logs from Majo.exe API`)));
if (process.argv.includes(`--bot`)) {
 console.log(chalk.bold(chalk.green(`[✅]`)) + chalk.bold.greenBright(` Running Majo.exe Bot! (1/3) `));
 require("./bot/index");
} else {
 console.log(chalk.bold(chalk.red(`[❌]`)) + chalk.bold.red(` Skipping Bot launch! (1/3) `) + chalk.bold.red.dim(`[Run script with "--bot" argument]`));
}

if (process.argv.includes(`--dashboard`)) {
 console.log(chalk.bold(chalk.green(`[✅]`)) + chalk.bold.greenBright(` Running Majo.exe Dashboard! (2/3) `));
 require("./dashboard/dashboard");
} else {
 console.log(chalk.bold(chalk.red(`[❌]`)) + chalk.bold.red(` Skipping Dashboard launch! (2/3) `) + chalk.bold.red.dim(`[Run script with "--dashboard" argument]`));
}

if (process.argv.includes(`--api`)) {
 console.log(chalk.bold(chalk.green(`[✅]`)) + chalk.bold.greenBright(` Running Majo.exe API! (3/3) `));
 //require("./api/index")
} else {
 console.log(chalk.bold(chalk.red(`[❌]`)) + chalk.bold.red(` Skipping API launch! (3/3) `) + chalk.bold.red.dim(`[Run script with "--api" argument]`));
}
