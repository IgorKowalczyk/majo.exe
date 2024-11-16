import { readDir } from "@majoexe/util/functions/files/readDir.js";
import { type ApplicationCommandOption, ApplicationCommandOptionType } from "discord.js";
import type { Majobot } from "@/index";
import type { SlashCommand } from "@/util/types/Command";

export default async function loadCommands(client: Majobot): Promise<void> {
 try {
  const commandLoadTime = performance.now();
  const slashCommands = readDir(`${process.cwd()}/commands/`, true, ["js", "ts"]);

  for (const value of slashCommands) {
   try {
    const file = await import(value);
    const { default: slashCommand } = file as { default: SlashCommand };

    if (!slashCommand) {
     client.debugger("error", `Slash command ${value} doesn't have a default export!`);
     continue;
    }

    const { name, description, type, options } = slashCommand;
    if (!name || !description || !type) {
     client.debugger("error", `Slash command ${value} is missing required properties!`);
     continue;
    }

    const category = value.split("/")[value.split("/").length - 2] as string;

    const commandData = {
     ...slashCommand,
     category,
     options: options || [],
    };

    client.slashCommands.set(name, commandData);

    if (options) {
     options.forEach((option: ApplicationCommandOption) => {
      if (option.type === ApplicationCommandOptionType.Subcommand || option.type === ApplicationCommandOptionType.SubcommandGroup) {
       if (client.config.displayCommandList) client.debugger("info", `Loaded slash subcommand ${option.name} from ${value.replace(process.cwd(), "")}`);

       client.additionalSlashCommands++;
      }
     });
    }

    if (client.config.displayCommandList) client.debugger("info", `Loaded slash command ${name} from ${value.replace(process.cwd(), "")}`);
   } catch (error: unknown) {
    client.debugger("error", `Error loading slash command ${value}: ${error}`);
   }
  }

  client.debugger("event", `Loaded ${client.slashCommands.size + client.additionalSlashCommands} slash commands from /commands in ${client.performance(commandLoadTime)}`);
 } catch (error: unknown) {
  client.debugger("error", `Error loading slash commands: ${error}`);
 }
}
