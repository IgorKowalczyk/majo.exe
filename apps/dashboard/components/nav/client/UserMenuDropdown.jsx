"use client";

import { Menu, Transition } from "@headlessui/react";
import { RectangleStackIcon, Cog8ToothIcon, UserIcon, ArrowRightOnRectangleIcon, QuestionMarkCircleIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Fragment } from "react";

export function UserMenuDropdown({ user }) {
 return (
  <>
   <Menu as="div" className="relative inline-block text-left">
    <div>
     <Menu.Button className="ml-4 flex cursor-pointer items-center gap-3 duration-200 motion-reduce:transition-none">
      {({ open }) => (
       <div
        className={clsx(
         {
          "opacity-80": open,
          "hover:opacity-80": !open,
         },
         "flex h-10 select-none items-center rounded border border-neutral-700 bg-background-menu-button px-4 py-2 duration-200  motion-reduce:transition-none"
        )}
       >
        <Image width="32" height="32" quality={100} className="!h-8 !w-8 rounded-full" src={user.image} loading="lazy" alt={`${user.name} Avatar`} />
        <span className="!ml-2 ">{user.name}</span>
        <ChevronDownIcon
         className={clsx(
          {
           "rotate-180": open,
          },
          "ml-2 h-4 w-4 duration-200 motion-reduce:transition-none"
         )}
        />
       </div>
      )}
     </Menu.Button>
    </div>
    <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
     <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-neutral-800 rounded-md border border-neutral-800 bg-background-menu p-1 shadow-2xl">
      <div className="px-1 py-1 ">
       <Menu.Item>
        {({ active }) => (
         <Link
          href="/dashboard"
          className={clsx(
           {
            "bg-button-primary text-white": active,
            "text-gray-400": !active,
           },
           "group my-1 flex w-full items-center rounded-md px-2 py-2 text-sm duration-200 motion-reduce:transition-none"
          )}
         >
          <RectangleStackIcon className="mr-2 h-5 w-5 " aria-hidden="true" role="img" /> Dashboard
         </Link>
        )}
       </Menu.Item>
       <Menu.Item>
        {({ active }) => (
         <Link
          href="/user/profile"
          className={clsx(
           {
            "bg-button-primary text-white": active,
            "text-gray-400": !active,
           },
           "group my-1 flex w-full items-center rounded-md px-2 py-2 text-sm duration-200 motion-reduce:transition-none"
          )}
         >
          <UserIcon className="mr-2 h-5 w-5 " aria-hidden="true" role="img" /> Profile
         </Link>
        )}
       </Menu.Item>
       <Menu.Item>
        {({ active }) => (
         <Link
          href="/user/settings"
          className={clsx(
           {
            "bg-button-primary text-white": active,
            "text-gray-400": !active,
           },
           "group my-1 flex w-full items-center rounded-md px-2 py-2 text-sm duration-200 motion-reduce:transition-none"
          )}
         >
          <Cog8ToothIcon className="mr-2 h-5 w-5 " aria-hidden="true" role="img" /> Settings
         </Link>
        )}
       </Menu.Item>
      </div>
      <div className="px-1 py-1">
       <Menu.Item>
        {({ active }) => (
         <Link
          href="/discord"
          className={clsx(
           {
            "bg-button-primary text-white": active,
            "text-gray-400": !active,
           },
           "group my-1 flex w-full items-center rounded-md px-2 py-2 text-sm duration-200 motion-reduce:transition-none"
          )}
         >
          <QuestionMarkCircleIcon className="mr-2 h-5 w-5 " aria-hidden="true" role="img" /> Support
         </Link>
        )}
       </Menu.Item>
       <Menu.Item>
        {({ active }) => (
         <button
          onClick={() => signOut()}
          className={clsx(
           {
            "bg-button-action-primary text-white": active,
            "text-gray-400": !active,
           },
           "group my-1 flex w-full items-center rounded-md px-2 py-2 text-sm duration-200 motion-reduce:transition-none"
          )}
         >
          <ArrowRightOnRectangleIcon className="mr-2 h-5 w-5" aria-hidden="true" role="img" /> Logout
         </button>
        )}
       </Menu.Item>
      </div>
     </Menu.Items>
    </Transition>
   </Menu>
  </>
 );
}
