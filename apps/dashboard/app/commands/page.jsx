import { CommandLineIcon } from "@heroicons/react/24/outline";
import { getSlashCommands } from "@majoexe/util/functions";
import { ClientDisclosure } from "@/components/blocks/client/Disclosure";
import { Header1 } from "@/components/blocks/Headers";

export default async function Commands() {
 let commands = await getSlashCommands();

 let subCommands = [];
 commands.map((command) => {
  command.options = command.options?.map((option) => {
   if (option.type === 1) {
    subCommands.push({
     ...option,
     name: command.name + " " + option.name,
    });
   }
   return option;
  });
  return command;
 });

 commands = commands.filter((command) => !command.options?.some((option) => option.type === 1));

 commands = [...commands, ...subCommands];

 return (
  <div className="flex w-full flex-col items-center bg-background-primary px-8 pb-8 pt-16 antialiased md:px-16 md:py-16">
   <div className="flex flex-col justify-center gap-4">
    <Header1 className={"mb-0 justify-center"}>
     <CommandLineIcon className="h-10 w-10" aria-hidden="true" role="img" />
     Majo.exe Commands
    </Header1>
    <p className="text-center text-xl text-white/50">
     There are currently <span className="text-accent-primary">{commands.length}</span> commands available.
    </p>
   </div>
   {commands.map((command) => (
    <ClientDisclosure
     key={command.name}
     buttonElements={
      <>
       <h3 className="flex items-center gap-2 text-center text-xl font-bold">
        /{command.name}{" "}
        {command.options && (
         <span className="text-sm text-white/50">
          ({command.options.length} argument{command.options.length === 1 ? "" : "s"})
         </span>
        )}
       </h3>
      </>
     }
    >
     <p>{command.description}</p>
     {command.options && (
      <div className="mt-2 border-t border-t-neutral-800 pt-2">
       /{command.name}
       {command.options.map((option) => (
        <span key={option.name} className="ml-2">
         <code className="cursor-pointer" title={`${option.description} ${option.required ? "(required)" : "(optional)"}`}>
          {option.name}
          {option.required ? <span className="text-red-400">*</span> : ""}
         </code>
        </span>
       ))}
      </div>
     )}
    </ClientDisclosure>
   ))}
  </div>
 );
}
