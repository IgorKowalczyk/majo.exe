"use client";

import { useParams } from "next/navigation";
import React, { use } from "react";
import { VisibilityContext } from "@/components/nav/VisibilityContext";
import { Icons } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export const SideMenuControl = ({ className, ...props }: React.ComponentProps<"button">) => {
 const { toggleSideNav, sideNavVisible } = use(VisibilityContext);
 const params = useParams();

 return (
  <>
   {params.server && (
    <button className={cn("bg-elements text-text ml-4 flex flex-row items-center gap-2 rounded-lg p-2 md:hidden", className)} onClick={toggleSideNav} type="button" {...props}>
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
};
