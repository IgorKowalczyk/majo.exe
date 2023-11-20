"use client";

import { formatNumber } from "@majoexe/util/functions";
import Link from "next/link";
import { useMemo } from "react";
import Image from "@/components/blocks/client/shared/Image";
import { Table } from "@/components/blocks/client/shared/Table";
import { Tooltip } from "@/components/blocks/client/shared/Tooltip";

export function Leaderboard({ data = [], showControls = true, showSearch = true }) {
 const columns = useMemo(
  () => [
   {
    Header: "#",
    accessor: "id",
    Cell: ({ value }) => `#${value}`,
   },
   {
    Header: "User",
    accessor: "user",
    Cell: ({ value }) => (
     <div id={value?.discordId}>
      <Tooltip content={`Discord ID: ${value?.discordId || "Unknown"}`}>
       <Link className="flex w-fit items-center space-x-4" href={showControls ? `user/${value?.discordId}` : `#${value?.discordId}`} passHref>
        <div className="relative">{value?.avatar && <Image src={`https://cdn.discordapp.com/avatars/${value?.discordId}/${value?.avatar}.${value?.avatar.startsWith("a_") ? "gif" : "png"}`} alt={`${value?.name} avatar`} quality={95} width={32} height={32} className="min-h-12 min-w-12 h-12 w-12 rounded-full" />}</div>
        <span className="text-left font-bold">
         {value?.global_name || value?.name}
         {value?.discriminator !== "0" && <span className="opacity-70">#{value?.discriminator || "0000"}</span>}
        </span>
       </Link>
      </Tooltip>
     </div>
    ),
   },
   {
    Header: "XP",
    accessor: "xp",
    Cell: ({ value }) => (
     <Tooltip content={value}>
      <span className="cursor-help">{formatNumber(value)}</span>
     </Tooltip>
    ),
   },
   {
    Header: "Level",
    accessor: "level",
   },
  ],
  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  []
 );

 return <Table columns={columns} data={data} showControls={showControls} showSearch={showSearch} sortBy={[{ id: "xp", desc: true }]} />;
}
