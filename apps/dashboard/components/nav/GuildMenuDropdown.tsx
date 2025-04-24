"use client";

import { dashboardConfig } from "@majoexe/config";
import { type ExtendedAPIGuild } from "@majoexe/util/functions/guild";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/Buttons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import { Icons, iconVariants } from "@/components/ui/Icons";
import Image from "@/components/ui/Image";

export const GuildMenuDropdown = ({ guilds, ...props }: React.ComponentProps<typeof DropdownMenu> & { guilds: ExtendedAPIGuild[] }) => {
 if (!guilds || guilds.length === 0) return null;
 const { server } = useParams<{ server: string }>();
 const path = usePathname();

 const splitPath = path.split("/");
 const url = "/" + (splitPath.length === 4 ? splitPath[3] : "");

 const selectedGuild = guilds.find((guild) => guild.id === server);

 if (!selectedGuild || selectedGuild === null) return null;

 return (
  <DropdownMenu {...props}>
   <DropdownMenuTrigger asChild className="bg-transparent! w-64 py-0 border-none">
    <Button variant="select">
     {selectedGuild.icon ? <Image src={`https://cdn.discordapp.com/icons/${selectedGuild.id}/${selectedGuild.icon}.${selectedGuild.icon.startsWith("a_") ? "gif" : "png"}`} alt={selectedGuild.name} quality={95} width={24} height={24} className="size-9 shrink-0 rounded-full" /> : <div className="size-9  shrink-0 rounded-full bg-button-secondary" />}
     <span className="text-lg font-bold truncate">{selectedGuild?.name || "Select a server"}</span>
     <Icons.ChevronsUpDown
      className={iconVariants({
       variant: "normal",
       className: "text-neutral-400 duration-200 motion-reduce:transition-none",
      })}
     />
    </Button>
   </DropdownMenuTrigger>
   <DropdownMenuContent className="max-h-64 min-w-[calc(var(--radix-dropdown-menu-trigger-width)-8px)] overflow-y-auto" align="start" alignOffset={10}>
    <DropdownMenuLabel className="px-2 pt-2 pb-1 font-normal">Pick a server</DropdownMenuLabel>
    <DropdownMenuGroup>
     {guilds.map((guild) => (
      <DropdownMenuItem key={guild.id} asChild>
       <Link href={`/dashboard/${guild.id}${url}`} className="flex items-center gap-2">
        {guild.icon ? <Image src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.${guild.icon.startsWith("a_") ? "gif" : "png"}`} alt={guild.name} quality={95} width={24} height={24} className="size-6 shrink-0 rounded-full" /> : <div className="size-6 shrink-0 rounded-full bg-button-secondary" />}
        <span>{guild.name}</span>
       </Link>
      </DropdownMenuItem>
     ))}
    </DropdownMenuGroup>
   </DropdownMenuContent>
  </DropdownMenu>
 );
};

export const GuildDashboardLogo = () => {
 const { server } = useParams<{ server: string }>();

 if (server) return null;

 return (
  <div className="flex cursor-pointer items-center gap-2 pl-4 pr-2 text-xl duration-200 hover:opacity-90 motion-reduce:transition-none">
   <Image className="size-9 min-h-9 min-w-9 rounded-full" src={dashboardConfig.logo} alt={`${dashboardConfig.title} logo`} width={36} height={36} />
   <p className="hidden font-bold sm:block">{dashboardConfig.title}</p>
  </div>
 );
};
