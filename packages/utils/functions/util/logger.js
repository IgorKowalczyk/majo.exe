import chalk from "chalk";

const colors = {
 info: "cyan",
 event: "magenta",
 error: "red",
 warn: "yellow",
 ready: "green",
};

const types = ["info", "event", "error", "warn", "ready"];

const longest = types.reduce((long, str) => Math.max(long, str.length), 0);

/**
 * @param {string} type The type of the log
 * @param {...any} args The arguments to log
 * @returns {string} The colored log message
 * @example Logger("info", "Hello world!")
 */
export function Logger(type, ...args) {
 console.log(chalk[colors[type] || "white"](type + " ".repeat(longest - type.length)) + chalk.white(" - " + args.join(" ")));
}

export { chalk };
