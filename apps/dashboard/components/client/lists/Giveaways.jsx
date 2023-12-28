"use client";

import { ClockIcon, PencilIcon } from "@heroicons/react/24/outline";
import { formatDate, formatDuration } from "@majoexe/util/functions/util";
import Link from "next/link";
import { useMemo } from "react";
import { ButtonSecondary } from "@/components/Buttons";
import Image from "@/components/client/shared/Image";
import { Table } from "@/components/client/shared/Table";
import { Tooltip } from "@/components/client/shared/Tooltip";

export function Giveaways({ data = [] }) {
 const columns = useMemo(
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
        <div className="flex items-center cursor-help space-x-2">
         <ClockIcon className="h-4 w-4 text-red-400" />
         <span className="text-red-400">Ended</span>
        </div>
       </Tooltip>
      ) : (
       <Tooltip content={`Started ${formatDate(value.startedAt)} (${formatDuration(Date.now() - new Date(value.startedAt))} ago)`}>
        <div className="flex items-center cursor-help space-x-2">
         <ClockIcon className="h-4 w-4 text-yellow-500" />
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
      <div className="relative">{value?.avatar && <Image src={value?.avatar} alt={`${value?.name} avatar`} quality={95} width={32} height={32} className="min-h-12 min-w-12 h-12 w-12 rounded-full" />}</div>
      <Tooltip content={`Discord ID: ${value?.discordId || "Unknown"}`}>
       <span className="text-left cursor-help font-bold">{value?.global_name || value?.name}</span>
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
       <PencilIcon className="min-h-5 min-w-5 -ml-1 mr-2 h-5 w-5" />
       Edit
      </ButtonSecondary>
     </Tooltip>
    ),
   },
  ],
  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  []
 );

 return <Table columns={columns} data={data} sortBy={[{ id: "startedAt", desc: true }]} />;
}
