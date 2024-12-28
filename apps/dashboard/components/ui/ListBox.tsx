import { Listbox as DefaultListbox, ListboxButton as DefaultListboxButton, ListboxOption as DefaultListboxOption, ListboxOptions as DefaultListboxOptions, ListboxButtonProps, ListboxOptionProps, ListboxOptionsProps, Transition } from "@headlessui/react";
import { cva, VariantProps } from "class-variance-authority";
import React, { Fragment } from "react";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export const ListBoxArrow = () => <Icons.ChevronsUpDown className={iconVariants({ variant: "small", className: "text-gray-400 duration-200 motion-reduce:transition-none" })} />;

export const ListBoxButton = React.forwardRef<HTMLButtonElement, ListboxButtonProps>(({ className, ...props }, ref) => <DefaultListboxButton className={cn("hover:bg-background-menu-button ui-open:border-neutral-700 ui-open:bg-background-menu-button flex h-10 cursor-pointer select-none items-center gap-3 rounded-lg border border-neutral-800 px-3 py-2 text-sm font-normal duration-200 hover:border-neutral-700 motion-reduce:transition-none sm:text-sm", className)} {...props} ref={ref} />);

export const ListBoxOptions = React.forwardRef<HTMLDivElement, ListboxOptionsProps>(({ className, ...props }, ref) => (
 <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
  <DefaultListboxOptions ref={ref} className={cn("bg-background-secondary absolute z-10 mt-1 max-h-60 min-w-[--button-width] overflow-auto origin-top-left rounded-2xl border border-neutral-800 py-1 text-base shadow-lg sm:text-sm", className)} {...props} />
 </Transition>
));

const ListBoxOptionVariants = cva("relative mx-2 my-1 cursor-pointer select-none rounded-lg py-2 pl-4 pr-10 font-normal text-white/70 duration-200 ui-active:bg-accent-primary ui-active:text-white", {
 variants: {
  variant: {
   default: "ui-active:bg-button-primary",
   action: "ui-active:bg-button-action-primary",
  },
 },
 defaultVariants: {
  variant: "default",
 },
});

export interface CustomListBoxOptionProps extends ListboxOptionProps {
 variant?: VariantProps<typeof ListBoxOptionVariants>;
 children: React.ReactNode;
}

export const ListBoxOption = React.forwardRef<React.ElementRef<typeof DefaultListboxOption>, CustomListBoxOptionProps>(({ children, variant, ...props }, ref) => (
 <DefaultListboxOption ref={ref} className={ListBoxOptionVariants(variant)} {...props}>
  {children}
  <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-white duration-200 ui-selected:!opacity-100 ui-not-selected:opacity-0 ui-active:opacity-100 ui-not-active:opacity-0">
   <Icons.Check className={iconVariants({ variant: "normal" })} />
  </span>
 </DefaultListboxOption>
));

export const ListBox = React.forwardRef<React.ElementRef<typeof DefaultListbox>, React.ComponentPropsWithoutRef<typeof DefaultListbox>>(({ children, ...props }, ref) => (
 <DefaultListbox as="div" ref={ref} {...props}>
  {children}
 </DefaultListbox>
));
