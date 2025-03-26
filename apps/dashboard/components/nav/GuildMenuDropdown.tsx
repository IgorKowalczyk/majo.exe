"use client";

import { dashboardConfig } from "@majoexe/config";
import { type ExtendedAPIGuild } from "@majoexe/util/functions/guild";
import { useParams, usePathname } from "next/navigation";
import React from "react";
import { Icons, iconVariants } from "@/components/ui/Icons";
import Image from "@/components/ui/Image";
import { Menu, MenuLink, MenuButton, MenuItems } from "@/components/ui/Menu";
import { cn } from "@/lib/utils";

export const GuildMenuDropdown = ({ guilds, ...props }: React.ComponentProps<typeof Menu> & { guilds: ExtendedAPIGuild[] }) => {
 if (!guilds || guilds.length === 0) return null;
 const { server } = useParams<{ server: string }>();
 const path = usePathname();

 const splitPath = path.split("/");
 const url = "/" + (splitPath.length === 4 ? splitPath[3] : "");

 const selectedGuild = guilds.find((guild) => guild.id === server);

 if (!selectedGuild || selectedGuild === null) return null;

 return (
  <Menu {...props}>
   <MenuButton className="bg-transparent! w-64 pl-4 pr-2 py-0 border-none">
    {selectedGuild.icon ? <Image src={`https://cdn.discordapp.com/icons/${selectedGuild.id}/${selectedGuild.icon}.${selectedGuild.icon.startsWith("a_") ? "gif" : "png"}`} alt={selectedGuild.name} quality={95} width={24} height={24} className="size-9 shrink-0 rounded-full" /> : <div className="size-9  shrink-0 rounded-full bg-button-secondary" />}
    <span className="text-lg font-bold truncate">{selectedGuild?.name || "Select a server"}</span>
    <Icons.ChevronsUpDown className={cn(iconVariants({ variant: "button" }), "text-neutral-600 m-0 ml-auto")} />
   </MenuButton>
   <MenuItems anchor="bottom" className="min-w-52 w-[calc(var(--button-width)_-16px)] max-h-64 overflow-y-auto">
    <div>
     <span className="block text-sm text-neutral-400 px-2 pt-2 pb-1">Pick a server</span>
     {guilds.map((guild) => (
      <MenuLink key={guild.id} href={`/dashboard/${guild.id}${url}`}>
       <div className="flex items-center gap-2">
        {guild.icon ? <Image src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.${guild.icon.startsWith("a_") ? "gif" : "png"}`} alt={guild.name} quality={95} width={24} height={24} className="size-6 shrink-0 rounded-full" /> : <div className="size-6 shrink-0 rounded-full bg-button-secondary" />}
        <span>{guild.name}</span>
       </div>
      </MenuLink>
     ))}
    </div>
   </MenuItems>
  </Menu>
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
