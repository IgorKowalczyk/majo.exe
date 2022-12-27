import { meta, social } from "@/config";
import { useSession, signIn, signOut } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HashtagIcon, RectangleStackIcon, Cog8ToothIcon, UserIcon, ArrowRightOnRectangleIcon, QuestionMarkCircleIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Invite } from "@components/buttons/Invite";
import Link from "next/link";
import Image from "next/image";

export function Nav() {
 const { data: session } = useSession();
 return (
  <nav className="fixed z-[9999] flex w-full items-center bg-background-navbar/70 py-4 text-left shadow-lg backdrop-blur-[9px]">
   <Link href="/" className="font-inter text-lg text-white">
    <div className="flex cursor-pointer items-center gap-2 px-4 text-xl duration-200 hover:opacity-90 motion-reduce:transition-none">
     <Image className="rounded-full" src={social.logo} alt="Majo.exe" width={36} height={36} />
     <h1 className="font-inter sm:block hidden">{meta.title}</h1>
    </div>
   </Link>
   <div className="ml-auto mr-4 font-inter">
    {session ? (
     <div className="flex items-center">
      <Link href="/dashboard" className="flex cursor-pointer items-center rounded bg-button-secondary px-4 py-2 font-inter leading-6 text-white duration-200 hover:bg-button-secondary-hover motion-reduce:transition-none">
       <svg className="mr-2 h-5 w-5" aria-hidden="true" role="img" viewBox="0 0 24 24">
        <path fill="currentColor" d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z" />
       </svg>
       Dashboard
      </Link>
      {session?.user && (
       <>
        <Menu as="div" className="relative inline-block text-left">
         <div>
          <Menu.Button className="ml-4 flex cursor-pointer items-center gap-3 duration-200 motion-reduce:transition-none">
           {({ open }) => (
            <div className={`${open ? "opacity-80" : "hover:opacity-80"} flex h-10 select-none items-center rounded bg-button-secondary px-4 py-2 duration-200 hover:bg-button-secondary-hover motion-reduce:transition-none`}>
             <Image width="30" height="30" className="!h-5 !w-5 rounded-full" src={session.user.image} loading="lazy" alt={`${session.user.name} Avatar`} />
             <span className="!ml-2 ">{session.user.name}</span>
             <ChevronDownIcon className={`${open ? "rotate-180" : ""} ml-2 h-4 w-4 duration-200 motion-reduce:transition-none`} />
            </div>
           )}
          </Menu.Button>
         </div>
         <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-700 rounded-md bg-background-menu p-1 shadow-2xl">
           <div className="px-1 py-1 ">
            <Menu.Item>
             {({ active }) => (
              <Link href="/user/profile" className={`${active ? "bg-button-primary text-white" : "text-gray-400"} group my-1 flex w-full items-center rounded-md px-2 py-2 text-sm duration-200 motion-reduce:transition-none`}>
               <UserIcon className="mr-2 h-5 w-5 " aria-hidden="true" role="img" /> View profile
              </Link>
             )}
            </Menu.Item>
            <Menu.Item>
             {({ active }) => (
              <Link href="/user/settings" className={`${active ? "bg-button-primary text-white" : "text-gray-400"} group my-1 flex w-full items-center rounded-md px-2 py-2 text-sm duration-200 motion-reduce:transition-none`}>
               <Cog8ToothIcon className="mr-2 h-5 w-5 " aria-hidden="true" role="img" /> Settings
              </Link>
             )}
            </Menu.Item>
           </div>
           <div className="px-1 py-1">
            <Menu.Item>
             {({ active }) => (
              <Link href="/dashboard" className={`${active ? "bg-button-primary text-white" : "text-gray-400"} group my-1 flex w-full items-center rounded-md px-2 py-2 text-sm duration-200 motion-reduce:transition-none`}>
               <RectangleStackIcon className="mr-2 h-5 w-5 " aria-hidden="true" role="img" /> Dashboard
              </Link>
             )}
            </Menu.Item>
            <Menu.Item>
             {({ active }) => (
              <Link href="/dashboard/guilds" className={`${active ? "bg-button-primary text-white" : "text-gray-400"} group my-1 flex w-full items-center rounded-md px-2 py-2 text-sm duration-200 motion-reduce:transition-none`}>
               <HashtagIcon className="mr-2 h-5 w-5 " aria-hidden="true" role="img" /> Your servers
              </Link>
             )}
            </Menu.Item>
           </div>
           <div className="px-1 py-1">
            <Menu.Item>
             {({ active }) => (
              <Link href="/discord" className={`${active ? "bg-button-primary text-white" : "text-gray-400"} group my-1 flex w-full items-center rounded-md px-2 py-2 text-sm duration-200 motion-reduce:transition-none`}>
               <QuestionMarkCircleIcon className="mr-2 h-5 w-5 " aria-hidden="true" role="img" /> Support
              </Link>
             )}
            </Menu.Item>
            <Menu.Item>
             {({ active }) => (
              <button onClick={() => signOut()} className={`${active ? "bg-button-action-primary text-white" : "text-gray-400"} group my-1 flex w-full items-center rounded-md px-2 py-2 text-sm duration-200 motion-reduce:transition-none`}>
               <ArrowRightOnRectangleIcon className="mr-2 h-5 w-5" aria-hidden="true" role="img" /> Logout
              </button>
             )}
            </Menu.Item>
           </div>
          </Menu.Items>
         </Transition>
        </Menu>
       </>
      )}
     </div>
    ) : (
     <div className="flex items-center justify-center gap-2">
      <div className="md:block hidden">
       <Invite />
      </div>
      <button onClick={() => signIn("discord")} className="flex cursor-pointer items-center rounded bg-button-primary px-4 py-2 font-inter leading-6 text-white duration-200 hover:bg-button-primary-hover motion-reduce:transition-none">
       <svg className="mr-2 h-5 w-5" aria-hidden="true" role="img" viewBox="0 0 24 24">
        <path fill="currentColor" d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z" />
       </svg>
       Login with Discord
      </button>
     </div>
    )}
   </div>
  </nav>
 );
}
