import chalk from "chalk";

const colors: Record<"info" | "event" | "error" | "warn" | "ready" | "cron", string> = {
 info: "cyan",
 event: "magenta",
 error: "red",
 warn: "yellow",
 ready: "green",
 cron: "blue",
};

export function Logger(type: keyof typeof colors, ...args: (string | unknown)[]) {
 const longest = Object.keys(colors).reduce((long, str) => Math.max(long, str.length), 0);

 console.log((chalk as any)[colors[type] || "white"](type + " ".repeat(longest - type.length)) + chalk.white(" - " + args.join(" ")));
}

export { chalk };
