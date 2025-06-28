import { readdirSync } from "node:fs";
import prismaClient from "./client";
import { Logger } from "./logger";
import type { Prisma } from "./types";

const upsertCategoriesAndCommands = async (categoriesData: Prisma.CommandCategoriesUpsertArgs[], commandsData: Prisma.CommandsUpsertArgs[]) => {
 Logger("event", `Upserting ${categoriesData.length} categories and ${commandsData.length} commands...`);
 await prismaClient.$transaction([...categoriesData.map((x) => prismaClient.commandCategories.upsert(x)), ...commandsData.map((x) => prismaClient.commands.upsert(x))]);
 await prismaClient.$disconnect();
};

const categoriesData: Prisma.CommandCategoriesUpsertArgs[] = [];

const categories = readdirSync("../../apps/bot/commands", { withFileTypes: true })
 .filter((dir) => dir.isDirectory())
 .map((dir) => dir.name);
const categoryNames = categories.map((x) => x.split("/")[x.split("/").length - 1]);
for (const category of categoryNames) {
 categoriesData.push({
  where: { name: category },
  update: { name: category },
  create: {
   name: category || "",
  },
 });
}

const slashCommandsDirectories = readdirSync("../../apps/bot/commands", { withFileTypes: true }).filter((dir) => dir.isDirectory());
const slashCommands: string[] = [];

for (const dir of slashCommandsDirectories) {
 const commands = readdirSync("../../apps/bot/commands/" + dir.name, { withFileTypes: true }).filter(
  (file) => file.isFile() && (file.name.endsWith(".js") || file.name.endsWith(".ts"))
 );
 for (const command of commands) {
  slashCommands.push("../../apps/bot/commands/" + dir.name + "/" + command.name);
 }
}

const commandsData: Prisma.CommandsUpsertArgs[] = [];
for (const slashCommand of slashCommands) {
 (async () => {
  const file = await import("../" + slashCommand);
  const { default: command } = file;

  if (!command) return;
  const { name, description, type, run, options } = command;
  if (!name || !description || !type || !run) return;

  const category = slashCommand.split("/")[slashCommand.split("/").length - 2];

  commandsData.push({
   where: { name },
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
 })().catch((err) => {
  Logger("error", `Failed to import command: ${slashCommand}: ${err}`);
 });
}

(async () => {
 const time = performance.now();
 await upsertCategoriesAndCommands(categoriesData, commandsData);

 const perf = Math.floor((performance.now() - time) / 1000);
 Logger("ready", `Seeded database in ${perf}s`);
})().catch((err) => {
 Logger("error", `Failed to seed database: ${err}`);
});

//process.exit(0);
