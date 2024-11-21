"use client";

import { formatDate, formatDuration } from "@majoexe/util/functions/util";
import Link from "next/link";
import { useMemo } from "react";
import { ButtonSecondary } from "@/components/Buttons";
import Image from "@/components/client/shared/Image";
import { Table } from "@/components/client/shared/Table";
import { Tooltip } from "@/components/client/shared/Tooltip";
import { Icons, iconVariants } from "@/components/Icons";
import type { Column } from "react-table";

interface Giveaway {
 id: string;
 prize: string;
 winners: number;
 time: {
  startedAt: Date;
  ended: boolean;
  endedAt: Date;
 };
 startedBy: {
  global_name: string;
  discordId: string;
  name: string;
  avatar: string;
 };
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
       <Tooltip content={`Ended ${formatDate(value.endedAt)} (${formatDuration(new Date(value.endedAt) - new Date(value.startedAt))})`}>
        <div className="flex cursor-help items-center">
         <Icons.timer className={iconVariants({ variant: "button", className: "text-red-400" })} />
         <span className="text-red-400">Ended</span>
        </div>
       </Tooltip>
      ) : (
       <Tooltip content={`Started ${formatDate(value.startedAt)} (${formatDuration(Date.now() - new Date(value.startedAt))} ago)`}>
        <div className="flex cursor-help items-center">
         <Icons.timer className={iconVariants({ variant: "button", className: "text-yellow-400" })} />
         <span className="text-yellow-500">Ends in {formatDuration(new Date(value.endedAt) - Date.now())}</span>
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
     <Link className="flex items-center space-x-4" href={`user/${value?.discordId}`} passHref>
      <div className="relative">{value?.avatar && <Image src={value?.avatar} alt={`${value?.name} avatar`} quality={95} width={48} height={48} className="size-12 min-h-12 min-w-12 rounded-full" />}</div>
      <Tooltip content={`Discord ID: ${value?.discordId || "Unknown"}`}>
       <span className="cursor-help text-left font-bold">{value?.global_name || value?.name}</span>
      </Tooltip>
     </Link>
    ),
   },
   {
    Header: "Started",
    accessor: "startedAt",
    Cell: ({ row }) => (
     <Tooltip content={formatDate(row.original.time.startedAt)}>
      <span className="cursor-help">{formatDuration(Date.now() - new Date(row.original.time.startedAt))} ago</span>
     </Tooltip>
    ),
   },
   {
    Header: "Actions",
    accessor: "actions",
    Cell: () => (
     <Tooltip content="Editing giveaways is not yet supported">
      <ButtonSecondary className="!w-fit" disabled>
       <Icons.edit className={iconVariants({ variant: "button" })} />
       Edit
      </ButtonSecondary>
     </Tooltip>
    ),
   },
  ],
  []
 );

 return <Table columns={columns} data={data} sortBy={[{ id: "startedAt", desc: true }]} />;
}
