// Majo.exe

require("dotenv").config();
require("./utilities/ascii");
require("./utilities/requirments");
require("events").EventEmitter.prototype._maxListeners = 100;
require("events").defaultMaxListeners = 100;
const chalk = require("chalk");
const { majo } = require("./client/client");
const client = new majo();
client.log_info();

if (process.argv.includes(`--bot`)) {
 console.log(chalk.green.bold(`[✅]`) + chalk.bold.greenBright(` Running Majo.exe Bot! (1/3) `));
 client.bot();
} else {
 console.log(chalk.red.bold(`[❌]`) + chalk.bold.red(` Skipping Bot launch! (1/3) `) + chalk.bold.red.dim(`[Run script with "--bot" argument]`));
}

if (process.argv.includes(`--dashboard`)) {
 console.log(chalk.green.bold(`[✅]`) + chalk.bold.greenBright(` Running Majo.exe Dashboard! (2/3) `));
} else {
 console.log(chalk.red.bold(`[❌]`) + chalk.bold.red(` Skipping Dashboard launch! (2/3) `) + chalk.bold.red.dim(`[Run script with "--dashboard" argument]`));
}
if (process.argv.includes(`--api`)) {
 console.log(chalk.green.bold(`[✅]`) + chalk.bold.greenBright(` Running Majo.exe API! (3/3) `));
} else {
 console.log(chalk.red.bold(`[❌]`) + chalk.bold.red(` Skipping API launch! (3/3) `) + chalk.bold.red.dim(`[Run script with "--api" argument]`));
}

// WIP | /web/web.js
if (process.argv.includes(`--dashboard`) || process.argv.includes(`--api`)) client.web();
client.login();
