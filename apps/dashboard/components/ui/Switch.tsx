"use client";

import * as SwitchPrimitives from "@radix-ui/react-switch";
import * as React from "react";
import { cn } from "@/lib/utils";

export const Switch = ({ className, ...props }: React.ComponentProps<typeof SwitchPrimitives.Root>) => {
 return (
  <SwitchPrimitives.Root
   className={cn(
    "peer inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-accent-primary! data-[state=checked]:bg-accent-primary data-[state=unchecked]:border-neutral-700 data-[state=unchecked]:bg-transparent",
    className
   )}
   {...props}
  >
   <SwitchPrimitives.Thumb
    className={cn(
     "pointer-events-none block size-5 rounded-full bg-gray-200 shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[26px] data-[state=checked]:bg-white data-[state=unchecked]:translate-x-[4px] data-[state=disabled]:bg-white!"
    )}
   />
  </SwitchPrimitives.Root>
 );
};
