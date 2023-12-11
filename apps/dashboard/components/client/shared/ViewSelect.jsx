"use client";

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

export function ViewSelect({ selectedValue, setSelectedValue }) {
 return (
  <div className="relative my-2 flex w-fit">
   <Listbox value={selectedValue} onChange={(value) => setSelectedValue(value)}>
    <Listbox.Button className="hover:bg-background-menu-button ui-open:bg-background-menu-button ui-open:border-neutral-700 relative w-full cursor-pointer rounded-md border border-neutral-800 py-2 pl-3 pr-10 text-left font-normal duration-200 hover:border-neutral-700 sm:text-sm">
     <span className="flex items-center gap-2 truncate">{selectedValue} results</span>
     <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
      <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
     </span>
    </Listbox.Button>
    <Transition as={Fragment} enter="transition duration-200 ease-out" enterFrom="transform scale-95 opacity-0" enterTo="transform scale-100 opacity-100" leave="transition duration-200 ease-out" leaveFrom="transform scale-100 opacity-100" leaveTo="transform scale-95 opacity-0">
     <Listbox.Options className="bg-background-secondary absolute z-[545] mt-12 max-h-60 w-fit overflow-auto rounded-xl border border-neutral-800 py-1 text-base shadow-lg sm:text-sm">
      {[10, 20, 30, 40, 50].map((choice, index) => (
       <Listbox.Option key={index} className="ui-active:bg-accent-primary ui-active:text-white relative mx-2 my-1 cursor-pointer select-none rounded-md py-2 pl-4 pr-10 font-normal text-white/70 duration-200" value={choice}>
        <div className="flex items-center gap-1 truncate">{choice} results</div>
        <span className="ui-selected:!opacity-100 ui-not-selected:opacity-0 ui-active:opacity-100 ui-not-active:opacity-0 absolute inset-y-0 right-0 flex items-center pr-3 text-white duration-200">
         <CheckIcon className="h-5 w-5" aria-hidden="true" />
        </span>
       </Listbox.Option>
      ))}
     </Listbox.Options>
    </Transition>
   </Listbox>
  </div>
 );
}
