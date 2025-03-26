import { type ExtendedAPIGuild, getMemberGuilds, isBotInServer } from "@majoexe/util/functions/guild";
import { getSession } from "lib/session";
import Link from "next/link";
import React from "react";
import { DiscordLogin } from "@/components/DiscordLogin";
import { GuildDashboardLogo, GuildMenuDropdown } from "@/components/nav/GuildMenuDropdown";
import { SideMenuControl } from "@/components/nav/SideMenuControl";
import { UserMenuDropdown } from "@/components/nav/UserMenuDropdown";
import { buttonVariants } from "@/components/ui/Buttons";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export const TopNavigation = async ({ className, theme, ...props }: React.ComponentProps<"nav"> & { theme?: "full" | "compact" }) => {
 const session = await getSession();
 let guilds: ExtendedAPIGuild[] = [];

 if (session && session.access_token) {
  const data = (await getMemberGuilds(session.access_token)) || [];

  const guildsToFilter = await Promise.all(
   data
    .filter((server) => server.permissions_names.includes("ManageGuild") || server.permissions_names.includes("Administrator"))
    .map(async (server: ExtendedAPIGuild) => {
     const botInServer = await isBotInServer(server.id);
     return botInServer ? server : null;
    })
  );

  guilds = guildsToFilter.filter((server) => server !== null);
 }

 return (
  <nav className={cn("bg-background-navbar fixed z-40 flex w-full items-center border-b border-b-neutral-800 py-4 text-left shadow-lg", className)} {...props}>
   <SideMenuControl />
   <div
    className={cn(
     {
      "xl:w-4/5": theme === "compact",
      "w-full": !theme || theme === "full",
     },
     "mx-auto flex items-center"
    )}
   >
    <Link href="/" className="text-lg text-white">
     <GuildDashboardLogo />
    </Link>
    <div className="hidden md:flex md:items-center md:gap-2">
     <GuildMenuDropdown guilds={guilds} />
     <svg height="16" strokeLinejoin="round" className="size-6 fill-neutral-700" viewBox="0 0 16 16" width="16">
      <path fillRule="evenodd" clipRule="evenodd" d="M4.01526 15.3939L4.3107 14.7046L10.3107 0.704556L10.6061 0.0151978L11.9849 0.606077L11.6894 1.29544L5.68942 15.2954L5.39398 15.9848L4.01526 15.3939Z" />
     </svg>
     <Link href="/commands" className="flex items-center text-white/60 duration-200 hover:text-white motion-reduce:transition-none">
      <Icons.slash className={iconVariants({ variant: "large", className: "mr-2" })} />
      <span className="-mb-px">Commands</span>
     </Link>
    </div>
    <div className="ml-auto mr-4">
     {session ? (
      <div className="flex items-center gap-3">
       <UserMenuDropdown user={session} />
      </div>
     ) : (
      <div className="flex items-center justify-center gap-2">
       <div className="hidden md:block">
        <Link href="/api/invite" className={buttonVariants({ variant: "secondary" })}>
         <Icons.userAdd className={iconVariants({ variant: "button" })} />
         Add to your server
        </Link>
       </div>
       <DiscordLogin />
      </div>
     )}
    </div>
   </div>
  </nav>
 );
};
