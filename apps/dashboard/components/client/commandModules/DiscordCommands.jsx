"use client";
import clsx from "clsx";
import { useEffect, useState, useMemo } from "react";
import { Tooltip } from "@/components/client/shared/Tooltip";
import { Header3 } from "@/components/Headers";
import { Icons, iconVariants } from "@/components/Icons";
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
       // eslint-disable-next-line @eslint-react/no-array-index-key
       key={`command-skeleton-${i}`}
       className="!h-[42px]"
       style={{
        width: `${Math.floor(Math.random() * (150 - 64 + 1) + 64)}px !important`,
       }}
      />
     ))}
    </div>

    <div className="mt-8 flex flex-col items-center justify-center gap-2">
     <Header3 className="text-center">
      <Icons.refresh className={iconVariants({ variant: "large", className: "animate-spin" })} />
      Loading commands...
     </Header3>
     <p className="text-center text-white/50">This may take a few seconds.</p>
    </div>
   </>
  );
 }

 return (
  <>
   <InputWithIcon placeholder="Search commands..." value={search} onChange={(e) => setSearch(e.target.value)} icon={<Icons.Search className={iconVariants({ variant: "normal", className: "text-white/50" })} />} className="w-full !max-w-none" />
   <div className="mt-8 flex flex-wrap gap-2">
    {categories.map((category) => (
     <div
      key={category.name}
      className={clsx(
       {
        "opacity-50": !filteredCategories?.includes(category),
       },
       "flex cursor-pointer select-none items-center gap-2 rounded-md border border-neutral-800 px-4 py-2 duration-200"
      )}
      onClick={() => {
       if (filteredCategories.includes(category)) {
        setFilteredCategories(filteredCategories?.filter((c) => c !== category));
       } else {
        setFilteredCategories([...filteredCategories, category]);
       }
      }}
     >
      <div className="relative size-5">
       <Icons.Check
        className={iconVariants({
         variant: "normal",
         className: clsx("absolute inset-0 size-full duration-200", {
          "text-accent-primary -ml-1 scale-100": filteredCategories?.includes(category),
          "scale-0": !filteredCategories?.includes(category),
         }),
        })}
       />
       <Icons.close
        className={iconVariants({
         variant: "normal",
         className: clsx("absolute inset-0 size-full duration-200", {
          "-ml-1 scale-100 text-red-400": !filteredCategories?.includes(category),
          "scale-0": filteredCategories?.includes(category),
         }),
        })}
       />
      </div>
      {category.name}
     </div>
    ))}
   </div>
   {filteredCommands.length === 0 ? (
    <div className="mt-8 flex flex-col items-center justify-center gap-2">
     <Header3 className="text-center">
      <Icons.close className={iconVariants({ variant: "large", className: "text-red-400" })} />
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
          <div key={command.name} className="my-4 w-full rounded-md border border-neutral-800 bg-background-navbar px-6 py-4">
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
