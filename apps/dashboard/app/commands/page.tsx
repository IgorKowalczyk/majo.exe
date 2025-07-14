import { dashboardConfig } from "@majoexe/config";
import prismaClient from "@majoexe/database";
import { ApplicationCommandOptionType } from "discord-api-types/v10";
import Balancer from "react-wrap-balancer";
import { DiscordCommands } from "@/components/client/commands/DiscordCommands";
import { Block } from "@/components/ui/Block";
import Header, { headerVariants } from "@/components/ui/Headers";
import Image from "@/components/ui/Image";
import { Command } from "@/lib/types";
import { cn } from "@/lib/utils";

export const revalidate = 3600; // 1 hour

export const metadata = {
 title: "Commands",
 description: "A list of all the commands available for Majo.exe.",
};

export default async function CommandsPage() {
 const databaseCommands = (await prismaClient.commands.findMany({})) as unknown as Command[];
 const categories = await prismaClient.commandCategories.findMany({});

 const subCommands: Command[] = [];

 let commands = databaseCommands.map((command) => {
  command.options = command.options.map((option) => {
   if (option.type === ApplicationCommandOptionType.Subcommand) {
    subCommands.push({
     ...option,
     categoryName: command.categoryName,
     name: `${command.name} ${option.name}`,
     options: option.options || [],
    });
   } else if (option.type === ApplicationCommandOptionType.SubcommandGroup) {
    option.options = option.options?.map((subOptions) => {
     if (subOptions.type === ApplicationCommandOptionType.Subcommand) {
      subCommands.push({
       ...subOptions,
       categoryName: command.categoryName,
       name: `${command.name} ${option.name} ${subOptions.name}`,
       options: subOptions.options || [],
      });
     }
     return subOptions;
    });
   }
   return option;
  });
  return command;
 });

 commands = commands.filter(
  (command) => !command.options.some((option) => option.type === ApplicationCommandOptionType.Subcommand || option.type === ApplicationCommandOptionType.SubcommandGroup)
 );

 const newCommands = [...commands, ...subCommands];

 return (
  <div className="flex w-full flex-col items-center px-8 pb-8 pt-16 antialiased md:p-16">
   <div className="flex flex-col justify-center gap-3">
    <Image src={dashboardConfig.logo} alt="Majo.exe logo" quality={100} width={112} height={112} className="mx-auto size-28 shrink-0 rounded-full" />
    <Header className={cn(headerVariants({ variant: "h1", alignment: "center", effects: "gradient" }))}>Majo.exe Commands</Header>
    <p className="max-w-3xl text-center text-xl text-white/50">
     <Balancer>
      Check out all the commands available for Majo.exe. There are currently <span className="text-accent-primary">{newCommands.length}</span> commands in{" "}
      <span className="text-accent-primary">{categories.length}</span> categories.
     </Balancer>
    </p>
   </div>
   <Block className="mt-8 w-full max-w-4xl">
    <DiscordCommands commands={newCommands} categories={categories} />
   </Block>
  </div>
 );
}
