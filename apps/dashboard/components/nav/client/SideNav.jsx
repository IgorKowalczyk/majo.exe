"use client";

import { ArrowLeftIcon, ChartPieIcon, Cog8ToothIcon, ListBulletIcon, QueueListIcon, RectangleStackIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { VisibilityContext } from "./VisibilityContext";
import { PrimaryButton } from "@/components/buttons/server/Primary";

export function SideNavLink({ href, children }) {
 const router = usePathname();
 const isSelected = (path) => router === path;
 return (
  <Link href={href} className={`${isSelected(href) ? "bg-button-primary/20 before:!h-[29px]" : "hover:bg-button-primary/20"} before:border-button-primary hover:bg-button-primary/20 flex h-[45px] w-full items-center gap-2 rounded py-2 pr-4 duration-200 before:h-0 before:rounded-r-md before:border-l-4 before:duration-200 hover:before:h-[29px]`}>
   {children}
  </Link>
 );
}

export function SideNav({ server }) {
 const { sideNavVisible } = useContext(VisibilityContext);
 return (
  <>
   <aside
    className={clsx(
     {
      hidden: !sideNavVisible,
      flex: sideNavVisible,
     },
     "menu border-r-px bg-background-navbar/70 fixed z-[9998] mt-8 h-screen w-64 flex-none flex-col flex-nowrap overflow-y-auto overflow-x-hidden border-r-neutral-800 px-4  py-8 shadow-lg backdrop-blur md:top-0 md:mt-16 md:flex"
    )}
   >
    <PrimaryButton href="/dashboard" className="mb-4 w-full">
     <ArrowLeftIcon className="mr-2 h-5 w-5 cursor-pointer text-white" /> Go back
    </PrimaryButton>

    <div className="flex w-full flex-col items-center justify-center gap-2 border-t border-t-neutral-800 pt-4">
     <SideNavLink href={`/dashboard/${server}`}>
      <RectangleStackIcon className="h-6 w-6" />
      Overview
     </SideNavLink>
     <SideNavLink href={`/dashboard/${server}/statistics`}>
      <ChartPieIcon className="h-6 w-6" />
      Statistics
     </SideNavLink>
     <SideNavLink href={`/dashboard/${server}/leaderboard`}>
      <QueueListIcon className="h-6 w-6" />
      Leaderboard
     </SideNavLink>
     <SideNavLink href={`/dashboard/${server}/logs`}>
      <ListBulletIcon className="h-6 w-6" />
      Logs
     </SideNavLink>
     <SideNavLink href={`/dashboard/${server}/settings`}>
      <Cog8ToothIcon className="h-6 w-6" />
      Settings
     </SideNavLink>
    </div>
   </aside>
  </>
 );
}
