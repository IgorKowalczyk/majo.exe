"use client";

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ExclamationCircleIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Fragment } from "react";

export const choices = [
 {
  title: "Disable",
  time: 0,
 },
 {
  title: "60 seconds",
  time: 60,
 },
 {
  title: "5 minutes",
  time: 300,
 },
 {
  title: "10 minutes",
  time: 600,
 },
 {
  title: "1 hour",
  time: 3600,
 },
 {
  title: "6 hours",
  time: 21600,
 },
 {
  title: "12 hours",
  time: 43200,
 },
 {
  title: "1 day",
  time: 86400,
 },
 {
  title: "1 week",
  time: 604800,
 },
];

export function TimeSelect({ selectedChoice, setSelectedChoice }) {
 return (
  <div>
   {choices && choices.length > 0 ? (
    <Listbox value={selectedChoice} onChange={(value) => setSelectedChoice(value)}>
     <Listbox.Button className="relative w-full cursor-pointer rounded-md border border-neutral-800 py-2 pl-3 pr-10 text-left font-normal duration-200 hover:border-neutral-700 sm:text-sm">
      <span className="flex items-center gap-2 truncate">{choices.find((choice) => choice?.time === selectedChoice)?.title || "No time selected"}</span>
      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
       <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </span>
     </Listbox.Button>
     <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
      <Listbox.Options className="bg-background-primary absolute z-[545] mt-1 max-h-60 w-fit overflow-auto rounded-md border border-neutral-800 py-1 text-base shadow-lg sm:text-sm">
       {choices.map((choice, index) => (
        <Listbox.Option key={index} className={({ active }) => `relative mx-2 my-1 cursor-pointer select-none rounded-md py-2 pl-10 pr-4 font-normal duration-200 ${active ? "bg-accent-primary text-white" : "text-white/70"}`} value={choice.time}>
         {({ selected, active }) => (
          <>
           <div className="flex items-center gap-1 truncate">{choice.title}</div>
           <span
            className={clsx(
             {
              "opacity-100": selected || active,
              "opacity-0": !selected || !active,
             },
             "absolute inset-y-0 left-0 flex items-center pl-3 text-white duration-200"
            )}
           >
            <CheckIcon className="h-5 w-5" aria-hidden="true" />
           </span>
          </>
         )}
        </Listbox.Option>
       ))}
      </Listbox.Options>
     </Transition>
    </Listbox>
   ) : (
    <div className="flex items-center justify-center gap-2 font-normal text-red-400">
     <ExclamationCircleIcon className="h-5 w-5" aria-hidden="true" />
     <span className="text-sm">No choices available!</span>
    </div>
   )}
  </div>
 );
}
