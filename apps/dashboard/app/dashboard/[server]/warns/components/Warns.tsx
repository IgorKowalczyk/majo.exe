"use client";

import type { GuildWarns, User } from "@majoexe/database/types";
import { formatDuration, shortenText } from "@majoexe/util/functions/util";
import type { ColumnDef } from "@tanstack/react-table";
import { CheckIcon, LoaderCircleIcon, TrashIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useCallback } from "react";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/Buttons";
import { iconVariants } from "@/components/ui/Icons";
import Image from "@/components/ui/Image";
import { Skeleton } from "@/components/ui/Skeletons";
import { Table, TableColumnHeader } from "@/components/ui/Table";
import { Tooltip } from "@/components/ui/Tooltip";
import { cn } from "@/lib/utils";

export interface WarnItems extends Omit<GuildWarns, "createdAt"> {
 createdAt: string;
 link: string;
 createdById: string;
 user: Pick<User, "name" | "discordId" | "avatar" | "global_name" | "discriminator"> | null;
}

export const Warns = ({ data, guildId, ...props }: Omit<React.ComponentProps<typeof Table>, "columns"> & { data: WarnItems[]; guildId: string }) => {
 const [loadingWarns, setLoadingWarns] = useState<string[]>([]);
 const router = useRouter();

 const removeWarn = useCallback(
  async (warnId: string) => {
   setLoadingWarns((old) => [...old, warnId]);
   const loading = toast.loading(`Deleting warn #${warnId}...`);

   const res = await fetch(`/api/warns/${guildId}/${warnId}`, {
    method: "DELETE",
   });

   setLoadingWarns((old) => old.filter((warn) => warn !== warnId));

   if (res.status === 200) {
    toast.success(`Deleted warn #${warnId}!`, {
     id: loading,
    });
    router.refresh();
   } else {
    toast.error(`Failed to delete warn #${warnId}!`, {
     id: loading,
    });
   }
  },
  [guildId, router]
 );

 const columns: ColumnDef<WarnItems>[] = [
  {
   header: ({ column }) => <TableColumnHeader column={column} title="User" />,
   accessorKey: "user",
   cell: ({ row }) => {
    const value = row.original.user;
    return (
     <>
      {value && value.discordId ? (
       <Tooltip content={`Discord ID: ${value.discordId || "Unknown"}`}>
        <Link href={`user/${value.discordId}`} className="flex w-fit items-center space-x-4">
         <Image src={`/api/user/avatar/${value.discordId}`} alt={`${value.name} avatar`} quality={95} width={36} height={36} className="size-9 shrink-0 rounded-full" />
         <span className="text-left font-bold">
          {value.global_name || value.name}
          {value.discriminator !== "0" && <span className="opacity-70">#{value.discriminator || "0000"}</span>}
         </span>
        </Link>
       </Tooltip>
      ) : (
       <div className="flex flex-row items-center space-x-4">
        <Skeleton className="size-12 shrink-0 rounded-full" />
        <Skeleton className="h-6 w-20" />
       </div>
      )}
     </>
    );
   },
  },
  {
   header: ({ column }) => <TableColumnHeader column={column} title="User Warn ID" />,
   accessorKey: "warnId",
   cell: ({ row }) => `#${row.getValue("warnId")}`,
  },
  {
   header: ({ column }) => <TableColumnHeader column={column} title="Reason" />,
   accessorKey: "message",
   cell: ({ row }) => shortenText(row.getValue("message") || "", 50),
  },
  {
   header: ({ column }) => <TableColumnHeader column={column} title="Date" />,
   accessorKey: "createdAt",
   cell: ({ row }) => <>{formatDuration(Date.now() - new Date(row.getValue("createdAt")).getTime())} ago</>,
  },
  {
   header: "Actions",
   accessorKey: "link",
   cell: ({ row }) => {
    const value = row.getValue("link") as string;
    return (
     <div className="flex items-center space-x-4">
      <Link href={`user/${value}#warns`} className={cn(buttonVariants({ variant: "secondary" }), "w-fit")}>
       <UserIcon className={iconVariants({ variant: "button" })} />
       View profile
      </Link>
      <Button variant="red" className="w-fit" onClick={() => removeWarn(value)} disabled={loadingWarns.includes(value)}>
       <TrashIcon className={iconVariants({ variant: "button" })} />
       Delete warn
      </Button>
     </div>
    );
   },
  },
 ];

 return <Table data={data} sortBy={[{ id: "createdAt", desc: true }]} {...props} columns={columns} />;
};

export interface UserWarns extends Omit<GuildWarns, "createdById" | "link"> {
 loading: false;
 addedBy: Pick<User, "discordId" | "name" | "global_name" | "avatar" | "discriminator"> | null;
}

export const ManageUserWarns = ({ data, guildId, ...props }: { data: UserWarns[]; guildId: string } & Omit<React.ComponentProps<typeof Table>, "columns">) => {
 const [loadingWarns, setLoadingWarns] = useState<string[]>([]);
 const [deletedWarns, setDeletedWarns] = useState<string[]>([]);
 const router = useRouter();

 const removeWarn = useCallback(
  async (warnId: string) => {
   setLoadingWarns((old) => [...old, warnId]);
   const loading = toast.loading(`Deleting warn #${warnId}...`);

   const res = await fetch(`/api/warns/${guildId}/${warnId}`, {
    method: "DELETE",
   });

   setLoadingWarns((old) => old.filter((warn) => warn !== warnId));

   if (res.status === 200) {
    toast.success(`Deleted warn #${warnId}!`, {
     id: loading,
    });
    setDeletedWarns((old) => [...old, warnId]);
    router.refresh();
   } else {
    toast.error(`Failed to delete warn #${warnId}!`, {
     id: loading,
    });
   }
  },
  [guildId, router]
 );

 const columns: ColumnDef<UserWarns>[] = [
  {
   header: "Added by",
   accessorKey: "addedBy",
   cell: ({ row }) => {
    const value = row.original.addedBy;
    return (
     <>
      {value && value.discordId ? (
       <Tooltip content={`Discord ID: ${value.discordId || "Unknown"}`}>
        <div className="flex w-fit items-center space-x-4">
         <Image src={`/api/user/avatar/${value.discordId}`} alt={`${value.name} avatar`} quality={95} width={36} height={36} className="size-9 shrink-0 rounded-full" />
         <span className="text-left font-bold">
          {value.global_name || value.name}
          {value.discriminator !== "0" && <span className="opacity-70">#{value.discriminator || "0000"}</span>}
         </span>
        </div>
       </Tooltip>
      ) : (
       <div className="flex flex-row items-center space-x-4">
        <Skeleton className="size-12 shrink-0 rounded-full" />
        <Skeleton className="h-6 w-20" />
       </div>
      )}
     </>
    );
   },
  },
  {
   header: "User Warn ID",
   accessorKey: "warnId",
   cell: ({ row }) => `#${row.getValue("warnId")}`,
  },
  {
   header: "Reason",
   accessorKey: "message",
   cell: ({ row }) => shortenText(row.getValue("message") || "", 50),
  },
  {
   header: "Date",
   accessorKey: "createdAt",
   cell: ({ row }) => <>{formatDuration(Date.now() - new Date(row.getValue("createdAt")).getTime())} ago</>,
  },
  {
   header: "Actions",
   accessorKey: "id",
   cell: ({ row }) => {
    const value = row.getValue("id") as string;
    return (
     <Button variant="red" className="w-fit" onClick={() => removeWarn(value)} disabled={loadingWarns.includes(value) || deletedWarns.includes(value)}>
      {deletedWarns.includes(value) ? (
       <>
        <CheckIcon className={iconVariants({ variant: "button" })} />
        Deleted!
       </>
      ) : (
       <>
        {loadingWarns.includes(value) ? (
         <>
          <LoaderCircleIcon className={iconVariants({ variant: "button", className: "animate-spin" })} />
          Deleting...
         </>
        ) : (
         <>
          <TrashIcon className={iconVariants({ variant: "button" })} />
          Delete
         </>
        )}
       </>
      )}
     </Button>
    );
   },
  },
 ];

 // @ts-expect-error Wrong type
 return <Table data={data} sortBy={[{ id: "createdAt", desc: true }]} columns={columns} {...props} />;
};
