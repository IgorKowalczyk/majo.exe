"use client";

import { Menu, Transition } from "@headlessui/react";
import { RectangleStackIcon, UserIcon, ArrowRightOnRectangleIcon, QuestionMarkCircleIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Fragment } from "react";
import Image from "@/components/blocks/client/shared/Image";

export function UserMenuDropdown({ user }) {
 return (
  <>
   <Menu as="div" className="relative inline-block text-left">
    <div>
     <Menu.Button className="ui-open:border-neutral-700 hover:bg-background-menu-button ui-open:bg-background-menu-button ml-4 flex h-10 cursor-pointer select-none items-center gap-2 rounded border border-neutral-800 px-4 py-2 duration-200 hover:border-neutral-700 motion-reduce:transition-none">
      <Image width="32" height="32" quality={100} className="min-h-6 min-w-6 -ml-1 !h-6 !w-6 rounded-full" src={user.image} loading="lazy" alt={`${user.name} Avatar`} />
      <span>{user.global_name || user.name}</span>
      <ChevronDownIcon className="min-h-4 ui-open:rotate-180 min-w-4 h-4 w-4 duration-200 motion-reduce:transition-none" />
     </Menu.Button>
    </div>
    <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
     <Menu.Items className="bg-background-menu absolute right-0 mt-2 w-56 origin-top-right divide-y divide-neutral-800 rounded-xl border border-neutral-800 p-1 shadow-2xl">
      <div className="px-1">
       <Menu.Item>
        <Link href="/dashboard" className="ui-active:bg-button-primary ui-active:text-white group my-1 flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-400 duration-200 motion-reduce:transition-none">
         <RectangleStackIcon className="min-h-5 min-w-5 mr-2 h-5 w-5 " aria-hidden="true" role="img" /> Dashboard
        </Link>
       </Menu.Item>
       <Menu.Item>
        <Link href="/user/profile" className="ui-active:bg-button-primary ui-active:text-white group my-1 flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-400 duration-200 motion-reduce:transition-none">
         <UserIcon className="min-h-5 min-w-5 mr-2 h-5 w-5 " aria-hidden="true" role="img" /> Profile
        </Link>
       </Menu.Item>
      </div>
      <div className="px-1 pt-1">
       <Menu.Item>
        <Link href="/discord" className="ui-active:bg-button-primary ui-active:text-white group my-1 flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-400 duration-200 motion-reduce:transition-none">
         <QuestionMarkCircleIcon className="min-h-5 min-w-5 mr-2 h-5 w-5 " aria-hidden="true" role="img" /> Support
        </Link>
       </Menu.Item>
       <Menu.Item>
        <button onClick={() => signOut({ redirect: true, callbackUrl: "/" })} className="ui-active:bg-button-action-primary ui-active:text-white group my-1 flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-400 duration-200 motion-reduce:transition-none">
         <ArrowRightOnRectangleIcon className="min-h-5 min-w-5 mr-2 h-5 w-5" aria-hidden="true" role="img" /> Logout
        </button>
       </Menu.Item>
      </div>
     </Menu.Items>
    </Transition>
   </Menu>
  </>
 );
}
