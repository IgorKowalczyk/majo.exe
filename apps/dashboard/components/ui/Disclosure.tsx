"use client";

import { Disclosure as HeadlessDisclosure, DisclosureButton, DisclosurePanel, Transition } from "@headlessui/react";
import React from "react";
import { Icons, iconVariants } from "@/components/ui/Icons";

export const Disclosure = React.forwardRef<HTMLDivElement, { button: React.ReactNode; children: React.ReactNode } & React.ComponentProps<typeof HeadlessDisclosure>>(({ button, children, ...props }, ref) => (
 <HeadlessDisclosure as="div" className="w-full" {...props} ref={ref}>
  <>
   <DisclosureButton className="my-4 flex w-full flex-row items-center justify-start gap-4 rounded-md border border-neutral-800 bg-background-navbar px-6 py-4 duration-200 ui-open:mb-0 ui-open:rounded-b-none">
    {button}
    <Icons.arrowDown className={iconVariants({ variant: "small", className: "ui-open:stroke-accent-primary ui-open:rotate-180 ml-auto duration-200 motion-reduce:transition-none" })} />
   </DisclosureButton>

   <Transition enter="transition duration-100 ease-out" enterFrom="transform scale-95 opacity-0" enterTo="w-full transform scale-100 opacity-100" leave="w-full transition duration-75 ease-out" leaveFrom="transform scale-100 opacity-100" leaveTo="w-full transform scale-95 opacity-0">
    <DisclosurePanel className="w-full rounded-md rounded-t-none border border-t-0 border-neutral-800 bg-background-navbar px-6 py-4">{children}</DisclosurePanel>
   </Transition>
  </>
 </HeadlessDisclosure>
));
