import { PermissionsBitField, Collection } from "discord.js";
import { globby } from "globby";

export default async function loadCommands(client) {
 const loadTime = performance.now();
 client.slashCommands = new Collection();
 client.additionalSlashCommands = 0;

 const slashCommands = await globby(`${process.cwd()}/commands/**/*.js`);
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
    options: options || null,
    /* eslint-disable-next-line camelcase */
    default_member_permissions: default_member_permissions ? PermissionsBitField.resolve(default_member_permissions).toString() : null,
   };

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
 client.debugger("event", `Loaded ${client.slashCommands.size + client.additionalSlashCommands} slash commands from /commands in ${client.performance(loadTime)}`);
}
