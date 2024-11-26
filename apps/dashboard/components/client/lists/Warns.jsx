"use client";

import { formatDuration } from "@majoexe/util/functions/util";
import { useRouter } from "next/navigation";
import { useMemo, useState, useCallback } from "react";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/Buttons";
import Image from "@/components/ui/Image";
import { Table } from "@/components/client/shared/Table";
import { Tooltip } from "@/components/ui/Tooltip";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { Skeleton } from "@/components/ui/Skeletons";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function Warns({ data, showControls = true, showSearch = true }) {
 const columns = useMemo(
  () => [
   {
    Header: "User",
    accessor: "user",
    Cell: ({ value }) => (
     <div className="flex items-center space-x-4">
      <div className="relative">{value?.avatar && <Image src={`https://cdn.discordapp.com/avatars/${value?.discordId}/${value?.avatar}.${value?.avatar.startsWith("a_") ? "gif" : "png"}`} alt={`${value?.name} avatar`} quality={95} width={48} height={48} className="size-12 shrink-0 rounded-full" />}</div>
      <Tooltip content={`Discord ID: ${value?.discordId || "Unknown"}`}>
       <span className="text-left font-bold">
        {value?.global_name || value?.name}
        {value?.discriminator !== "0" && <span className="opacity-70">#{value?.discriminator || "0000"}</span>}
       </span>
      </Tooltip>
     </div>
    ),
   },
   {
    Header: "User Warn ID",
    accessor: "warnId",
    Cell: ({ value }) => `#${value}`,
   },
   {
    Header: "Reason",
    accessor: "message",
    Cell: ({ value }) => (value.length > 50 ? `${value.slice(0, 50)}...` : value),
   },
   {
    Header: "Date",
    accessor: "createdAt",
    Cell: ({ value }) => <>{formatDuration(Date.now() - new Date(value).getTime())} ago</>,
   },
   {
    Header: "Actions",
    accessor: "link",
    Cell: ({ value }) => (
     <Link href={`user/${value}#warns`} className={cn(buttonVariants({ variant: "secondary" }), "w-fit")}>
      <Icons.warning className={iconVariants({ variant: "button" })} />
      View profile
     </Link>
    ),
   },
  ],
  []
 );

 return <Table columns={columns} data={data} showControls={showControls} showSearch={showSearch} sortBy={[{ id: "createdAt", desc: true }]} />;
}

export function ManageWarns({ data, guildId, showControls = true, showSearch = true }) {
 const [loadingWarns, setLoadingWarns] = useState([]);
 const [deletedWarns, setDeletedWarns] = useState([]);
 const router = useRouter();

 const removeWarn = useCallback(
  async (warnId) => {
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

 const columns = useMemo(
  () => [
   {
    Header: "Added by",
    accessor: "addedBy",
    Cell: ({ value }) => (
     <>
      {value && value.discordId ? (
       <div className="flex items-center space-x-4">
        <div className="relative">{value?.avatar && <Image src={`https://cdn.discordapp.com/avatars/${value?.discordId}/${value?.avatar}.${value?.avatar.startsWith("a_") ? "gif" : "png"}`} alt={`${value?.name} avatar`} quality={95} width={48} height={48} className="size-12 shrink-0 rounded-full" />}</div>
        <Tooltip content={`Discord ID: ${value?.discordId || "Unknown"}`}>
         <span className="text-left font-bold">
          {value?.global_name || value?.name}
          {value?.discriminator !== "0" && <span className="opacity-70">#{value?.discriminator || "0000"}</span>}
         </span>
        </Tooltip>
       </div>
      ) : (
       <div className="flex flex-row items-center space-x-4">
        <Skeleton className="size-12 shrink-0 rounded-full" />
        <Skeleton className="w-20 h-6" />
       </div>
      )}
     </>
    ),
   },
   {
    Header: "User Warn ID",
    accessor: "warnId",
    Cell: ({ value }) => `#${value}`,
   },
   {
    Header: "Reason",
    accessor: "message",
    Cell: ({ value }) => (value.length > 50 ? `${value.slice(0, 50)}...` : value),
   },
   {
    Header: "Date",
    accessor: "createdAt",
    Cell: ({ value }) => <>{formatDuration(Date.now() - new Date(value).getTime())} ago</>,
   },
   {
    Header: "Actions",
    accessor: "id",
    Cell: ({ value }) => (
     <Button variant="red" className="w-fit" onClick={() => removeWarn(value)} disabled={loadingWarns?.includes(value) || deletedWarns?.includes(value)}>
      {deletedWarns?.includes(value) ? (
       <>
        <Icons.Check className={iconVariants({ variant: "button" })} />
        Deleted!
       </>
      ) : (
       <>
        {loadingWarns?.includes(value) ? (
         <>
          <Icons.refresh className={iconVariants({ variant: "button", className: "animate-spin" })} />
          Deleting...
         </>
        ) : (
         <>
          <Icons.Trash className={iconVariants({ variant: "button" })} />
          Delete
         </>
        )}
       </>
      )}
     </Button>
    ),
   },
  ],
  [loadingWarns, deletedWarns, removeWarn]
 );

 return <Table columns={columns} data={data} showControls={showControls} showSearch={showSearch} sortBy={[{ id: "createdAt", desc: true }]} />;
}
