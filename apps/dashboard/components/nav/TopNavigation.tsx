import { dashboardConfig } from "@majoexe/config";
import { getSession } from "lib/session";
import Link from "next/link";
import React, { HTMLAttributes } from "react";
import { DiscordLogin } from "@/components/DiscordLogin";
import { SideMenuControl } from "@/components/nav/SideMenuControl";
import { UserMenuDropdown } from "@/components/nav/UserMenuDropdown";
import { buttonVariants } from "@/components/ui/Buttons";
import { Icons, iconVariants } from "@/components/ui/Icons";
import Image from "@/components/ui/Image";
import { cn } from "@/lib/utils";

export const TopNavigation = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { theme?: "full" | "compact" }>(async ({ className, theme, ...props }, ref) => {
 const session = await getSession();

 return (
  <nav className={cn("bg-background-navbar md:bg-background-navbar/70 fixed z-40 flex w-full items-center border-b border-b-neutral-800 py-4 text-left shadow-lg md:backdrop-blur-[9px]", className)} {...props} ref={ref}>
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
     <div className="flex cursor-pointer items-center gap-2 pl-4 pr-2 text-xl duration-200 hover:opacity-90 motion-reduce:transition-none">
      <Image className="size-9 min-h-9 min-w-9 rounded-full" src={dashboardConfig.logo} alt={`${dashboardConfig.title} logo`} width={36} height={36} />
      <p className="hidden font-bold sm:block">{dashboardConfig.title}</p>
     </div>
    </Link>
    <div className="hidden md:flex">
     <div className="mx-4 h-6 w-1 border-l-2 border-l-neutral-700" />
     <Link href="/commands" className="flex items-center text-white/60 duration-200 hover:text-white motion-reduce:transition-none">
      <Icons.slash className={iconVariants({ variant: "large", className: "mr-2" })} />
      <span className="-mb-px">Commands</span>
     </Link>
    </div>
    <div className="ml-auto mr-4">
     {session ? (
      <div className="flex items-center gap-4">
       <Link href="/dashboard" className="hidden items-center text-white/60 duration-200 hover:text-white motion-reduce:transition-none md:flex">
        <Icons.dashboard className={iconVariants({ variant: "large", className: "mr-2" })} /> <span className="-mb-px">Dashboard</span>
       </Link>
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
});
