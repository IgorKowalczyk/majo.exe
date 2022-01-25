// Majo.exe
// WIP

// Todo: move all folders to /api | /dashboard | /bot
const chalk = require("chalk");
console.log(chalk.blue.bold(`[==================================]`))
console.log(chalk.blue.bold(`[-------------MAJO.EXE-------------]`))
console.log(chalk.blue.bold(`[==================================]`))

require("dotenv").config();
require("./utilities/checks")

if(!process.env.TOKEN) return console.log(chalk.bold(chalk.red(`[X]`)) + chalk.bold.redBright(` Skipping everything! Token is not provided!`));

if(process.env.RUN_BOT == "true") {
 console.log(chalk.bold(chalk.green(`[✅]`)) + chalk.bold.greenBright(` Running Majo.exe discord bot! `));
 require("./index")
 // require("./bot/index")
} else {
 console.log(chalk.bold(chalk.red(`[X]`)) + chalk.bold.cyan(` Skipping Bot launch! `) + chalk.bold.cyan.dim(`[Set RUN_BOT to "true" in .env]`));
}

if(process.env.RUN_DASHBOARD == "true") {
 console.log(chalk.bold(chalk.green(`[✅]`)) + chalk.bold.greenBright(` Running Majo.exe Dashboard! `));
 require("./dashboard/dashboard")
 //require("./dashboard/index")
} else {
 console.log(chalk.bold(chalk.red(`[X]`)) + chalk.bold.cyan(` Skipping Dashboard launch! `) + chalk.bold.cyan.dim(`[Set RUN_DASHBOARD to "true" in .env]`));
}

if(process.env.RUN_API == "true") {
 console.log(chalk.bold(chalk.green(`[✅]`)) + chalk.bold.greenBright(` Running Majo.exe API! `));
 //require("./api/index")
} else {
 console.log(chalk.bold(chalk.red(`[X]`)) + chalk.bold.cyan(` Skipping API launch! `) + chalk.bold.cyan.dim(`[Set RUN_API to "true" in .env]`));
}
