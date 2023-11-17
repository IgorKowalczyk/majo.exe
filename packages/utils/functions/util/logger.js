import chalk from "chalk";

const colors = {
 info: "cyan",
 event: "magenta",
 error: "red",
 warn: "yellow",
 ready: "green",
 cron: "blue",
};

const types = ["info", "event", "error", "warn", "ready", "cron"];

const longest = types.reduce((long, str) => Math.max(long, str.length), 0);

/**
 * Logs a message to the console with a colored log type.
 *
 * @param {"info" | "event" | "error" | "warn" | "ready" | "cron"* } type - The type of log.
 * @param {...string} args - The message to log.
 */
export function Logger(type, ...args) {
 console.log(chalk[colors[type] || "white"](type + " ".repeat(longest - type.length)) + chalk.white(" - " + args.join(" ")));
}

export { chalk };
