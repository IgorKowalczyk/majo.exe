/* eslint-disable camelcase */
import { readDir } from "@nyxia/util/functions/files/readDir.js";
import { PermissionsBitField, Collection } from "discord.js";

/**
 * Loads all slash commands from the /commands folder
 *
 * @param {object} client - The Discord client
 * @returns {Promise<void>} Promise that resolves when all slash commands are loaded
 * @throws {Error} Error that is thrown if a slash command could not be loaded
 */
export default async function loadCommands(client) {
 client.slashCommands = new Collection();
 client.additionalSlashCommands = 0;

 const commandLoadTime = performance.now();
 const slashCommands = readDir(`${process.cwd()}/commands/`, true, ["js"]);

 for (const value of slashCommands) {
  try {
   const file = await import(value);
   const { default: slashCommand } = file;

   if (!slashCommand) {
    client.debugger("error", `Slash command ${value} doesn't have a default export!`);
    continue;
   }

   const { name, description, type, run, options, default_member_permissions } = slashCommand;

   if (!name || !description || !type || !run) {
    client.debugger("error", `Slash command ${value} is missing required properties!`);
    continue;
   }

   const category = value.split("/")[value.split("/").length - 2];

   const commandData = {
    ...slashCommand,
    category,
    options: options || [],
   };

   if (default_member_permissions) commandData.default_member_permissions = PermissionsBitField.resolve(default_member_permissions).toString();

   client.slashCommands.set(name, commandData);

   if (options) {
    options.forEach((option) => {
     if (option.type === 1) {
      client.config.displayCommandList && client.debugger("info", `Loaded slash subcommand ${option.name} from ${value.replace(process.cwd(), "")}`);
      client.additionalSlashCommands++;
     }
    });
   }

   client.config.displayCommandList && client.debugger("info", `Loaded slash command ${name} from ${value.replace(process.cwd(), "")}`);
  } catch (error) {
   client.debugger("error", `Error loading slash command ${value}: ${error.message}`);
  }
 }

 client.debugger("event", `Loaded ${client.slashCommands.size + client.additionalSlashCommands} slash commands from /commands in ${client.performance(commandLoadTime)}`);
}
