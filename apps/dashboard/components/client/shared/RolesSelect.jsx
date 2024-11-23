"use client";

import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Icons, iconVariants } from "@/components/Icons";

export function RolesSelect({ allRoles, exemptRoles, setExemptRoles }) {
 return (
  <>
   {allRoles && allRoles.length > 0 ? (
    <div>
     <Listbox value={exemptRoles} onChange={(value) => setExemptRoles(value)} multiple={true}>
      <Listbox.Button className="relative w-full cursor-pointer rounded-md border border-neutral-800 py-2 pl-3 pr-10 text-left font-normal duration-200 hover:border-neutral-700 hover:bg-background-menu-button ui-open:border-neutral-700 ui-open:bg-background-menu-button sm:text-sm">
       <span className="flex items-center gap-2 truncate">
        {exemptRoles.length > 0 && allRoles.find((role) => role?.id === exemptRoles[0]) ? (
         <>
          <div className="size-3 rounded-full" style={{ backgroundColor: allRoles.find((role) => role?.id === exemptRoles[0]).color || "#FFFFFF" }} />
          {allRoles.find((role) => role?.id === exemptRoles[0]).name} {exemptRoles.length - 1 > 0 ? `+ ${exemptRoles.length - 1} more` : ""}
         </>
        ) : (
         "No roles selected"
        )}
       </span>
       <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <Icons.ChevronsUpDown className={iconVariants({ variant: "small", className: "text-gray-400" })} />
       </span>
      </Listbox.Button>
      <Transition as={Fragment} enter="transition duration-200 ease-out" enterFrom="transform scale-95 opacity-0" enterTo="transform scale-100 opacity-100" leave="transition duration-200 ease-out" leaveFrom="transform scale-100 opacity-100" leaveTo="transform scale-95 opacity-0">
       <Listbox.Options className="absolute z-[544] mt-1 max-h-60 w-fit overflow-auto rounded-xl border border-neutral-800 bg-background-secondary py-1 text-base shadow-lg sm:text-sm">
        {allRoles.map((role) => (
         <Listbox.Option key={`role-select-option-${role.id}`} className="relative mx-2 my-1 cursor-pointer select-none rounded-md py-2 pl-4 pr-10 font-normal text-white/70 duration-200 ui-active:bg-accent-primary ui-active:text-white" value={role.id}>
          <div className="flex items-center gap-1 truncate">
           <div className="size-3 rounded-full" style={{ backgroundColor: role.color || "#FFFFFF" }} />
           {role.name}
          </div>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-white duration-200 ui-selected:!opacity-100 ui-not-selected:opacity-0 ui-active:opacity-100 ui-not-active:opacity-0">
           <Icons.Check className={iconVariants({ variant: "normal" })} />
          </span>
         </Listbox.Option>
        ))}
       </Listbox.Options>
      </Transition>
     </Listbox>
    </div>
   ) : (
    <div className="mt-2 flex flex-row flex-wrap items-center gap-2 text-center font-bold">
     Ignore Roles:
     <div className="flex items-center justify-center gap-2 font-normal text-red-400">
      <Icons.warning className={iconVariants({ variant: "normal" })} />
      <span className="text-sm">No roles on this server</span>
     </div>
    </div>
   )}
  </>
 );
}
