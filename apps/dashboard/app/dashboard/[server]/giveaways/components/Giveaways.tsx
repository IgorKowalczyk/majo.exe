"use client";

import { formatDate, formatDuration } from "@majoexe/util/functions/util";
import Link from "next/link";
import { Button } from "@/components/ui/Buttons";
import Image from "@/components/ui/Image";
import { Table, TableColumnHeader } from "@/components/ui/Table";
import { Tooltip } from "@/components/ui/Tooltip";
import { Icons, iconVariants } from "@/components/ui/Icons";
import type { ColumnDef } from "@tanstack/react-table";
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
 const columns: ColumnDef<Giveaway>[] = [
  {
   header: ({ column }) => <TableColumnHeader column={column} title="Prize" />,
   accessorKey: "prize",
   cell: ({ row }) => row.getValue("prize") || "Unknown",
  },
  {
   header: ({ column }) => <TableColumnHeader column={column} title="Winners" />,
   accessorKey: "winners",
   cell: ({ row }) => row.getValue("winners") || "1",
  },
  {
   header: ({ column }) => <TableColumnHeader column={column} title="Time" />,
   accessorKey: "time",
   cell: ({ row }) => {
    const value = row.original.time;

    return (
     <>
      {value.ended ? (
       <Tooltip content={`Ended ${formatDate(value.endedAt)} (${formatDuration(new Date(value.endedAt).getTime() - new Date(value.startedAt).getTime())})`}>
        <div className="flex cursor-help items-center w-fit">
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
    );
   },
  },
  {
   header: ({ column }) => <TableColumnHeader column={column} title="Started By" />,
   accessorKey: "startedBy",
   sortingFn: (a, b) => {
    const firstRow = a.original.startedBy;
    const secondRow = b.original.startedBy;

    if (!firstRow || !secondRow) return 0;
    if (firstRow.global_name && secondRow.global_name) return firstRow.global_name.localeCompare(secondRow.global_name);
    if (firstRow.global_name) return -1;
    if (secondRow.global_name) return 1;
    if (firstRow.name && secondRow.name) return firstRow.name.localeCompare(secondRow.name);
    if (firstRow.name) return -1;
    if (secondRow.name) return 1;
    return 0;
   },
   cell: ({ row }) => {
    const value = row.original.startedBy;

    return (
     <>
      {value ? (
       <Tooltip content={`Discord ID: ${value.discordId || "Unknown"}`}>
        <Link className="flex items-center space-x-4 w-fit" href={`user/${value.discordId}`}>
         <Image src={`/api/user/avatar/${value.discordId}`} alt={`${value.name} avatar`} quality={95} width={48} height={48} className="size-12 shrink-0 rounded-full" />

         <span className="text-left font-bold">
          {value.global_name || value.name}
          {/* {value.discriminator !== "0" && <span className="opacity-70">#{value.discriminator || "0000"}</span>} */}
         </span>
        </Link>
       </Tooltip>
      ) : (
       <span>Unknown</span>
      )}
     </>
    );
   },
  },
  {
   header: ({ column }) => <TableColumnHeader column={column} title="Started" />,
   accessorKey: "time-2",
   cell: ({ row }) => (
    <Tooltip content={formatDate(row.original.time.startedAt)}>
     <span className="cursor-help">{formatDuration(Date.now() - new Date(row.original.time.startedAt).getTime())} ago</span>
    </Tooltip>
   ),
  },
  {
   header: "Actions",
   cell: () => (
    <Tooltip content="Editing giveaways is not yet supported">
     <Button variant="secondary" className="!w-fit" disabled>
      <Icons.Edit className={iconVariants({ variant: "button" })} />
      Edit
     </Button>
    </Tooltip>
   ),
  },
 ];

 return <Table columns={columns} data={data} sortBy={[{ id: "time", desc: true }]} />;
}
