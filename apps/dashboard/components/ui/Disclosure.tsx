"use client";

import React from "react";
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/Accordion";

export interface DisclosureProps {
  button: React.ReactNode;
  children: React.ReactNode;
}

export const Disclosure = ({ button, children, ...props }: DisclosureProps) => (
  <Accordion {...props} type="single" collapsible>
    <AccordionItem value={"0"} className="border-0 mb-6">
      <AccordionTrigger className="rounded-lg border border-neutral-800 bg-background-navbar px-6 py-4 duration-200 data-[state=open]:mb-0 data-[state=open]:rounded-b-none">
        {button}
      </AccordionTrigger>
      <AccordionContent asChild className="w-full rounded-lg rounded-t-none border pt-4 border-t-0 border-neutral-800 bg-background-navbar">
        {children}
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);
