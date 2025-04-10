import { Menu as DefaultMenu, MenuButton as DefaultMenuButton, MenuItem as DefaultMenuItem, MenuItems as DefaultMenuItems, MenuButtonProps, MenuItemProps, MenuItemsProps, Transition } from "@headlessui/react";
import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";
import React, { Fragment } from "react";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export const MenuArrow = () => <Icons.arrowDown className={iconVariants({ variant: "small", className: "ui-open:rotate-180 text-gray-400 duration-200 motion-reduce:transition-none" })} />;

export function MenuButton({ className, ...props }: MenuButtonProps) {
 return <DefaultMenuButton data-slot="menu-button" className={cn("hover:bg-background-menu-button ui-open:border-neutral-700 ui-open:bg-background-menu-button flex h-10 cursor-pointer select-none items-center gap-3 rounded-lg border border-neutral-800 px-3 py-2 text-sm font-normal duration-200 hover:border-neutral-700 motion-reduce:transition-none sm:text-sm", className)} {...props} />;
}

export function MenuItems({ className, ...props }: MenuItemsProps) {
 return (
  <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
   <DefaultMenuItems data-slot="menu-items" className={cn("bg-background-secondary absolute right-0 z-50 mt-2 min-w-(--button-width) origin-top-right divide-y outline-0 divide-neutral-800 rounded-2xl border border-neutral-800 px-2 py-1 shadow-2xl", className)} {...props} />
  </Transition>
 );
}

const MenuItemVariants = cva("group my-1 flex w-full cursor-pointer items-center rounded-lg p-2 text-sm font-normal text-gray-400 duration-200 ui-active:text-white motion-reduce:transition-none", {
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

export interface CustomMenuItemProps extends MenuItemProps {
 variant?: VariantProps<typeof MenuItemVariants>;
 onClick?: (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => void;
 children: React.ReactNode;
}

export function MenuItem({ children, variant, ...props }: CustomMenuItemProps) {
 return (
  <DefaultMenuItem {...props}>
   <p onClick={props.onClick} className={MenuItemVariants(variant)}>
    {children}
   </p>
  </DefaultMenuItem>
 );
}

export interface MenuLinkProps extends MenuItemProps {
 href: string;
 variant?: VariantProps<typeof MenuItemVariants>;
 target?: string;
 children: React.ReactNode;
}

export function MenuLink({ children, href, variant, target, ...props }: MenuLinkProps) {
 return (
  <DefaultMenuItem {...props}>
   <Link href={href} target={target} className={MenuItemVariants(variant)}>
    {children}
   </Link>
  </DefaultMenuItem>
 );
}

export function Menu({ children, ...props }: React.ComponentProps<typeof DefaultMenu>) {
 return (
  <DefaultMenu as="div" className="relative" {...props}>
   {children}
  </DefaultMenu>
 );
}
