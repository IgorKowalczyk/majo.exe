"use client";

import { MagnifyingGlassIcon, BarsArrowDownIcon, BarsArrowUpIcon } from "@heroicons/react/24/outline";
import { CubeTransparentIcon, CubeIcon, NoSymbolIcon, PaintBrushIcon, LinkIcon, UsersIcon } from "@heroicons/react/24/solid";
import { formatDate, formatDuration } from "@majoexe/util/functions";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { GraphSkeleton } from "../../Skeletons";
import { Disclosure } from "../shared/Disclosure";
import { Tooltip } from "../shared/Tooltip";
import Image from "@/components/blocks/client/shared/Image";
import { InputWithIcon } from "@/components/buttons/server/Input";

export default function Logs({ initialItems, id }) {
 const fetching = useRef(false);
 const [pages, setPages] = useState([initialItems]);
 const [sortDescending, setSortDescending] = useState(true);
 const [searchQuery, setSearchQuery] = useState("");
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
    filteredData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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

 const filteredItems = items.filter((item) => item.content.toLowerCase().includes(searchQuery.toLowerCase()));

 const sortedFilteredItems = [...filteredItems];

 sortedFilteredItems.sort((a, b) => {
  if (sortDescending) {
   return new Date(b.createdAt) - new Date(a.createdAt);
  } else {
   return new Date(a.createdAt) - new Date(b.createdAt);
  }
 });

 return (
  <div className="block">
   <div className="mb-4 flex items-center justify-center gap-2">
    <InputWithIcon placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} icon={<MagnifyingGlassIcon className="min-h-5 min-w-5 h-5 w-5 text-white/50" aria-hidden="true" role="img" />} />
    <Tooltip content={sortDescending ? "Sort ascending" : "Sort descending"}>
     <span onClick={() => setSortDescending(!sortDescending)} className="hover:border-button-primary flex h-[41.6px] cursor-pointer items-center justify-center rounded-md border border-neutral-800 px-3 py-2 text-white duration-200">
      {sortDescending ? <BarsArrowDownIcon className="min-h-5 min-w-5 h-5 w-5" /> : <BarsArrowUpIcon className="min-h-5 min-w-5 h-5 w-5" />}
     </span>
    </Tooltip>
   </div>
   <InfiniteScroll hasMore={hasMore} pageStart={0} loadMore={loadMore} loader={<GraphSkeleton className={"mb-4 !h-20"} />}>
    {sortedFilteredItems.map((item, index) => (
     <Disclosure
      key={index}
      button={
       <>
        <div className="flex flex-row items-center gap-4">
         {item.type && (
          <>
           {item.type === "profanity" && <NoSymbolIcon className="min-h-6 min-w-6 h-6 w-6 text-red-400" />}
           {item.type === "embed_color" && <PaintBrushIcon className="text-white/60 ui-open:text-accent-primary duration-200 min-h-6 min-w-6 h-6 w-6" />}
           {item.type === "command_change" && <CubeTransparentIcon className="text-white/60 ui-open:text-accent-primary duration-200 min-h-6 min-w-6 h-6 w-6" />}
           {item.type === "category_change" && <CubeIcon className="text-white/60 ui-open:text-accent-primary duration-200 min-h-6 min-w-6 h-6 w-6" />}
           {item.type === "public_dashboard" && <UsersIcon className="text-white/60 ui-open:text-accent-primary duration-200 min-h-6 min-w-6 h-6 w-6" />}
           {item.type === "vanity" && <LinkIcon className="text-white/60 ui-open:text-accent-primary duration-200 min-h-6 min-w-6 h-6 w-6" />}
          </>
         )}
         {item.user?.avatar && <Image src={`https://cdn.discordapp.com/avatars/${item.user?.discordId}/${item.user?.avatar}.${item.user?.avatar.startsWith("a_") ? "gif" : "png"}`} alt={`${item.user?.name} avatar`} quality={95} width={32} height={32} className="min-h-12 min-w-12 h-12 w-12 rounded-full" />}
        </div>
        <div className="flex flex-col">
         <p className="text-left font-bold">
          {item.user?.global_name || item.user?.username}
          {item.user?.discriminator !== "0" && <span className="opacity-70">#{item.user?.discriminator || "0000"}</span>}: {item.content}
         </p>
         <span className="text-left opacity-70">
          {formatDate(item.createdAt)} ({formatDuration(new Date().getTime() - new Date(item.createdAt).getTime())} ago)
         </span>
        </div>
       </>
      }
     >
      {item.actionTaken && (
       <p>
        <span className="font-bold">Action taken:</span> <span className="opacity-70">{item.actionTaken}</span>
       </p>
      )}
      <p>
       <span className="font-bold">Type:</span> <span className="opacity-70">{item.type}</span>
      </p>
      <p>
       <span className="font-bold">Date:</span> <span className="opacity-70">{item.createdAt}</span>
      </p>
      <p>
       <span className="font-bold">User:</span>{" "}
       <Link href={`/dashboard/${id}/user/${item.user?.discordId}`} className={"hover:text-button-primary opacity-70 hover:opacity-100 duration-200"}>
        {item.user?.global_name || item.user?.username}
        {item.user?.discriminator !== "0" && <span className="opacity-70">#{item.user?.discriminator || "0000"}</span>} (ID: {item.user?.discordId || item.user?.id})
       </Link>
      </p>
     </Disclosure>
    ))}
   </InfiniteScroll>
  </div>
 );
}
