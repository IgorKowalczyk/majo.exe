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
    <button className="ml-4 flex flex-row items-center gap-2 rounded-lg bg-elements p-2 text-text lg:hidden" onClick={toggleSideNav}>
     {sideNavVisible ? <XMarkIcon className="w-6 h-6" /> : <Bars3BottomLeftIcon className="w-6 h-6" />}
    </button>
   )}
  </>
 );
}
