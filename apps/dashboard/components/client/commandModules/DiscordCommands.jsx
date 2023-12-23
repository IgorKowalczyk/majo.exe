"use client";
import { ArrowPathIcon, CheckIcon, MagnifyingGlassIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useEffect, useState, useMemo } from "react";
import { Tooltip } from "@/components/client/shared/Tooltip";
import { Header3 } from "@/components/Headers";
import { InputWithIcon } from "@/components/Input";
import { InputSkeleton, TextSkeleton } from "@/components/Skeletons";

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [categories]);

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
     <Header3 className="text-center">
      <ArrowPathIcon className="mr-2 h-6 min-h-6 w-6 min-w-6 animate-spin" aria-hidden="true" role="img" />
      Loading commands...
     </Header3>
     <p className="text-center text-white/50">This may take a few seconds.</p>
    </div>
   </>
  );
 }

 return (
  <>
   <InputWithIcon placeholder="Search commands..." value={search} onChange={(e) => setSearch(e.target.value)} icon={<MagnifyingGlassIcon className="h-5 min-h-5 w-5 min-w-5 text-white/50" aria-hidden="true" role="img" />} />
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
      {filteredCategories?.includes(category) ? <CheckIcon className="text-accent-primary h-5 min-h-5 w-5 min-w-5" aria-hidden="true" role="img" /> : <XMarkIcon className="h-5 min-h-5 w-5 min-w-5 text-red-400/50" aria-hidden="true" role="img" />}
      {category.name}
     </div>
    ))}
   </div>
   {filteredCommands.length === 0 ? (
    <div className="mt-8 flex flex-col items-center justify-center gap-2">
     <Header3 className="text-center">
      <XCircleIcon className="mr-2 h-6 min-h-6 w-6 min-w-6 text-red-400" aria-hidden="true" role="img" />
      No commands found.
     </Header3>
     <p className="text-center text-white/50">Try searching for something else or change the categories.</p>
    </div>
   ) : (
    <>
     {filteredCategories
      .sort((a, b) => a.name.localeCompare(b.name))
      .filter((category) => filteredCommands.some((command) => command.categoryName === category.name))
      .map((category) => (
       <div key={category.name} className="mt-8">
        <Header3>
         {category.name} <span className="text-accent-primary">({filteredCommands.filter((command) => command.categoryName === category.name).length})</span>
        </Header3>
        {filteredCommands
         .filter((command) => command.categoryName === category.name)
         .map((command) => (
          <div key={command.name} className="bg-background-navbar my-4 w-full rounded-md border border-neutral-800 px-6 py-4">
           <div className="flex flex-col items-start gap-2">
            <div className="flex items-center">
             <span className="font-bold">/{command.name} </span>
             {command.options &&
              command.options.map((option) => (
               <span
                key={option.name}
                className={clsx(
                 {
                  "!font-normal opacity-70": !option.required,
                  "opacity-100": option.required,
                 },
                 "ml-2 [line-height:normal]"
                )}
               >
                <Tooltip content={`${option.description} ${option.required ? "(required)" : "(optional)"}`}>
                 <code className="cursor-pointer">
                  {option.name}
                  {option.required ? <span className="text-red-400">*</span> : ""}
                 </code>
                </Tooltip>
               </span>
              ))}
            </div>
            <p className="opacity-70">{command.description}</p>
           </div>
          </div>
         ))}
       </div>
      ))}
    </>
   )}
  </>
 );
}
