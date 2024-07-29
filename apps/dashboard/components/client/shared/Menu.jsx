import { Menu as DefaultMenu, Transition } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import { Fragment } from "react";
import { Icons, iconVariants } from "@/components/Icons";

const MenuItem = ({ children, onClick, style = "default" }) => (
 <DefaultMenu.Item>
  <p
   onClick={onClick}
   className={clsx(
    {
     "ui-active:bg-button-primary": style === "default",
     "ui-active:bg-button-action-primary": style === "action",
    },
    "group my-1 flex w-full cursor-pointer items-center rounded-md p-2 text-sm font-normal text-gray-400 duration-200 ui-active:text-white motion-reduce:transition-none"
   )}
  >
   {children}
  </p>
 </DefaultMenu.Item>
);

const MenuLink = ({ children, href, style = "default", target = "_self" }) => (
 <DefaultMenu.Item>
  <Link
   href={href}
   target={target}
   className={clsx(
    {
     "ui-active:bg-button-primary": style === "default",
     "ui-active:bg-button-action-primary": style === "action",
    },
    "group my-1 flex w-full cursor-pointer items-center rounded-md p-2 text-sm font-normal text-gray-400 duration-200 ui-active:text-white motion-reduce:transition-none"
   )}
  >
   {children}
  </Link>
 </DefaultMenu.Item>
);

const Menu = ({ label, children }) => {
 return (
  <DefaultMenu as="div" className="relative">
   <DefaultMenu.Button className="ml-2 flex h-10 cursor-pointer select-none items-center gap-3 rounded-md border border-neutral-800 px-3 py-2 text-sm font-normal duration-200 hover:border-neutral-700 hover:bg-background-menu-button ui-open:border-neutral-700 ui-open:bg-background-menu-button motion-reduce:transition-none sm:text-sm">
    {label}
    <Icons.arrowDown className={iconVariants({ variant: "small", className: "ui-open:rotate-180 text-gray-400 duration-200 motion-reduce:transition-none" })} />
   </DefaultMenu.Button>
   <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
    <DefaultMenu.Items className="absolute right-0 z-50 mt-2 w-56 origin-top-right divide-y divide-neutral-800 rounded-xl border border-neutral-800 bg-background-secondary px-2 py-1 shadow-2xl">{children}</DefaultMenu.Items>
   </Transition>
  </DefaultMenu>
 );
};

Menu.Item = MenuItem;
Menu.Link = MenuLink;

export default Menu;
