"use client";

import { Bars3BottomLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";
import { useContext } from "react";
import { VisibilityContext } from "./VisibilityContext";

export function SideMenuControl() {
 const { toggleSideNav, sideNavVisible } = useContext(VisibilityContext);
 const params = useParams();

 return (
  <>
   {params.server && (
    <button className="bg-elements text-text ml-4 flex flex-row items-center gap-2 rounded-lg p-2 md:hidden" onClick={toggleSideNav}>
     {sideNavVisible ? <XMarkIcon className="min-h-6 min-w-6 h-6 w-6" /> : <Bars3BottomLeftIcon className="min-h-6 min-w-6 h-6 w-6" />}
    </button>
   )}
  </>
 );
}
