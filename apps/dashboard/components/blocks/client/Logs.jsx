"use client";

import { Disclosure, Transition } from "@headlessui/react";
import { NoSymbolIcon, ChevronDownIcon, PaintBrushIcon } from "@heroicons/react/24/outline";
import { formatDate } from "@majoexe/util/functions";
import clsx from "clsx";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { TextSkeleton } from "../Skeletons";

export default function Logs({ initialItems, id }) {
 const fetching = useRef(false);
 const [pages, setPages] = useState([initialItems]);
 const items = pages.flatMap((page) => page);
 const [hasMore, setHasMore] = useState(true);

 const loadMore = async (page) => {
  if (!fetching.current) {
   try {
    fetching.current = true;
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/logs/${id}?page=${page}`);
    const data = await response.json();
    if (!data.length) {
     setHasMore(false);
     return;
    }
    const filteredData = data.filter((item) => !items.some((i) => i.id === item.id));
    setPages((prev) => [...prev, filteredData]);
   } finally {
    fetching.current = false;
   }
  }
 };

 useEffect(() => {
  if (pages.length === 1 && !initialItems.length) {
   setHasMore(false);
  }
 }, [initialItems.length, pages.length]);

 return (
  <div className="flex w-auto items-center flex-col gap-4">
   <InfiniteScroll hasMore={hasMore} pageStart={0} loadMore={loadMore} loader={<TextSkeleton className="w-full mt-4 !h-20" />}>
    {items.map((item) => (
     <Disclosure key={item.id}>
      {({ open }) => (
       <>
        <Disclosure.Button
         className={clsx("flex flex-row duration-200 items-center justify-start gap-4 py-4 w-full my-4 px-6 max-w-2xl rounded-md border border-neutral-800 bg-background-navbar", {
          "rounded-b-none mb-0": open,
         })}
        >
         <div className="relative">
          {item.user?.avatar && <Image src={`https://cdn.discordapp.com/avatars/${item.user?.discordId}/${item.user?.avatar}.${item.user?.avatar.startsWith("a_") ? "gif" : "png"}`} alt={`${item.user?.name} avatar`} quality={95} width={32} height={32} className="w-12 h-12 rounded-full" />}
          {item.type === "profanity" && <NoSymbolIcon className="h-5 w-5 min-w-[20px] min-h-[20px] opacity-80 absolute bottom-0 right-0 border border-white/10 bg-button-secondary/80 rounded-full p-1" />}
          {item.type === "embed_color" && <PaintBrushIcon className="h-5 w-5 min-w-[20px] min-h-[20px] opacity-80 absolute bottom-0 right-0 border border-white/10 bg-button-secondary/80 rounded-full p-1" />}
         </div>
         <div className="flex flex-col">
          <p className="font-bold text-left">
           {item.user?.name || item.user?.id}
           <span className="opacity-70">#{item.user?.discriminator || "0000"}</span> {item.content}
          </p>
          <span className="opacity-70 text-left">{formatDate(item.createdAt)}</span>
         </div>
         <ChevronDownIcon
          className={clsx(
           {
            "rotate-180": open,
           },
           "ml-auto h-4 w-4 duration-200 motion-reduce:transition-none"
          )}
         />
        </Disclosure.Button>

        <Transition enter="transition duration-100 ease-out" enterFrom="transform scale-95 opacity-0" enterTo="transform scale-100 opacity-100" leave="transition duration-75 ease-out" leaveFrom="transform scale-100 opacity-100" leaveTo="transform scale-95 opacity-0">
         <Disclosure.Panel className="py-4 w-full px-6 max-w-2xl rounded-md border border-neutral-800 border-t-0 rounded-t-none bg-background-navbar">
          {item.actionTaken && (
           <p>
            <span className="font-bold">Action taken:</span> None
           </p>
          )}
          <p>
           <span className="font-bold">Type:</span> {item.type}
          </p>
          <p>
           <span className="font-bold">Date:</span> {item.createdAt}
          </p>
          <p>
           <span className="font-bold">User:</span> {item.user?.name || item.user?.id}
           <span className="opacity-70">#{item.user?.discriminator || "0000"}</span> (ID: {item.user?.discordId || item.user?.id})
          </p>
         </Disclosure.Panel>
        </Transition>
       </>
      )}
     </Disclosure>
    ))}
   </InfiniteScroll>
  </div>
 );
}
