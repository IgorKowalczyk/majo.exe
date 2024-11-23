"use client";

import { formatDate, formatDuration } from "@majoexe/util/functions/util";
import clsx from "clsx";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Disclosure } from "../shared/Disclosure";
import Image from "@/components/client/shared/Image";
import { Tooltip } from "@/components/client/shared/Tooltip";
import { Icons, iconVariants } from "@/components/Icons";
import { InputWithIcon } from "@/components/Input";
import { GraphSkeleton } from "@/components/Skeletons";
import { GuildLogs, User } from "@majoexe/database";

interface LogItem extends Omit<GuildLogs, "createdAt"> {
 createdAt: string;
 user: Pick<User, "name" | "discordId" | "avatar" | "global_name" | "discriminator"> & { fullAvatar?: string };
}

export function LogDisclosure({ item, guildId, preview = false }: { item: LogItem; guildId: string; preview?: boolean }) {
 return (
  <Disclosure
   button={
    <>
     <div className="flex flex-row items-center gap-4">
      {item.type && (
       <>
        {item.type === "embed_color" && <Icons.paintBrush className={iconVariants({ variant: "large", className: "ui-open:text-accent-primary !stroke-2 text-white/60 duration-200" })} />}
        {item.type === "command_change" && <Icons.slash className={iconVariants({ variant: "large", className: "ui-open:text-accent-primary !stroke-2 text-white/60 duration-200" })} />}
        {item.type === "category_change" && <Icons.Blocks className={iconVariants({ variant: "large", className: "ui-open:text-accent-primary !stroke-2 text-white/60 duration-200" })} />}
        {item.type === "public_dashboard" && <Icons.Users className={iconVariants({ variant: "large", className: "ui-open:text-accent-primary !stroke-2 text-white/60 duration-200" })} />}
        {item.type === "vanity" && <Icons.link className={iconVariants({ variant: "large", className: "ui-open:text-accent-primary !stroke-2 text-white/60 duration-200" })} />}
       </>
      )}{" "}
      {item.user.fullAvatar ? <Image src={item.user.fullAvatar} alt={`${item.user.name} avatar`} quality={95} width={48} height={48} className="size-12 shrink-0 rounded-full" /> : <>{item.user.avatar && <Image src={`/api/user/avatar/${item.user.discordId}`} alt={`${item.user.name} avatar`} quality={95} width={48} height={48} className="size-12 shrink-0 rounded-full" />}</>}
     </div>
     <div className="flex flex-col">
      <p className="text-left font-bold">
       {item.user.global_name}
       {item.user.discriminator !== "0" && <span className="opacity-70">#{item.user.discriminator || "0000"}</span>}: {item.content}
      </p>
      <span className="text-left opacity-70">
       {formatDate(item.createdAt)} ({formatDuration(new Date().getTime() - new Date(item.createdAt).getTime())} ago)
      </span>
     </div>
    </>
   }
  >
   <p>
    <span className="font-bold">Type:</span> <span className="opacity-70">{item.type}</span>
   </p>
   <p>
    <span className="font-bold">Date:</span> <span className="opacity-70">{item.createdAt}</span>
   </p>
   <p>
    <span className="font-bold">User:</span>{" "}
    {preview ? (
     <>
      {item.user.global_name}
      {item.user?.discriminator !== "0" && <span className="opacity-70">#{item.user?.discriminator || "0000"}</span>} (ID: {item.user.discordId})
     </>
    ) : (
     <Link href={`/dashboard/${guildId}/user/${item.user?.discordId}`} className="opacity-70 duration-200 hover:text-button-primary hover:opacity-100">
      {item.user.global_name}
      {item.user.discriminator !== "0" && <span className="opacity-70">#{item.user.discriminator || "0000"}</span>} (ID: {item.user.discordId})
     </Link>
    )}
   </p>
  </Disclosure>
 );
}

export default function Logs({ initialItems, server }: { initialItems: LogItem[]; server: string }) {
 const fetching = useRef(false);
 const [pages, setPages] = useState([initialItems]);
 const [sortDescending, setSortDescending] = useState(true);
 const [searchQuery, setSearchQuery] = useState("");
 const items = pages.flatMap((page) => page);
 const [hasMore, setHasMore] = useState(true);

 const loadMore = async (page: number) => {
  if (!fetching.current) {
   try {
    fetching.current = true;
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/logs/${server}?page=${page}`);
    const data = (await response.json()) as LogItem[];
    if (!data.length) return setHasMore(false);

    const filteredData = data.filter((item) => !items.some((i) => i.id === item.id));
    filteredData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setPages((prev) => [...prev, filteredData]);
   } finally {
    fetching.current = false;
   }
  }
 };

 useEffect(() => {
  if (pages.length === 1 && !initialItems.length) setHasMore(false);
 }, [initialItems.length, pages.length]);

 const filteredItems = items.filter((item) => item.content.toLowerCase().includes(searchQuery.toLowerCase()));

 const sortedFilteredItems = [...filteredItems];

 sortedFilteredItems.sort((a, b) => {
  if (sortDescending) {
   return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  } else {
   return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  }
 });

 return (
  <div className="block">
   <div className="mb-4 flex items-center justify-center gap-2">
    <InputWithIcon placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} icon={<Icons.refresh className={iconVariants({ variant: "normal", className: "text-white/50" })} />} />
    <Tooltip content={sortDescending ? "Sort ascending" : "Sort descending"}>
     <span onClick={() => setSortDescending(!sortDescending)} className="flex h-[41.6px] cursor-pointer items-center justify-center rounded-md border border-neutral-800 px-3 py-2 text-white duration-200 hover:border-button-primary">
      <div className="relative size-5">
       <Icons.sortDescending
        className={iconVariants({
         variant: "normal",
         className: clsx(
          // prettier
          "absolute left-0 top-0 size-full duration-200",
          { "scale-0 opacity-0": !sortDescending, "scale-100 opacity-100": sortDescending }
         ),
        })}
       />
       <Icons.sortAscending
        className={iconVariants({
         variant: "normal",
         className: clsx(
          // prettier
          "absolute left-0 top-0 size-full duration-200",
          { "scale-0 opacity-0": sortDescending, "scale-100 opacity-100": !sortDescending }
         ),
        })}
       />
      </div>
     </span>
    </Tooltip>
   </div>
   <InfiniteScroll hasMore={hasMore} pageStart={0} loadMore={loadMore} loader={<Skeleton className="mb-4 h-20" />}>
    {sortedFilteredItems.map((item, index) => (
     <LogDisclosure key={`log-${item.id}-${server}`} item={item} guildId={server} />
    ))}
   </InfiniteScroll>
  </div>
 );
}
