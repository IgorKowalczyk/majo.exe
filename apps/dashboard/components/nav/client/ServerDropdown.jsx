"use client";

import { Menu, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Fragment } from "react";
import { useState } from "react";
import { SWR } from "@/lib/swr";

export function ServerDropdown() {
 const router = useParams();
 const [isOpen, setIsOpen] = useState(false);
 const { data: servers, isLoading } = SWR("/api/servers/fetch");
 if (!router.server) return <></>;
 const currentServer = servers?.servers?.find((server) => server.id === router.server);

 return (
  <div className="flex items-center relative gap-2">
   <svg className="h-8 w-8 stroke-neutral-700" fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" width="24">
    <path d="M16.88 3.549L7.12 20.451"></path>
   </svg>

   <Menu className="relative">
    {({ open }) => (
     <>
      <Menu.Button className="flex cursor-pointer items-center gap-3 duration-200 motion-reduce:transition-none" onClick={() => setIsOpen(!isOpen)}>
       <div className="flex h-10 select-none items-center py-2 duration-200  motion-reduce:transition-none">
        {currentServer?.icon ? <Image width="32" height="32" quality={100} className="!h-8 !w-8 rounded-full" src={`https://cdn.discordapp.com/icons/${currentServer.id}/${currentServer.icon}.png`} loading="lazy" alt={`${currentServer.name} Icon`} /> : isLoading ? <div className="h-8 w-8 rounded-full bg-neutral-700 animate-pulse"></div> : <div className="h-8 w-8 rounded-full bg-neutral-700"></div>}
        <span className="!ml-2 ">{isLoading ? "Loading..." : servers?.servers?.find((server) => server.id === router.server)?.name || "Unknown Server"}</span>
        <ChevronUpDownIcon className="ml-2 h-4 w-4 duration-200 motion-reduce:transition-none" />
       </div>
      </Menu.Button>
      <Transition show={open} as={Fragment} enter="transition ease-out duration-200" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0" leave="transition ease-in duration-150" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-1">
       <Menu.Items className="fixed top-16 left-0 origin-top-left z-10 w-screen max-w-sm px-5 bg-background-menu mt-3 py-6 transform translate-x-1/2  border border-neutral-800 rounded">
        <p className="text-neutral-400 mb-4 pl-4">Select a server: </p>
        {isLoading ? (
         <>
          {Array.from(Array(5).keys()).map((i) => (
           <div key={i} className="animate-pulse fle gap-2 items-center space-x-4">
            <div className="rounded-full bg-neutral-700 h-12 w-12" />
            <div className="flex-1 space-y-4 py-1">
             <div className="h-4 bg-neutral-700 rounded w-3/4" />
            </div>
           </div>
          ))}
         </>
        ) : (
         <div className="flex flex-col items-start gap-2 w-full">
          {servers?.servers
           ?.filter((server) => server.bot)
           .map((server) => (
            <Menu.Item key={server.id}>
             <Link className="flex items-center gap-2 px-2 border border-transparent py-1 hover:border-neutral-800 rounded hover:bg-neutral-800/50 w-full" href={`/dashboard/${server.id}`} onClick={() => setIsOpen(!isOpen)}>
              {server.icon ? <Image src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.${server.icon.startsWith("a_") ? "gif" : "png"}`} alt={server.name} quality={95} width={48} height={48} className="w-12 h-12 rounded-full" /> : <div className="w-12 h-12 rounded-full bg-button-secondary" />}
              <span className="!ml-2 ">{server.name}</span>
             </Link>
            </Menu.Item>
           ))}
         </div>
        )}
       </Menu.Items>
      </Transition>
     </>
    )}
   </Menu>
  </div>
 );
}
