import { CommandLineIcon } from "@heroicons/react/24/outline";
import { getSlashCommands } from "@majoexe/util/functions";
import { ClientDisclosure } from "@/components/blocks/client/Disclosure";
import { Header1 } from "@/components/blocks/Headers";

export const metadata = {
 title: "Commands",
 description: "A list of all the commands available for Majo.exe.",
};

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
   } else if (option.type === 2) {
    option.options = option.options?.map((subOptions) => {
     if (subOptions.type === 1) {
      subCommands.push({
       ...subOptions,
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
     buttonIcon={
      <svg className="fill-neutral-500" width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path fill-rule="evenodd" clip-rule="evenodd" d="M3.11111 0C1.39289 0 0 1.39289 0 3.11111V24.8889C0 26.6072 1.39289 28 3.11111 28H24.8889C26.6072 28 28 26.6072 28 24.8889V3.11111C28 1.39289 26.6072 0 24.8889 0H3.11111ZM21.6214 8.42207L19.4216 6.22219L6.22222 19.4216L8.4221 21.6214L21.6214 8.42207Z"></path>
      </svg>
     }
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
