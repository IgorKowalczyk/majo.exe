"use client";

import { ArrowLeftIcon, ArrowTrendingUpIcon, ChatBubbleBottomCenterTextIcon, Cog8ToothIcon, ExclamationTriangleIcon, ListBulletIcon, RectangleStackIcon, SparklesIcon, SquaresPlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { VisibilityContext } from "./VisibilityContext";
import { PrimaryButton } from "@/components/Primary";

export function NavBadge({ children }) {
 return <div className="bg-button-primary -mt-3 rounded-md px-1 py-px pb-0 text-xs uppercase">{children}</div>;
}

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
 const { sideNavVisible, toggleSideNav } = useContext(VisibilityContext);

 return (
  <>
   {sideNavVisible && <div className="fixed inset-0 z-[1000] h-full w-full bg-black/50 duration-200" onClick={() => sideNavVisible && toggleSideNav()} />}
   <aside
    className={clsx(
     {
      hidden: !sideNavVisible,
      flex: sideNavVisible,
     },
     "menu bg-background-navbar fixed z-[9998] mt-8 h-screen w-64 flex-none flex-col flex-nowrap overflow-y-auto overflow-x-hidden border-r border-r-neutral-800 py-8 pb-32 shadow-lg md:top-0 md:mt-16 md:flex"
    )}
   >
    <div className="px-4">
     <PrimaryButton href="/dashboard" className="mb-4 w-full">
      <ArrowLeftIcon className="min-h-5 min-w-5 mr-2 h-5 w-5 cursor-pointer text-white" /> Go back
     </PrimaryButton>
    </div>

    <div className="flex w-full flex-col items-center justify-center gap-2 border-t border-t-neutral-800 px-4 pt-4">
     <SideNavLink href={`/dashboard/${server}`}>
      <RectangleStackIcon className="min-h-6 min-w-6 h-6 w-6" />
      Overview
     </SideNavLink>
     <SideNavLink href={`/dashboard/${server}/statistics`}>
      <ArrowTrendingUpIcon className="min-h-6 min-w-6 h-6 w-6" />
      Statistics
     </SideNavLink>
     <SideNavLink href={`/dashboard/${server}/leaderboard`}>
      <SparklesIcon className="min-h-6 min-w-6 h-6 w-6" />
      Leaderboard
     </SideNavLink>
    </div>

    <div className="text-text mt-2 border-t border-white/20 px-5 py-2 opacity-40">Moderation</div>
    <div className="flex w-full flex-col items-center justify-center gap-2 px-4">
     <SideNavLink href={`/dashboard/${server}/warns`}>
      <ExclamationTriangleIcon className="min-h-6 min-w-6 h-6 w-6" />
      Warns
     </SideNavLink>
     <SideNavLink href={`/dashboard/${server}/logs`}>
      <ListBulletIcon className="min-h-6 min-w-6 h-6 w-6" />
      Logs
     </SideNavLink>
    </div>
    <div className="text-text mt-2 border-t border-white/20 px-5 py-2 opacity-40">Management</div>
    <div className="flex w-full flex-col items-center justify-center gap-2 px-4">
     <SideNavLink href={`/dashboard/${server}/modules`}>
      <SquaresPlusIcon className="min-h-6 min-w-6 h-6 w-6" />
      Modules
     </SideNavLink>
     <SideNavLink href={`/dashboard/${server}/automod`}>
      <ChatBubbleBottomCenterTextIcon className="min-h-6 min-w-6 h-6 w-6" />
      Automod<NavBadge>beta</NavBadge>
     </SideNavLink>
     <SideNavLink href={`/dashboard/${server}/settings`}>
      <Cog8ToothIcon className="min-h-6 min-w-6 h-6 w-6" />
      Settings
     </SideNavLink>
    </div>
   </aside>
  </>
 );
}
