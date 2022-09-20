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

export default chalk;
