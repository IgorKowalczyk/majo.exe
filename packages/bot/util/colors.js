import chalk from "chalk";

export function colorReady() {
 return chalk.green(`ready`) + ` -`;
}

export function colorEvent() {
 return chalk.magenta(`event`) + ` -`;
}

export function colorInfo() {
 return chalk.cyan(`info`) + ` -`;
}

export function colorWarn() {
 return chalk.yellow(`warn`) + ` -`;
}

export default chalk;
