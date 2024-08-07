"use client";

import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Icons, iconVariants } from "@/components/Icons";

export function ViewSelect({ selectedValue, setSelectedValue }) {
 return (
  <div className="relative my-2 flex w-fit">
   <Listbox value={selectedValue} onChange={(value) => setSelectedValue(value)}>
    <Listbox.Button className="relative w-full cursor-pointer rounded-md border border-neutral-800 py-2 pl-3 pr-10 text-left font-normal duration-200 hover:border-neutral-700 hover:bg-background-menu-button ui-open:border-neutral-700 ui-open:bg-background-menu-button sm:text-sm">
     <span className="flex items-center gap-2 truncate">{selectedValue} results</span>
     <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
      <Icons.chevronsUpDown className={iconVariants({ variant: "small", className: "text-gray-400" })} />
     </span>
    </Listbox.Button>
    <Transition as={Fragment} enter="transition duration-200 ease-out" enterFrom="transform scale-95 opacity-0" enterTo="transform scale-100 opacity-100" leave="transition duration-200 ease-out" leaveFrom="transform scale-100 opacity-100" leaveTo="transform scale-95 opacity-0">
     <Listbox.Options className="absolute z-[545] mt-12 max-h-60 w-fit overflow-auto rounded-xl border border-neutral-800 bg-background-secondary py-1 text-base shadow-lg sm:text-sm">
      {[10, 20, 30, 40, 50].map((choice) => (
       <Listbox.Option key={`view-select-option-${choice}`} className="relative mx-2 my-1 cursor-pointer select-none rounded-md py-2 pl-4 pr-10 font-normal text-white/70 duration-200 ui-active:bg-accent-primary ui-active:text-white" value={choice}>
        <div className="flex items-center gap-1 truncate">{choice} results</div>
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-white duration-200 ui-selected:!opacity-100 ui-not-selected:opacity-0 ui-active:opacity-100 ui-not-active:opacity-0">
         <Icons.check className={iconVariants({ variant: "normal" })} />
        </span>
       </Listbox.Option>
      ))}
     </Listbox.Options>
    </Transition>
   </Listbox>
  </div>
 );
}
