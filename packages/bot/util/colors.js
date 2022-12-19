import { Chalk } from 'chalk';
const customChalk = new Chalk({level: 2});

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
