"use client";

import { Switch as HeadlessSwitch } from "@headlessui/react";
import clsx from "clsx";

export default function Switch({ enabled = false, onChange, disabled = false }) {
 return (
  <HeadlessSwitch
   checked={enabled}
   onChange={() => onChange()}
   className={clsx(
    {
     "!border-accent-primary bg-accent-primary": enabled,
     "border-neutral-700 bg-transparent": !enabled,
     "!cursor-not-allowed !opacity-50": disabled,
    },
    "relative inline-flex w-[50px] max-h-[30px] cursor-pointer items-center rounded-lg border text-left text-gray-200/75 ring-0 transition-colors duration-200 ease-in-out hover:border-neutral-600 hover:text-gray-200 focus-visible:ring-2 focus-visible:ring-opacity-75 motion-reduce:transition-none"
   )}
  >
   <span className="sr-only">Use setting</span>
   <span
    aria-hidden="true"
    className={clsx(
     {
      "translate-x-[25px] bg-white": enabled,
      "translate-x-[5px]": !enabled,
      "!bg-white": disabled,
     },
     "pointer-events-none inline-block my-[5px] h-[20px] w-[20px] transform rounded bg-gray-200 !ring-0 transition ease-in-out"
    )}
   />
  </HeadlessSwitch>
 );
}
