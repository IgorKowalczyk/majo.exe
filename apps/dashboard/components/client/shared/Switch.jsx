"use client";

import { Switch as HeadlessSwitch } from "@headlessui/react";
import { cn } from "@/lib/utils";

export default function Switch({ enabled = false, onChange, disabled = false }) {
 return (
  <HeadlessSwitch
   checked={enabled}
   onChange={() => onChange()}
   className={cn(
    {
     "!border-accent-primary bg-accent-primary": enabled,
     "border-neutral-700 bg-transparent": !enabled,
     "!cursor-not-allowed !opacity-50": disabled,
    },
    "relative inline-flex max-h-[24px] w-[45px] cursor-pointer items-center rounded-full border text-left text-gray-200/75 ring-0 transition-colors duration-200 ease-in-out hover:border-neutral-600 hover:text-gray-200 focus-visible:ring-2 focus-visible:ring-opacity-75 motion-reduce:transition-none"
   )}
  >
   <span className="sr-only">Use setting</span>
   <span
    aria-hidden="true"
    className={cn(
     {
      "translate-x-[24px] bg-white": enabled,
      "translate-x-[4px]": !enabled,
      "!bg-white": disabled,
     },
     "pointer-events-none my-[5px] inline-block size-[16px] rounded-full bg-gray-200 !ring-0 transition ease-in-out"
    )}
   />
  </HeadlessSwitch>
 );
}
