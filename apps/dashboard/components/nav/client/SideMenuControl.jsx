"use client";

import clsx from "clsx";
import { useParams } from "next/navigation";
import { useContext } from "react";
import { VisibilityContext } from "./VisibilityContext";
import { Icons } from "@/components/Icons";

export function SideMenuControl() {
 const { toggleSideNav, sideNavVisible } = useContext(VisibilityContext);
 const params = useParams();

 return (
  <>
   {params.server && (
    <button className="bg-elements text-text ml-4 flex flex-row items-center gap-2 rounded-lg p-2 md:hidden" onClick={toggleSideNav} type="button">
     <div className="relative size-6">
      <Icons.close
       className={clsx(
        {
         "scale-0": !sideNavVisible,
         "scale-100": sideNavVisible,
        },
        "absolute top-0 size-6 shrink-0 duration-200"
       )}
      />
      <Icons.menu
       className={clsx(
        {
         "scale-100": !sideNavVisible,
         "scale-0": sideNavVisible,
        },
        "absolute top-0 size-6 shrink-0 duration-200"
       )}
      />
     </div>
    </button>
   )}
  </>
 );
}
