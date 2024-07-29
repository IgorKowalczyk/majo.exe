"use client";

import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Icons, iconVariants } from "@/components/Icons";

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
     <Listbox.Button className="hover:bg-background-menu-button ui-open:border-neutral-700 ui-open:bg-background-menu-button relative w-full cursor-pointer rounded-md border border-neutral-800 py-2 pl-3 pr-10 text-left font-normal duration-200 hover:border-neutral-700 sm:text-sm">
      <span className="flex items-center gap-2 truncate">{choices.find((choice) => choice?.time === selectedChoice)?.title || "No time selected"}</span>
      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
       <Icons.chevronsUpDown className={iconVariants({ variant: "small", className: "text-gray-400" })} />
      </span>
     </Listbox.Button>
     <Transition as={Fragment} enter="transition duration-200 ease-out" enterFrom="transform scale-95 opacity-0" enterTo="transform scale-100 opacity-100" leave="transition duration-200 ease-out" leaveFrom="transform scale-100 opacity-100" leaveTo="transform scale-95 opacity-0">
      <Listbox.Options className="bg-background-secondary absolute z-[545] mt-1 max-h-60 w-fit overflow-auto rounded-xl border border-neutral-800 py-1 text-base shadow-lg sm:text-sm">
       {choices.map((choice) => (
        <Listbox.Option key={`choice-select-option-${choice.time}`} className="ui-active:bg-accent-primary ui-active:text-white relative mx-2 my-1 cursor-pointer select-none rounded-md py-2 pl-4 pr-10 font-normal text-white/70 duration-200" value={choice.time}>
         <div className="flex items-center gap-1 truncate">{choice.title}</div>
         <span className="ui-selected:!opacity-100 ui-not-selected:opacity-0 ui-active:opacity-100 ui-not-active:opacity-0 absolute inset-y-0 right-0 flex items-center pr-3 text-white duration-200">
          <Icons.check className={iconVariants({ variant: "normal" })} />
         </span>
        </Listbox.Option>
       ))}
      </Listbox.Options>
     </Transition>
    </Listbox>
   ) : (
    <div className="flex items-center justify-center gap-2 font-normal text-red-400">
     <Icons.warning className={iconVariants({ variant: "normal" })} />
     <span className="text-sm">No choices available!</span>
    </div>
   )}
  </div>
 );
}
