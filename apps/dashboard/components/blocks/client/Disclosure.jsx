"use client";

import { Disclosure, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export function ClientDisclosure({ buttonElements, buttonIcon, children, ...props }) {
 return (
  <Disclosure {...props} className="w-full">
   {({ open }) => (
    <>
     <Disclosure.Button
      className={clsx("bg-background-navbar my-4 flex w-full flex-row items-center justify-start gap-4 rounded-md border border-neutral-800 px-6 py-4 duration-200", {
       "mb-0 rounded-b-none": open,
      })}
     >
      {buttonIcon && (
       <div
        className={clsx(
         {
          "[&>*]:fill-accent-primary": open,
         },
         "[&>*]:duration-200 [&>*]:motion-reduce:transition-none"
        )}
       >
        {buttonIcon}
       </div>
      )}
      {buttonElements}

      <ChevronDownIcon
       className={clsx(
        {
         "stroke-accent-primary rotate-180": open,
        },
        "ml-auto h-4 w-4 duration-200 motion-reduce:transition-none"
       )}
      />
     </Disclosure.Button>

     <Transition enter="transition duration-100 ease-out" enterFrom="transform scale-95 opacity-0" enterTo="w-full transform scale-100 opacity-100" leave="w-full transition duration-75 ease-out" leaveFrom="transform scale-100 opacity-100" leaveTo="w-full transform scale-95 opacity-0">
      <Disclosure.Panel className="bg-background-navbar w-full rounded-md rounded-t-none border border-t-0 border-neutral-800 px-6 py-4">{children}</Disclosure.Panel>
     </Transition>
    </>
   )}
  </Disclosure>
 );
}
