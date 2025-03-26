"use client";

import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, getFilteredRowModel, ColumnDef, Column, flexRender } from "@tanstack/react-table";
import React, { useState } from "react";
import { Button } from "@/components/ui/Buttons";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { InputWithIcon } from "@/components/ui/Input";
import { Menu, MenuItem, MenuItems, MenuButton } from "@/components/ui/Menu";
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
   <Menu>
    <MenuButton aria-label={column.getIsSorted() === "desc" ? "Sorted descending. Click to sort ascending." : column.getIsSorted() === "asc" ? "Sorted ascending. Click to sort descending." : "Not sorted. Click to sort ascending."} className="ml-0 h-8 gap-2 border-transparent px-3 text-xs! font-medium uppercase text-gray-500">
     <span>{title}</span>
     {column.getCanSort() && (
      <div className="relative size-4">
       <Icons.arrowUp
        className={iconVariants({
         variant: "small",
         className: cn("absolute size-4 duration-200", {
          "scale-0": column.getIsSorted() === "desc",
          "scale-100": column.getIsSorted() === "asc",
          "opacity-0": !column.getIsSorted(),
         }),
        })}
       />
       <Icons.arrowDown
        className={iconVariants({
         variant: "small",
         className: cn("absolute size-4 duration-200", {
          "scale-0": column.getIsSorted() === "asc",
          "scale-100": column.getIsSorted() === "desc",
          "opacity-0": !column.getIsSorted(),
         }),
        })}
       />

       <Icons.ChevronsUpDown
        className={iconVariants({
         variant: "small",
         className: cn("absolute size-4 duration-200", {
          "scale-0": column.getIsSorted(),
          "scale-100": !column.getIsSorted(),
         }),
        })}
       />
      </div>
     )}
    </MenuButton>
    <MenuItems className="w-40">
     <div>
      {column.getCanSort() && (
       <>
        <MenuItem aria-label="Sort ascending" onClick={() => column.toggleSorting(false)}>
         <Icons.ArrowUp className="text-muted-foreground/70 mr-2 size-4" aria-hidden="true" />
         Asc
        </MenuItem>
        <MenuItem aria-label="Sort descending" onClick={() => column.toggleSorting(true)}>
         <Icons.ArrowDown className="text-muted-foreground/70 mr-2 size-4" aria-hidden="true" />
         Desc
        </MenuItem>
       </>
      )}
      {/* {column.getCanSort() && column.getCanHide() && <DropdownMenuSeparator />} */}
      {/* {column.getCanHide() && (
      <MenuItem aria-label="Hide column" onClick={() => column.toggleVisibility(false)}>
       <Icons.EyeOffIcon className="mr-2 size-3.5 text-muted-foreground/70" aria-hidden="true" />
       Hide
      </MenuItem>
     )} */}
     </div>
    </MenuItems>
   </Menu>
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
    <div className="flex flex-row items-stretch gap-4">
     {showSearch && <InputWithIcon icon={<Icons.Search className={iconVariants({ variant: "normal" })} />} placeholder="Search" value={globalFilter || ""} onChange={(e) => setGlobalFilter(e.target.value)} className="h-10" />}
     {showControls && <ViewSelect selectedValue={table.getState().pagination.pageSize} setSelectedValue={table.setPageSize} className="my-2" />}
    </div>

    <table className="min-w-full divide-y divide-neutral-800">
     <thead>
      {table.getHeaderGroups().map((headerGroup) => (
       <tr key={headerGroup.id} id={headerGroup.id}>
        {headerGroup.headers.map((header) => (
         <th key={header.id} className="h-10 select-none items-center gap-3 text-xs font-medium tracking-wider text-gray-500 sm:text-xs">
          <span className="flex select-none items-center gap-2 px-6 uppercase">{flexRender(header.column.columnDef.header, header.getContext())}</span>
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

    {showControls && (
     <div className="mt-2 flex items-center justify-between border-t border-t-neutral-800 pt-2 text-neutral-500">
      <Button variant="secondary" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="w-fit!">
       <Icons.arrowLeft className={iconVariants({ variant: "button" })} />
       Previous
      </Button>
      <div>
       Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </div>
      <div className="flex items-center space-x-2">
       <Button variant="secondary" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="w-fit!">
        Next
        <Icons.arrowRight className={iconVariants({ variant: "button", className: "-mr-1! ml-2" })} />
       </Button>
      </div>
     </div>
    )}
   </div>
  </>
 );
};
