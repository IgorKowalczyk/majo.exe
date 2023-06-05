"use client";

import { ArrowLeftIcon, ChartPieIcon, Cog8ToothIcon, ListBulletIcon, QueueListIcon, RectangleStackIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SideNavLink({ href, children }) {
 const router = usePathname();
 const isSelected = (path) => router === path;
 return (
  <Link href={href} className={`${isSelected(href) ? "before:!h-[29px] bg-button-primary/20" : "hover:bg-button-primary/20"} h-[45px] flex items-center gap-2 duration-200 w-full pr-4 py-2 hover:bg-button-primary/20 rounded before:rounded-r-md before:border-l-4 before:border-button-primary before:h-0 before:duration-200 hover:before:h-[29px]`}>
   {children}
  </Link>
 );
}

export function SideNav({ server }) {
 return (
  <aside className="fixed flex-col w-64 h-full px-4 py-8 z-[9998] flex left-0 items-center bg-background-navbar/70 border-r border-r-neutral-800">
   <Link href="/dashboard" className="flex items-center gap-2 hover:bg-button-secondary duration-200 w-full px-4 py-2 mb-16 rounded">
    <ArrowLeftIcon className="w-6 h-6 text-white cursor-pointer" /> Go back
   </Link>

   <div className="flex flex-col items-center justify-center w-full gap-2">
    <SideNavLink href={`/dashboard/${server}`}>
     <RectangleStackIcon className="w-6 h-6" />
     Overview
    </SideNavLink>
    <SideNavLink href={`/dashboard/${server}/statistics`}>
     <ChartPieIcon className="w-6 h-6" />
     Statistics
    </SideNavLink>
    <SideNavLink href={`/dashboard/${server}/leaderboard`}>
     <QueueListIcon className="w-6 h-6" />
     Leaderboard
    </SideNavLink>
    <SideNavLink href={`/dashboard/${server}/logs`}>
     <ListBulletIcon className="w-6 h-6" />
     Logs
    </SideNavLink>
    <SideNavLink href={`/dashboard/${server}/settings`}>
     <Cog8ToothIcon className="w-6 h-6" />
     Settings
    </SideNavLink>
   </div>
  </aside>
 );
}
