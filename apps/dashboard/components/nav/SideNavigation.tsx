"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext } from "react";
import { VisibilityContext } from "@/components/nav/VisibilityContext";
import { Button, buttonVariants } from "@/components/ui/Buttons";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { Badge } from "@/components/ui/Badge";

export const SideNavLink = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }>(({ href, children, ...props }, ref) => {
 const router = usePathname();
 const isSelected = (path: string) => router === path;

 return (
  <Link href={href} className={`${isSelected(href) ? "bg-button-primary/20 before:h-[29px]" : "hover:bg-button-primary/20"} flex h-[45px] w-full items-center gap-2 rounded-md py-2 pr-4 duration-200 before:h-0 before:rounded-r-md before:border-l-4 before:border-button-primary before:duration-200 hover:bg-button-primary/20 hover:before:h-[29px]`} {...props} ref={ref}>
   {children}
  </Link>
 );
});

export interface SideNavigationProps extends React.HTMLAttributes<HTMLDivElement> {
 server: string;
}

export const SideNavigation = React.forwardRef<HTMLDivElement, SideNavigationProps>(async ({ className, server, ...props }, ref) => {
 const { sideNavVisible, toggleSideNav } = useContext(VisibilityContext);
 const router = useRouter();

 return (
  <>
   {sideNavVisible && <div className="fixed inset-0 z-20 size-full bg-black/50 duration-200" onClick={() => sideNavVisible && toggleSideNav()} />}
   <aside
    className={cn(
     {
      "pointer-events-none opacity-0": !sideNavVisible,
      "opacity-100": sideNavVisible,
     },
     "fixed z-30 mt-8 flex h-screen w-64 flex-none flex-col flex-nowrap overflow-y-auto overflow-x-hidden border-r border-r-neutral-800 bg-background-navbar py-8 pb-32 shadow-lg duration-100 md:pointer-events-auto md:top-0 md:mt-16 md:opacity-100",
     className
    )}
    {...props}
    ref={ref}
   >
    <div className="px-4">
     <Button onClick={() => router.back()} className={cn(buttonVariants({ variant: "primary" }), "mb-4 w-full")}>
      <Icons.arrowLeft className={iconVariants({ variant: "button" })} /> Server list
     </Button>
    </div>

    <div className="flex w-full flex-col items-center justify-center gap-2 border-t border-t-neutral-800 px-4 pt-4">
     <SideNavLink href={`/dashboard/${server}`}>
      <Icons.Home className={iconVariants({ variant: "large" })} />
      Overview
     </SideNavLink>
     <SideNavLink href={`/dashboard/${server}/statistics`}>
      <Icons.TrendingUp className={iconVariants({ variant: "large" })} />
      Statistics
     </SideNavLink>
     <SideNavLink href={`/dashboard/${server}/leaderboard`}>
      <Icons.Sparkles className={iconVariants({ variant: "large" })} />
      Leaderboard
     </SideNavLink>
     <SideNavLink href={`/dashboard/${server}/giveaways`}>
      <Icons.Gift className={iconVariants({ variant: "large" })} />
      Giveaways<Badge className="-mt-3">beta</Badge>
     </SideNavLink>
    </div>

    <div className="text-text mt-2 border-t border-white/20 px-5 py-2 opacity-40">Moderation</div>
    <div className="flex w-full flex-col items-center justify-center gap-2 px-4">
     <SideNavLink href={`/dashboard/${server}/warns`}>
      <Icons.warning className={iconVariants({ variant: "large" })} />
      Warns
     </SideNavLink>
     <SideNavLink href={`/dashboard/${server}/logs`}>
      <Icons.list className={iconVariants({ variant: "large" })} />
      Logs
     </SideNavLink>
     <SideNavLink href={`/dashboard/${server}/automod`}>
      <Icons.Bot className={iconVariants({ variant: "large" })} />
      Automod<Badge className="-mt-3">beta</Badge>
     </SideNavLink>
    </div>
    <div className="text-text mt-2 border-t border-white/20 px-5 py-2 opacity-40">Management</div>
    <div className="flex w-full flex-col items-center justify-center gap-2 px-4">
     <SideNavLink href={`/dashboard/${server}/modules`}>
      <Icons.PackagePlus className={iconVariants({ variant: "large" })} />
      Modules
     </SideNavLink>
     <SideNavLink href={`/dashboard/${server}/messages`}>
      <Icons.messageCode className={iconVariants({ variant: "large" })} />
      Custom messages
     </SideNavLink>
     <SideNavLink href={`/dashboard/${server}/settings`}>
      <Icons.Settings className={iconVariants({ variant: "large" })} />
      Settings
     </SideNavLink>
    </div>
   </aside>
  </>
 );
});
