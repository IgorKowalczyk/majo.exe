"use client";

import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import React, { useContext } from "react";
import { VisibilityContext } from "@/components/nav/client/VisibilityContext";
import { Icons } from "@/components/Icons";

export const SideMenuControl = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({ className, ...props }, ref) => {
 const { toggleSideNav, sideNavVisible } = useContext(VisibilityContext);
 const params = useParams();

 return (
  <>
   {params.server && (
    <button className={cn("bg-elements text-text ml-4 flex flex-row items-center gap-2 rounded-lg p-2 md:hidden", className)} onClick={toggleSideNav} type="button" ref={ref} {...props}>
     <div className="relative size-6">
      <Icons.close
       className={cn(
        {
         "scale-0": !sideNavVisible,
         "scale-100": sideNavVisible,
        },
        "absolute top-0 size-6 shrink-0 duration-200"
       )}
      />
      <Icons.Menu
       className={cn(
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
});
