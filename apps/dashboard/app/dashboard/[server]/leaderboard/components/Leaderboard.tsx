"use client";

import type { User } from "@majoexe/database/types";
import { formatNumber } from "@majoexe/util/functions/util";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Buttons";
import { Icons, iconVariants } from "@/components/ui/Icons";
import Image from "@/components/ui/Image";
import { Table, TableColumnHeader } from "@/components/ui/Table";
import { Tooltip } from "@/components/ui/Tooltip";
import { cn } from "@/lib/utils";

export interface LeaderboardData {
 id: number;
 user: Pick<User, "discordId" | "global_name" | "name" | "avatar" | "discriminator">;
 xp: number;
 level: number;
}

export function Leaderboard({ data, showControls = true, showSearch = true }: { data: LeaderboardData[]; showControls?: boolean; showSearch?: boolean }) {
 const columns: ColumnDef<LeaderboardData>[] = [
  {
   header: ({ column }) => <TableColumnHeader column={column} title="Position" />,
   accessorKey: "id",
   cell: ({ row }) => `#${row.getValue("id")}`,
   size: 2,
  },
  {
   header: ({ column }) => <TableColumnHeader column={column} title="User" />,
   accessorKey: "user",
   size: 2000,
   cell: ({ row }) => {
    const value = row.original.user;
    return (
     <div id={value.discordId}>
      <Tooltip content={`Discord ID: ${value.discordId}`}>
       <Link className="flex w-fit items-center space-x-4" href={showControls ? `user/${value.discordId}` : `#${value.discordId}`} passHref>
        <Image src={`/api/user/avatar/${value.discordId}`} alt={`${value.name} avatar`} quality={95} width={36} height={36} className="size-9 shrink-0 rounded-full" />
        <span className="text-left font-bold">
         {value.global_name || value.name}
         {value.discriminator !== "0" && <span className="opacity-70">#{value.discriminator || "0000"}</span>}
        </span>
       </Link>
      </Tooltip>
     </div>
    );
   },
  },
  {
   header: ({ column }) => <TableColumnHeader column={column} title="XP" />,
   accessorKey: "xp",
   cell: ({ row }) => (
    <Tooltip content={`Total XP: ${row.getValue("xp")}`}>
     <span className="cursor-help">{formatNumber(row.getValue("xp"))} XP</span>
    </Tooltip>
   ),
  },
  {
   header: ({ column }) => <TableColumnHeader column={column} title="Level" />,
   accessorKey: "level",
  },
  ...(showControls
   ? [
      {
       header: "Actions",
       cell: ({ row }: { row: { original: LeaderboardData } }) => (
        <Link className={cn(buttonVariants({ variant: "secondary" }), "w-fit")} href={`user/${row.original.user?.discordId}`}>
         <Icons.User className={iconVariants({ variant: "button" })} />
         View profile
        </Link>
       ),
      },
     ]
   : []),
 ];

 return <Table columns={columns} data={data} showControls={showControls} showSearch={showSearch} sortBy={[{ id: "id", desc: false }]} />;
}
