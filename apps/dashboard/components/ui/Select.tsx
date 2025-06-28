"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { cva, VariantProps } from "class-variance-authority";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import React from "react";
import { buttonVariants } from "@/components/ui/Buttons";
import { iconVariants } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = ({ className, ref, children, ...props }: React.ComponentPropsWithRef<typeof SelectPrimitive.Trigger>) => (
 <SelectPrimitive.Trigger ref={ref} className={cn(buttonVariants({ variant: "select" }), className)} {...props}>
  {children}
  <SelectPrimitive.Icon asChild>
   <ChevronsUpDownIcon
    className={iconVariants({
     variant: "small",
     className: "text-neutral-400 duration-200 motion-reduce:transition-none",
    })}
   />
  </SelectPrimitive.Icon>
 </SelectPrimitive.Trigger>
);

const SelectContent = ({ className, position = "popper", sideOffset = 4, ...props }: React.ComponentPropsWithRef<typeof SelectPrimitive.Content>) => (
 <SelectPrimitive.Portal>
  <SelectPrimitive.Content
   position={position}
   sideOffset={sideOffset}
   className={cn(
    "bg-background-secondary absolute z-10 mt-1 max-h-60 min-w-[--radix-select-trigger-width] overflow-auto origin-top-left rounded-2xl border border-neutral-800 py-1 text-base shadow-lg sm:text-sm",
    "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
    className
   )}
   {...props}
  >
   <SelectPrimitive.Viewport>{props.children}</SelectPrimitive.Viewport>
  </SelectPrimitive.Content>
 </SelectPrimitive.Portal>
);

const SelectItemVariants = cva(
 "relative mx-2 my-1 cursor-pointer select-none rounded-lg py-2 pl-4 pr-10 font-normal text-white/70 duration-200 data-[highlighted]:bg-accent-primary data-[highlighted]:text-white",
 {
  variants: {
   variant: {
    default: "data-[highlighted]:bg-button-primary",
    action: "data-[highlighted]:bg-button-action-primary",
   },
  },
  defaultVariants: {
   variant: "default",
  },
 }
);

export interface CustomSelectItemProps extends React.ComponentPropsWithRef<typeof SelectPrimitive.Item> {
 variant?: VariantProps<typeof SelectItemVariants>;
 children: React.ReactNode;
}

const SelectItem = ({ children, variant, ...props }: CustomSelectItemProps) => (
 <SelectPrimitive.Item className={cn(SelectItemVariants(variant), "data-[state=checked]:animate-in data-[state=unchecked]:animate-out focus-visible:outline-0")} {...props}>
  <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  <SelectPrimitive.ItemIndicator className="absolute inset-y-0 right-0 flex items-center pr-3 text-white duration-200 data-[state=checked]:!opacity-100 data-[state=unchecked]:opacity-0 data-[highlighted]:opacity-100 data-[unhighlighted]:opacity-0">
   <CheckIcon className={iconVariants({ variant: "normal" })} />
  </SelectPrimitive.ItemIndicator>
 </SelectPrimitive.Item>
);

export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectItem };
