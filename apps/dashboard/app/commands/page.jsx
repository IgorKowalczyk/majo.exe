import { CommandLineIcon } from "@heroicons/react/24/outline";
import { getSlashCommands } from "@majoexe/util/functions";
import { Block } from "@/components/blocks/Block";
import { DiscordCommands } from "@/components/blocks/client/DiscordCommands";
import { Header1 } from "@/components/blocks/Headers";
import prismaClient from "@majoexe/database";

export const metadata = {
 title: "Commands",
 description: "A list of all the commands available for Majo.exe.",
};

export default async function Commands() {
 let commands = await prismaClient.commands.findMany({});
 const categories = await prismaClient.commandCategories.findMany({});

 let subCommands = [];
 commands.map((command) => {
  command.options = command.options.map((option) => {
   if (option.type === 1) {
    subCommands.push({
     ...option,
     categoryName: command.categoryName,
     name: command.name + " " + option.name,
    });
   } else if (option.type === 2) {
    option.options = option.options.map((subOptions) => {
     if (subOptions?.type === 1) {
      subCommands.push({
       ...subOptions,
       categoryName: command.categoryName,
       name: command.name + " " + option.name + " " + subOptions.name,
      });
     }
    });
   }
   return option;
  });
  return command;
 });

 commands = commands.filter((command) => !command.options?.some((option) => option.type === 1 || option.type === 2));

 const newCommands = [...commands, ...subCommands];

 return (
  <div className="bg-background-primary flex w-full flex-col items-center px-8 pb-8 pt-16 antialiased md:px-16 md:py-16">
   <div className="flex flex-col justify-center gap-4">
    <Header1 className={"mb-0 justify-center"}>
     <CommandLineIcon className="h-10 w-10" aria-hidden="true" role="img" />
     Majo.exe Commands
    </Header1>
    <p className="text-center text-xl text-white/50">
     There are currently <span className="text-accent-primary">{newCommands.length}</span> commands in <span className="text-accent-primary">{categories.length}</span> categories.
    </p>
   </div>
   <Block className="mt-8 w-full max-w-3xl">
    <DiscordCommands commands={newCommands} categories={categories} />
   </Block>
  </div>
 );
}
