import { dashboardConfig } from "@majoexe/config";
import prismaClient from "@majoexe/database";
import Balancer from "react-wrap-balancer";
import { Block } from "@/components/Block";
import { DiscordCommands } from "@/components/client/commandModules/DiscordCommands";
import Image from "@/components/client/shared/Image";
import { Header1 } from "@/components/Headers";
import { APIApplicationCommandOption } from "discord-api-types/v10";

export const revalidate = 3600; // 1 hour

export const metadata = {
 title: "Commands",
 description: "A list of all the commands available for Majo.exe.",
};

type ExtendedApplicationCommandOptionData = APIApplicationCommandOption & { usage?: string };

interface Command {
 name: string;
 description: string;
 options: ExtendedApplicationCommandOptionData[];
 categoryName: string;
}

export default async function CommandsPage() {
 const databaseCommands = (await prismaClient.commands.findMany({})) as unknown as Command[];
 const categories = await prismaClient.commandCategories.findMany({});

 const subCommands: Command[] = [];

 let commands = databaseCommands.map((command) => {
  command.options = command.options.map((option) => {
   if (option.type === 1) {
    subCommands.push({
     ...option,
     categoryName: command.categoryName,
     name: command.name + " " + option.name,
     options: option.options || [],
    });
   } else if (option.type === 2) {
    option.options = option.options?.map((subOptions) => {
     if (subOptions?.type === 1) {
      subCommands.push({
       ...subOptions,
       categoryName: command.categoryName,
       name: command.name + " " + option.name + " " + subOptions.name,
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

 commands = commands.filter((command) => !command.options?.some((option) => option.type === 1 || option.type === 2));

 const newCommands = [...commands, ...subCommands];

 return (
  <div className="flex w-full flex-col items-center px-8 pb-8 pt-16 antialiased md:p-16">
   <div className="flex flex-col justify-center gap-4">
    <Image src={dashboardConfig.logo} alt="Majo.exe logo" quality={100} width={112} height={112} className="mx-auto size-28 min-h-28 min-w-28 rounded-full" />
    <Header1 className="!mb-0 !justify-center bg-gradient-to-b from-white to-neutral-400 box-decoration-clone bg-clip-text !text-center !font-black text-fill-transparent">Majo.exe Commands</Header1>
    <p className="max-w-3xl text-center text-xl text-white/50">
     <Balancer>
      Check out all the commands available for Majo.exe. There are currently <span className="text-accent-primary">{newCommands.length}</span> commands in <span className="text-accent-primary">{categories.length}</span> categories.
     </Balancer>
    </p>
   </div>
   <Block className="mt-8 w-full max-w-4xl">
    <DiscordCommands commands={newCommands} categories={categories} />
   </Block>
  </div>
 );
}
