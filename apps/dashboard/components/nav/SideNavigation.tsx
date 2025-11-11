"use client";

import {
  BotIcon,
  ChevronLeftIcon,
  GiftIcon,
  HandIcon,
  HomeIcon,
  LogsIcon,
  MessageSquareWarningIcon,
  PackagePlusIcon,
  ScrollTextIcon,
  SettingsIcon,
  SparklesIcon,
  TrendingUpIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { use } from "react";
import { VisibilityContext } from "@/components/nav/VisibilityContext";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Buttons";
import { iconVariants } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export const SideNavLink = ({ href, children, ...props }: React.ComponentProps<typeof Link>) => {
  const router = usePathname();
  const isSelected = (path: string) => router === path;

  return (
    <Link
      href={href}
      className={`${isSelected(href.toString()) ? "bg-button-primary/20 before:h-[29px]" : "hover:bg-button-primary/20"} flex h-[45px] w-full items-center gap-2 rounded-lg py-2 pr-4 duration-200 before:h-0 before:rounded-r-md before:border-l-4 before:border-button-primary before:duration-200 hover:bg-button-primary/20 hover:before:h-[29px]`}
      {...props}
    >
      {children}
    </Link>
  );
};

export interface SideNavigationProps extends React.ComponentProps<"aside"> {
  server: string;
}

export const SideNavigation = ({ className, server, ...props }: SideNavigationProps) => {
  const { sideNavVisible, toggleSideNav } = use(VisibilityContext);

  return (
    <>
      {sideNavVisible && <div className="fixed inset-0 z-20 size-full bg-black/50 duration-200" onClick={() => sideNavVisible && toggleSideNav()} />}
      <aside
        className={cn(
          {
            "pointer-events-none opacity-0": !sideNavVisible,
            "opacity-100": sideNavVisible,
          },
          "bg-background-navbar fixed z-30 mt-8 flex h-screen w-64 flex-none flex-col flex-nowrap overflow-y-auto overflow-x-hidden border-r border-r-neutral-800 py-8 pb-32 shadow-lg duration-100 md:pointer-events-auto md:top-0 md:mt-16 md:opacity-100",
          className
        )}
        {...props}
      >
        <div className="px-4">
          <Link href="/dashboard" className={cn(buttonVariants({ variant: "primary" }), "mb-4 w-full")}>
            <ChevronLeftIcon className={iconVariants({ variant: "button" })} /> Server list
          </Link>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-2 border-t border-t-neutral-800 px-4 pt-4">
          <SideNavLink href={`/dashboard/${server}`}>
            <HomeIcon className={iconVariants({ variant: "large" })} />
            Overview
          </SideNavLink>
          <SideNavLink href={`/dashboard/${server}/statistics`}>
            <TrendingUpIcon className={iconVariants({ variant: "large" })} />
            Statistics
          </SideNavLink>
          <SideNavLink href={`/dashboard/${server}/leaderboard`}>
            <SparklesIcon className={iconVariants({ variant: "large" })} />
            Leaderboard
          </SideNavLink>
          <SideNavLink href={`/dashboard/${server}/giveaways`}>
            <GiftIcon className={iconVariants({ variant: "large" })} />
            Giveaways
          </SideNavLink>
        </div>

        <div className="text-text mt-2 border-t border-white/20 px-5 py-2 opacity-40">Moderation</div>
        <div className="flex w-full flex-col items-center justify-center gap-2 px-4">
          <SideNavLink href={`/dashboard/${server}/warns`}>
            <MessageSquareWarningIcon className={iconVariants({ variant: "large" })} />
            User warns
          </SideNavLink>
          <SideNavLink href={`/dashboard/${server}/logs`}>
            <ScrollTextIcon className={iconVariants({ variant: "large" })} />
            Logs <Badge className="-mt-3">new</Badge>
          </SideNavLink>
          <SideNavLink href={`/dashboard/${server}/automod`}>
            <BotIcon className={iconVariants({ variant: "large" })} />
            Automod
          </SideNavLink>
        </div>
        <div className="text-text mt-2 border-t border-white/20 px-5 py-2 opacity-40">Management</div>
        <div className="flex w-full flex-col items-center justify-center gap-2 px-4">
          <SideNavLink href={`/dashboard/${server}/modules`}>
            <PackagePlusIcon className={iconVariants({ variant: "large" })} />
            Modules
          </SideNavLink>
          <SideNavLink href={`/dashboard/${server}/messages`}>
            <HandIcon className={iconVariants({ variant: "large" })} />
            Welcome & Leave
          </SideNavLink>
          <SideNavLink href={`/dashboard/${server}/dashboard-logs`}>
            <LogsIcon className={iconVariants({ variant: "large" })} />
            Dashboard logs
          </SideNavLink>
          <SideNavLink href={`/dashboard/${server}/settings`}>
            <SettingsIcon className={iconVariants({ variant: "large" })} />
            Settings
          </SideNavLink>
        </div>
      </aside>
    </>
  );
};
