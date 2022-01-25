// Majo.exe
// WIP

// Todo: move all folders to /api | /dashboard | /bot
const chalk = require("chalk");
console.log(chalk.blue.bold(`[==================================]`))
console.log(chalk.blue.bold(`[-------------MAJO.EXE-------------]`))
console.log(chalk.blue.bold(`[==================================]`))

require("./utilities/checks")

if(process.env.RUN_BOT == true) {
 require("./index")
 // require("./bot/index")
} else {
 console.log(chalk.bold(chalk.red(`[X]`)) + chalk.bold.cyan(` Skipping Bot launch!`));
}

if(process.env.RUN_DASHBOARD == true) {
 require("./dashboard/dashboard")
 //require("./dashboard/index")
} else {
 console.log(chalk.bold(chalk.red(`[X]`)) + chalk.bold.cyan(` Skipping Dashboard launch!`));
}

if(process.env.RUN_API == true) {
 require("./api/index")
} else {
 console.log(chalk.bold(chalk.red(`[X]`)) + chalk.bold.cyan(` Skipping API launch!`));
}
