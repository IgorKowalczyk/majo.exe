"use client";
import { ArrowPathIcon, CheckIcon, MagnifyingGlassIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useEffect, useState, useMemo } from "react";
import { InputSkeleton, TextSkeleton } from "../Skeletons";
import { Tooltip } from "./Tooltip";
import { ClientDisclosure } from "@/components/blocks/client/Disclosure";
import { InputWithIcon } from "@/components/blocks/Input";

export function DiscordCommands({ commands, categories }) {
 const [filteredCategories, setFilteredCategories] = useState([]);
 const [search, setSearch] = useState("");
 const [mounted, setMounted] = useState(false);

 const filteredCommands = useMemo(() => {
  return commands.filter((command) => command.name.toLowerCase().includes(search.toLowerCase() || "") && filteredCategories?.some((category) => category.name === command.categoryName));
 }, [search, commands, filteredCategories]);

 useEffect(() => {
  if (filteredCategories === categories) {
   return;
  }

  setFilteredCategories(categories);
 }, [categories, filteredCategories]);

 useEffect(() => {
  setMounted(true);
 }, []);

 if (!mounted) {
  return (
   <>
    <InputSkeleton className="w-full !max-w-none" />

    <div className="mt-8 flex flex-wrap gap-2">
     {Array.from({ length: 8 }).map((_, i) => (
      <TextSkeleton
       key={i}
       className="!h-[42px]"
       style={{
        width: `${Math.floor(Math.random() * (150 - 64 + 1) + 64)}px !important`,
       }}
      />
     ))}
    </div>

    <div className="mt-8 flex flex-col items-center justify-center gap-2">
     <h3 className="flex items-center text-center text-xl font-bold">
      <ArrowPathIcon className="min-h-6 min-w-6 mr-2 h-6 w-6 animate-spin" aria-hidden="true" role="img" />
      Loading commands...
     </h3>
     <p className="text-center text-white/50">This may take a few seconds.</p>
    </div>
   </>
  );
 }

 return (
  <>
   <InputWithIcon placeholder="Search commands..." value={search} onChange={(e) => setSearch(e.target.value)} icon={<MagnifyingGlassIcon className="min-h-5 min-w-5 h-5 w-5 text-white/50" aria-hidden="true" role="img" />} />
   <div className="mt-8 flex flex-wrap gap-2">
    {categories.map((category) => (
     <div
      key={category.name}
      className={clsx(
       {
        "bg-background-secondary": filteredCategories?.includes(category),
        "opacity-50": !filteredCategories?.includes(category),
       },
       "flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-800 px-4 py-2"
      )}
      onClick={() => {
       if (filteredCategories.includes(category)) {
        setFilteredCategories(filteredCategories?.filter((c) => c !== category));
       } else {
        setFilteredCategories([...filteredCategories, category]);
       }
      }}
     >
      {filteredCategories?.includes(category) ? <CheckIcon className="text-accent-primary min-h-5 min-w-5 h-5 w-5" aria-hidden="true" role="img" /> : <XMarkIcon className="min-h-5 min-w-5 h-5 w-5 text-red-400/50" aria-hidden="true" role="img" />}
      {category.name}
     </div>
    ))}
   </div>
   {filteredCommands.length === 0 ? (
    <div className="mt-8 flex flex-col items-center justify-center gap-2">
     <h3 className="flex items-center text-center text-xl font-bold">
      <XCircleIcon className="min-h-6 min-w-6 mr-2 h-6 w-6 text-red-400" aria-hidden="true" role="img" />
      No commands found.
     </h3>
     <p className="text-center text-white/50">Try searching for something else or change the categories.</p>
    </div>
   ) : (
    <>
     {filteredCategories
      .sort((a, b) => a.name.localeCompare(b.name))
      .filter((category) => filteredCommands.some((command) => command.categoryName === category.name))
      .map((category) => (
       <div key={category.name} className="mt-8">
        <h3 className="text-left text-xl font-bold">
         {category.name} <span className="text-accent-primary">({filteredCommands.filter((command) => command.categoryName === category.name).length})</span>
        </h3>
        {filteredCommands
         .filter((command) => command.categoryName === category.name)
         .map((command) => (
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
       </div>
      ))}
    </>
   )}
  </>
 );
}
