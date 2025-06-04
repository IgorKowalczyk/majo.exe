"use client";

import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, getFilteredRowModel, ColumnDef, Column, flexRender } from "@tanstack/react-table";
import { ArrowDownIcon, ArrowUpIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon, ChevronsUpDownIcon, ChevronUpIcon, SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/Buttons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import { iconVariants } from "@/components/ui/Icons";
import { InputWithIcon } from "@/components/ui/Input";
import { ViewSelect } from "@/components/ui/ViewSelect";
import { cn } from "@/lib/utils";

interface TableProps<TData, TValue> {
 columns: ColumnDef<TData, TValue>[];
 data: TData[];
 sortBy?: { id: string; desc: boolean }[];
 showControls?: boolean;
 showSearch?: boolean;
}

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
 column: Column<TData, TValue>;
 title: string;
}

export function TableColumnHeader<TData, TValue>({ column, title, className }: DataTableColumnHeaderProps<TData, TValue>) {
 if (!column.getCanSort() && !column.getCanHide()) {
  return <div className={cn(className)}>{title}</div>;
 }

 return (
  <div className={cn("flex items-center space-x-2", className)}>
   <DropdownMenu>
    <DropdownMenuTrigger aria-label={column.getIsSorted() === "desc" ? "Sorted descending. Click to sort ascending." : column.getIsSorted() === "asc" ? "Sorted ascending. Click to sort descending." : "Not sorted. Click to sort ascending."} className="cursor-pointer h-10 items-center font-medium text-xs -ml-3 gap-2 flex border-transparent px-3 text-neutral-500">
     <span>{title}</span>
     {column.getCanSort() && (
      <div className="relative flex items-center">
       <ChevronUpIcon
        className={cn("absolute size-4 duration-200 motion-reduce:transition-none", {
         "scale-0": column.getIsSorted() === "desc",
         "scale-100": column.getIsSorted() === "asc",
         "opacity-0": !column.getIsSorted(),
        })}
       />
       <ChevronDownIcon
        className={cn("absolute size-4 duration-200 motion-reduce:transition-none", {
         "scale-0": column.getIsSorted() === "asc",
         "scale-100": column.getIsSorted() === "desc",
         "opacity-0": !column.getIsSorted(),
        })}
       />

       <ChevronsUpDownIcon
        className={cn("absolute size-4 duration-200 motion-reduce:transition-none", {
         "scale-0": column.getIsSorted(),
         "scale-100": !column.getIsSorted(),
        })}
       />
      </div>
     )}
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-40">
     <div>
      {column.getCanSort() && (
       <>
        <DropdownMenuItem aria-label="Sort ascending" onClick={() => column.toggleSorting(false)}>
         <ArrowUpIcon className="mr-2 size-4" aria-hidden="true" />
         Asc
        </DropdownMenuItem>
        <DropdownMenuItem aria-label="Sort descending" onClick={() => column.toggleSorting(true)}>
         <ArrowDownIcon className="mr-2 size-4" aria-hidden="true" />
         Desc
        </DropdownMenuItem>
       </>
      )}
      {/* {column.getCanSort() && column.getCanHide() && <DropdownMenuSeparator />} */}
      {/* {column.getCanHide() && (
      <MenuItem aria-label="Hide column" onClick={() => column.toggleVisibility(false)}>
       <EyeOffIcon className="mr-2 size-4" aria-hidden="true" />
       Hide
      </MenuItem>
     )} */}
     </div>
    </DropdownMenuContent>
   </DropdownMenu>
  </div>
 );
}

export const Table = <TData, TValue>({ columns, data, sortBy = [{ id: "id", desc: false }], showControls = true, showSearch = true }: TableProps<TData, TValue>) => {
 const [globalFilter, setGlobalFilter] = useState<string>("");

 const table = useReactTable({
  data: data || [],
  columns,
  initialState: {
   sorting: sortBy,
   pagination: {
    pageIndex: 0,
    pageSize: 10,
   },
  },
  state: {
   globalFilter,
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  onGlobalFilterChange: setGlobalFilter,
 });

 return (
  <>
   <div className="flex w-full flex-col">
    <div
     className={cn("flex-row items-stretch gap-3 mb-4", {
      flex: showSearch || showControls,
      hidden: !showSearch && !showControls,
     })}
    >
     {showSearch && <InputWithIcon icon={<SearchIcon className={iconVariants({ variant: "normal" })} />} placeholder="Search" value={globalFilter || ""} onChange={(e) => setGlobalFilter(e.target.value)} />}
     {showControls && <ViewSelect selectedValue={table.getState().pagination.pageSize} setSelectedValue={table.setPageSize} />}
    </div>
    <div className="overflow-hidden rounded-lg border">
     <table className="min-w-full divide-y divide-neutral-800">
      <thead className="[&_tr]:border-b">
       {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id} id={headerGroup.id}>
         {headerGroup.headers.map((header) => (
          <th key={header.id} className="select-none items-center gap-3 h-10 text-xs font-medium tracking-wider text-neutral-500 sm:text-xs">
           <span className="flex select-none items-center gap-2 px-6">{flexRender(header.column.columnDef.header, header.getContext())}</span>
          </th>
         ))}
        </tr>
       ))}
      </thead>

      <tbody>
       {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
         <tr key={row.id}>
          {row.getVisibleCells().map((cell) => (
           <td key={cell.id} className="whitespace-nowrap px-6 py-4">
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
           </td>
          ))}
         </tr>
        ))
       ) : (
        <tr>
         <td colSpan={columns.length} className="py-4 text-center text-neutral-500">
          No data available
         </td>
        </tr>
       )}
      </tbody>
     </table>
    </div>

    {showControls && (
     <div className="flex items-center justify-between  pt-4 text-neutral-500">
      <Button variant="secondary" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="w-fit!">
       <ChevronLeftIcon className={iconVariants({ variant: "button" })} />
       Previous
      </Button>
      <div>
       Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </div>
      <div className="flex items-center space-x-2">
       <Button variant="secondary" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="w-fit!">
        Next
        <ChevronRightIcon className={iconVariants({ variant: "button", className: "-mr-1! ml-2" })} />
       </Button>
      </div>
     </div>
    )}
   </div>
  </>
 );
};
