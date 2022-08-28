const colors = require("colors/safe");
const chalk = require("chalk");
const { version } = require("../../package.json");

// Kurwa, jest w pyte
console.log(
 colors.rainbow(`
__  __        _                   
|  \\/  |__ _ (_)___   _____ _____ 
| |\\/| / _\` || / _ \\_/ -_) \\ / -_)
|_|  |_\\__,_|/ \___(_)___/_\\_\\___|
           |__/                   
`)
);
console.log(chalk.blue.bold(`[MAJO.EXE]`) + chalk.bold.cyan(` Current stable version: `) + chalk.bold.blue.underline(`v${version}`));
console.log(chalk.blue.bold(`[MAJO.EXE]`) + chalk.bold.cyan(` Join Majo.exe support server: `) + chalk.bold.blue.underline(`https://discord.gg/bVNNHuQ`));
console.log(chalk.blue.bold(`[MAJO.EXE]`) + chalk.bold.cyan(` Remember to star our repository: `) + chalk.bold.blue.underline(`https://github.com/IgorKowalczyk/majo.exe`));
