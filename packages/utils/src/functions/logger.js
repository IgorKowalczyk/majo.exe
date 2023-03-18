import chalk from "chalk";

const colors = {
 info: "cyan",
 event: "magenta",
 error: "red",
 warn: "yellow",
 ready: "green",
};

/**
 * @param {string} type The type of the log
 * @param {...any} args The arguments to log
 * @returns {string} The colored log message
 * @example Logger("info", "Hello world!")
 */
export function Logger(type, ...args) {
 return chalk[colors[type] || "white"](type + " ") + chalk.white("- " + args.join(" "));
}
