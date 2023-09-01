"use client";

import { Switch as HeadlessSwitch } from "@headlessui/react";
import clsx from "clsx";

export default function Switch({ enabled, onChange, disabled = false }) {
 return (
  <HeadlessSwitch
   checked={enabled}
   onChange={() => onChange()}
   disabled={disabled}
   className={clsx(
    {
     "border-accent-primary bg-accent-primary": enabled,
     "border-neutral-700 bg-transparent": !enabled,
     "!cursor-not-allowed !opacity-50": disabled,
    },
    "relative inline-flex h-[30px] w-[50px] shrink-0 cursor-pointer items-center rounded-lg border-[1px] text-left text-gray-200/75 ring-0 transition-colors  duration-200 ease-in-out hover:border-neutral-600 hover:text-gray-200 focus-visible:ring-2 focus-visible:ring-opacity-75 motion-reduce:transition-none"
   )}
  >
   <span className="sr-only">Use setting</span>
   <span
    aria-hidden="true"
    className={clsx(
     {
      "translate-x-[25px] bg-gray-700": enabled,
      "translate-x-[5px]": !enabled,
      "!bg-white": disabled,
     },
     "pointer-events-none mb-[1px] inline-block h-[20px] w-[20px] transform rounded-lg bg-gray-200 !ring-0 transition ease-in-out"
    )}
   />
  </HeadlessSwitch>
 );
}
