"use client";
import type { CommandCategories } from "@majoexe/database/types";
import { CheckIcon, LoaderCircleIcon, SearchIcon, XIcon } from "lucide-react";
import React, { useEffect, useState, useMemo } from "react";
import Header, { headerVariants } from "@/components/ui/Headers";
import { iconVariants } from "@/components/ui/Icons";
import { InputWithIcon } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeletons";
import { Tooltip } from "@/components/ui/Tooltip";
import { Command } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface DiscordCommandsProps extends React.ComponentProps<"div"> {
 commands: Command[];
 categories: CommandCategories[];
}

export const DiscordCommands = ({ commands, categories, className, ...props }: DiscordCommandsProps) => {
 const [filteredCategories, setFilteredCategories] = useState<CommandCategories[]>(categories);
 const [search, setSearch] = useState("");
 const [mounted, setMounted] = useState(false);

 const filteredCommands = useMemo(() => {
  return commands.filter(
   (command) => command.name.toLowerCase().includes(search.toLowerCase() || "") && filteredCategories.some((category) => category.name === command.categoryName)
  );
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
    <Skeleton className="h-10 w-full max-w-none!" />

    <div className="mt-8 flex flex-wrap gap-2">
     {Array.from({ length: 8 }).map((_, i) => (
      <Skeleton
       key={`command-skeleton-${i}`}
       className="h-[42px]"
       style={{
        width: `${Math.floor(Math.random() * (150 - 64 + 1) + 64)}px !important`,
       }}
      />
     ))}
    </div>

    <div className="mt-8 flex flex-col items-center justify-center gap-2">
     <Header className={cn(headerVariants({ variant: "h3", alignment: "center" }))}>
      <LoaderCircleIcon className={iconVariants({ variant: "large", className: "animate-spin" })} />
      Loading commands...
     </Header>
     <p className="text-center text-white/50">This may take a few seconds.</p>
    </div>
   </>
  );
 }

 return (
  <div className={cn(className)} {...props}>
   <InputWithIcon
    placeholder="Search commands..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    icon={<SearchIcon className={iconVariants({ variant: "normal", className: "text-white/50" })} />}
    className="w-full max-w-none!"
   />
   <div className="mt-4 flex flex-wrap gap-2">
    {categories.map((category) => (
     <div
      key={category.name}
      className={cn(
       {
        "opacity-50": !filteredCategories?.includes(category),
       },
       "flex cursor-pointer select-none items-center gap-2 rounded-lg border border-neutral-800 px-3 py-1.5 duration-200"
      )}
      onClick={() => {
       if (filteredCategories.includes(category)) {
        setFilteredCategories(filteredCategories?.filter((c) => c !== category));
       } else {
        setFilteredCategories([...filteredCategories, category]);
       }
      }}
     >
      <div className="relative size-4">
       <CheckIcon
        className={iconVariants({
         variant: "normal",
         className: cn("absolute inset-0 size-full duration-200", {
          "text-accent-primary -ml-1 scale-100": filteredCategories?.includes(category),
          "scale-0": !filteredCategories?.includes(category),
         }),
        })}
       />
       <XIcon
        className={iconVariants({
         variant: "normal",
         className: cn("absolute inset-0 size-full duration-200", {
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
     <Header className={cn(headerVariants({ variant: "h3", alignment: "center" }))}>
      <XIcon className={iconVariants({ variant: "large", className: "text-red-400" })} />
      No commands found.
     </Header>
     <p className="text-center text-white/50">Try searching for something else or change the categories.</p>
    </div>
   ) : (
    <>
     {filteredCategories
      .sort((a, b) => a.name.localeCompare(b.name))
      .filter((category) => filteredCommands.some((command) => command.categoryName === category.name))
      .map((category) => (
       <div key={category.name} className="mt-8">
        <Header className={cn(headerVariants({ variant: "h3" }))}>
         {category.name} <span className="text-accent-primary">({filteredCommands.filter((command) => command.categoryName === category.name).length})</span>
        </Header>
        {filteredCommands
         .filter((command) => command.categoryName === category.name)
         .map((command) => (
          <div key={command.name} className="my-4 w-full rounded-lg border border-neutral-800 bg-background-navbar px-6 py-4">
           <div className="flex flex-col items-start gap-2">
            <div className="flex items-center">
             <span className="font-bold">/{command.name} </span>
             {command.options &&
              command.options.map((option) => (
               <span
                key={option.name}
                className={cn(
                 {
                  "font-normal! opacity-70": !option.required,
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
  </div>
 );
};
