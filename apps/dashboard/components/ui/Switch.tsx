"use client";

import { Switch as HeadlessSwitch } from "@headlessui/react";
import React from "react";
import { cn } from "@/lib/utils";

export const Switch = React.forwardRef<React.ElementRef<typeof HeadlessSwitch>, React.ComponentProps<typeof HeadlessSwitch>>(({ className, checked, onChange, disabled }, ref) => {
 return (
  <HeadlessSwitch
   checked={checked}
   onChange={(e) => onChange && onChange(e)}
   className={cn(
    {
     "!border-accent-primary bg-accent-primary": checked,
     "border-neutral-700 bg-transparent": !checked,
     "!cursor-not-allowed !opacity-50": disabled,
    },
    "relative inline-flex flex-shrink-0 max-h-[24px] w-[45px] cursor-pointer items-center rounded-full border text-left text-gray-200/75 ring-0 transition-colors duration-200 ease-in-out hover:border-neutral-600 hover:text-gray-200 focus-visible:ring-2 focus-visible:ring-opacity-75 motion-reduce:transition-none",
    className
   )}
   ref={ref}
  >
   <span className="sr-only">Use setting</span>
   <span
    aria-hidden="true"
    className={cn(
     {
      "translate-x-[24px] bg-white": checked,
      "translate-x-[4px]": !checked,
      "!bg-white": disabled,
     },
     "pointer-events-none my-[5px] inline-block size-[16px] rounded-full bg-gray-200 !ring-0 transition ease-in-out"
    )}
   />
  </HeadlessSwitch>
 );
});
