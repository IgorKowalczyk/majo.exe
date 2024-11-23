"use client";

import { formatDate, formatDuration } from "@majoexe/util/functions/util";
import Link from "next/link";
import { useMemo } from "react";
import { Button } from "@/components/Buttons";
import Image from "@/components/client/shared/Image";
import { Table } from "@/components/client/shared/Table";
import { Tooltip } from "@/components/client/shared/Tooltip";
import { Icons, iconVariants } from "@/components/Icons";
import type { Column } from "react-table";
import { User } from "@majoexe/database";

interface Giveaway {
 id: number;
 prize: string;
 winners: number;
 time: {
  startedAt: Date;
  ended: boolean;
  endedAt: Date;
 };
 startedBy: Pick<User, "discordId" | "global_name" | "name" | "avatar"> | null;
}

export function Giveaways({ data = [] }: { data: Giveaway[] }) {
 const columns: Column<Giveaway>[] = useMemo(
  () => [
   {
    Header: "Prize",
    accessor: "prize",
    Cell: ({ value }) => value || "Unknown",
   },
   {
    Header: "Winners",
    accessor: "winners",
    Cell: ({ value }) => value || "1",
   },
   {
    Header: "Status",
    accessor: "time",
    Cell: ({ value }) => (
     <>
      {value.ended ? (
       <Tooltip content={`Ended ${formatDate(value.endedAt)} (${formatDuration(new Date(value.endedAt).getTime() - new Date(value.startedAt).getTime())})`}>
        <div className="flex cursor-help items-center">
         <Icons.Timer className={iconVariants({ variant: "button", className: "text-red-400" })} />
         <span className="text-red-400">Ended</span>
        </div>
       </Tooltip>
      ) : (
       <Tooltip content={`Started ${formatDate(value.startedAt)} (${formatDuration(Date.now() - new Date(value.startedAt).getTime())} ago)`}>
        <div className="flex cursor-help items-center">
         <Icons.Timer className={iconVariants({ variant: "button", className: "text-yellow-400" })} />
         <span className="text-yellow-500">Ends in {formatDuration(new Date(value.endedAt).getTime() - Date.now())}</span>
        </div>
       </Tooltip>
      )}
     </>
    ),
   },
   {
    Header: "Started By",
    accessor: "startedBy",
    Cell: ({ value }) => (
     <>
      {value ? (
       <Link className="flex items-center space-x-4" href={`user/${value.discordId}`} passHref>
        <Image src={`/api/user/avatar/${value.discordId}`} alt={`${value.name} avatar`} quality={95} width={48} height={48} className="size-12 shrink-0 rounded-full" />
        <Tooltip content={`Discord ID: ${value.discordId || "Unknown"}`}>
         <span className="cursor-help text-left font-bold">{value.global_name || value.name}</span>
        </Tooltip>
       </Link>
      ) : (
       <span>Unknown</span>
      )}
     </>
    ),
   },
   {
    Header: "Started",
    Cell: ({ row }) => (
     <Tooltip content={formatDate(row.original.time.startedAt)}>
      <span className="cursor-help">{formatDuration(Date.now() - new Date(row.original.time.startedAt).getTime())} ago</span>
     </Tooltip>
    ),
   },
   {
    Header: "Actions",
    Cell: () => (
     <Tooltip content="Editing giveaways is not yet supported">
      <Button variant="secondary" className="!w-fit" disabled>
       <Icons.Edit className={iconVariants({ variant: "button" })} />
       Edit
      </Button>
     </Tooltip>
    ),
   },
  ],
  []
 );

 return <Table columns={columns} data={data} sortBy={[{ id: "startedAt", desc: true }]} />;
}
