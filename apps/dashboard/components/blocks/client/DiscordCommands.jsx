"use client";

import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Tooltip } from "./Tooltip";
import { ClientDisclosure } from "@/components/blocks/client/Disclosure";
import { InputWithIcon } from "@/components/blocks/Input";

export function DiscordCommands({ commands }) {
 const [search, setSearch] = useState("");

 const filteredCommands = commands.filter((command) => command.name.toLowerCase().includes(search.toLowerCase()));

 return (
  <>
   <InputWithIcon placeholder="Search commands..." value={search} onChange={(e) => setSearch(e.target.value)} icon={<MagnifyingGlassIcon className="h-5 w-5 text-white/50" aria-hidden="true" role="img" />} />
   {filteredCommands.length === 0 ? (
    <div className="mt-8 flex flex-col items-center justify-center gap-2">
     <h3 className="flex items-center text-center text-xl font-bold">
      <XCircleIcon className="mr-2 h-6 min-h-[24px] w-6 min-w-[24px] text-red-400" aria-hidden="true" role="img" />
      No commands found.
     </h3>
     <p className="text-center text-white/50">Try searching for something else.</p>
    </div>
   ) : (
    <>
     {filteredCommands.map((command) => (
      <ClientDisclosure
       key={command.name}
       buttonIcon={
        <svg className="fill-neutral-500" width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path fill-rule="evenodd" clip-rule="evenodd" d="M3.11111 0C1.39289 0 0 1.39289 0 3.11111V24.8889C0 26.6072 1.39289 28 3.11111 28H24.8889C26.6072 28 28 26.6072 28 24.8889V3.11111C28 1.39289 26.6072 0 24.8889 0H3.11111ZM21.6214 8.42207L19.4216 6.22219L6.22222 19.4216L8.4221 21.6214L21.6214 8.42207Z"></path>
        </svg>
       }
       buttonElements={
        <>
         <h3 className="hide-scrollbar flex items-center gap-2 overflow-scroll whitespace-nowrap text-center">
          /{command.name}{" "}
          {command.options &&
           command.options.map((option) => (
            <span key={option.name} className="ml-2">
             <Tooltip content={`${option.description} ${option.required ? "(required)" : "(optional)"}`}>
              <code className="cursor-pointer">
               {option.name}
               {option.required ? <span className="text-red-400">*</span> : ""}
              </code>
             </Tooltip>
            </span>
           ))}
         </h3>
        </>
       }
      >
       <p>{command.description}</p>
      </ClientDisclosure>
     ))}
    </>
   )}
  </>
 );
}
