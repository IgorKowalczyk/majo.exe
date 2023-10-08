import { globby } from "globby";
import prismaClient from "./client.js";
import { Logger } from "./logger.js";

/* Yeah... I know, the code is a mess, but it works. When it doesn't message me on Discord: @majonezexe */
/* Im too tired to make it look and work better, so I'll just leave it like this for now. */

Logger("event", "Seeding database...");
const time = performance.now();
const commandsData = [];
const categoriesData = [];
const categories = await globby("../../apps/bot/commands/*", { onlyDirectories: true });

for (const value of categories) {
 const category = value.split("/")[value.split("/").length - 1];

 categoriesData.push({
  where: { name: category },
  update: { name: category },
  create: {
   name: category,
  },
 });
}

Logger("event", `Seeding ${categoriesData.length} categories...`);
await prismaClient.$transaction(categoriesData.map((x) => prismaClient.commandCategories.upsert(x)));

const slashCommands = await globby("../../apps/bot/commands/**/*.js");

for (const value of slashCommands) {
 const file = await import("../" + value);
 const { default: slashCommand } = file;

 if (!slashCommand) continue;
 const { name, description, type, run, options } = slashCommand;
 if (!name || !description || !type || !run) continue;

 const category = value.split("/")[value.split("/").length - 2];

 commandsData.push({
  update: {
   name,
   description,
   options: options || [],
   category: {
    connect: {
     name: category,
    },
   },
  },
  where: { name },
  create: {
   name,
   description,
   options: options || [],
   category: {
    connect: {
     name: category,
    },
   },
  },
 });
}

Logger("event", `Seeding ${commandsData.length} commands...`);
await prismaClient.$transaction(commandsData.map((x) => prismaClient.commands.upsert(x)));

Logger("ready", `Seeded database in ${Math.floor((performance.now() - time) / 1000)}s`);

process.exit(0);
