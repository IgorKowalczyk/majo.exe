import chalk from "chalk";

export function color_ready() {
 return chalk.green(`ready`) + ` -`;
}

export function color_event() {
 return chalk.magenta(`event`) + ` -`;
}

export function color_info() {
 return chalk.cyan(`info`) + ` -`;
}

export function color_warn() {
 return chalk.yellow(`warn`) + ` -`;
}

export default chalk;
