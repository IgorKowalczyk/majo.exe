"use client";

import { ArrowLeftIcon, ChartPieIcon, Cog8ToothIcon, ListBulletIcon, QueueListIcon, RectangleStackIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SideNav({ server }) {
 const router = usePathname();
 const isSelected = (path) => router === path;

 return (
  <aside className="fixed flex-col w-64 h-full px-4 py-8 z-[9998] flex left-0 items-center bg-background-navbar/70">
   <Link href="/dashboard" className="flex items-center gap-2 hover:bg-button-secondary duration-200 w-full px-4 py-2 mb-16 rounded">
    <ArrowLeftIcon className="w-6 h-6 text-white cursor-pointer" /> Go back
   </Link>

   <div className="flex flex-col items-center justify-center w-full gap-2">
    <Link href={`/dashboard/${server}`} className={`${isSelected(`/dashboard/${server}`) ? "bg-button-primary hover:bg-button-primary-hover" : "hover:bg-button-secondary"} flex items-center gap-2 duration-200 w-full px-4 py-2 rounded`}>
     <RectangleStackIcon className="w-6 h-6" />
     Overview
    </Link>
    <Link href={`/dashboard/${server}/statistics`} className={`${isSelected(`/dashboard/${server}/statistics`) ? "bg-button-primary hover:bg-button-primary-hover" : "hover:bg-button-secondary"} flex items-center gap-2 duration-200 w-full px-4 py-2 rounded`}>
     <ChartPieIcon className="w-6 h-6" />
     Statistics
    </Link>
    <Link href={`/dashboard/${server}/leaderboard`} className={`${isSelected(`/dashboard/${server}/leaderboard`) ? "bg-button-primary hover:bg-button-primary-hover" : "hover:bg-button-secondary"} flex items-center gap-2 duration-200 w-full px-4 py-2 rounded`}>
     <QueueListIcon className="w-6 h-6" />
     Leaderboard
    </Link>
    <Link href={`/dashboard/${server}/logs`} className={`${isSelected(`/dashboard/${server}/logs`) ? "bg-button-primary hover:bg-button-primary-hover" : "hover:bg-button-secondary"} flex items-center gap-2 duration-200 w-full px-4 py-2 rounded`}>
     <ListBulletIcon className="w-6 h-6" />
     Logs
    </Link>
    <Link href={`/dashboard/${server}/settings`} className={`${isSelected(`/dashboard/${server}/settings`) ? "bg-button-primary hover:bg-button-primary-hover" : "hover:bg-button-secondary"} flex items-center gap-2 duration-200 w-full px-4 py-2 rounded`}>
     <Cog8ToothIcon className="w-6 h-6" />
     Settings
    </Link>
   </div>
  </aside>
 );
}
