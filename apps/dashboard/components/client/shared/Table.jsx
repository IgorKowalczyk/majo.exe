/* eslint-disable @eslint-react/no-array-index-key */

"use client";

import clsx from "clsx";
import { useEffect } from "react";
import { useTable, useSortBy, usePagination, useGlobalFilter } from "react-table";
import { ViewSelect } from "./ViewSelect";
import { ButtonSecondary } from "@/components/Buttons";
import { Icons, iconVariants } from "@/components/Icons";
import { InputWithIcon } from "@/components/Input";

export function Table({
 columns,
 data,
 sortBy = [
  {
   id: "id",
   desc: false,
  },
 ],
 showControls = true,
 showSearch = true,
}) {
 const {
  getTableBodyProps,
  headerGroups,
  page,
  prepareRow,
  canPreviousPage,
  canNextPage,
  pageOptions,
  nextPage,
  previousPage,
  setPageSize,
  setGlobalFilter,
  state: { pageIndex, pageSize, globalFilter },
 } = useTable(
  {
   columns,
   data,
   initialState: {
    sortBy: [...sortBy],
    pageIndex: 0,
    pageSize: 10,
   },
  },
  useGlobalFilter,
  useSortBy,
  usePagination
 );

 useEffect(() => {
  setGlobalFilter("");
 }, [setGlobalFilter]);

 return (
  <>
   <div className="flex w-full flex-col">
    <div className="flex flex-row items-stretch gap-4">
     {showSearch && <InputWithIcon icon={<Icons.Search className={iconVariants({ variant: "normal" })} />} placeholder="Search" value={globalFilter || ""} onChange={(e) => setGlobalFilter(e.target.value)} className="h-10" />}
     {showControls && <ViewSelect selectedValue={pageSize} setSelectedValue={setPageSize} />}
    </div>

    <table className="min-w-full divide-y divide-neutral-800">
     <thead>
      {headerGroups.map((headerGroup, index) => (
       <tr {...headerGroup.getHeaderGroupProps()} key={`headerGroup-${index}`}>
        {headerGroup.headers.map((column, colIndex) => (
         <th {...column.getHeaderProps()} {...column.getSortByToggleProps()} key={`header-${colIndex}`} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
          <span className="flex select-none items-center gap-2">
           {column.render("Header")}
           <div className="relative size-4">
            <>
             <Icons.arrowUp
              className={iconVariants({
               variant: "small",
               className: clsx("absolute size-4 duration-200", {
                "scale-0": column.isSortedDesc,
                "scale-100": !column.isSortedDesc,
                "opacity-0": !column.isSorted,
               }),
              })}
             />
             <Icons.arrowDown
              className={iconVariants({
               variant: "small",
               className: clsx("absolute size-4 duration-200", {
                "scale-0": !column.isSortedDesc,
                "scale-100": column.isSortedDesc,
                "opacity-0": !column.isSorted,
               }),
              })}
             />
            </>
           </div>
          </span>
         </th>
        ))}
       </tr>
      ))}
     </thead>

     <tbody {...getTableBodyProps()}>
      {page.map((row, rowIndex) => {
       prepareRow(row);
       return (
        <tr {...row.getRowProps()} key={`row-${rowIndex}`}>
         {row.cells.map((cell, colIndex) => (
          <td {...cell.getCellProps()} key={`cell-${rowIndex}-${colIndex}`} className="whitespace-nowrap px-6 py-4">
           {cell.render("Cell")}
          </td>
         ))}
        </tr>
       );
      })}
     </tbody>
    </table>

    {showControls && (
     <div className="mt-2 flex items-center justify-between border-t border-t-neutral-800 pt-2 text-neutral-500">
      <ButtonSecondary onClick={() => previousPage()} disabled={!canPreviousPage} className="!w-fit">
       <Icons.arrowLeft className={iconVariants({ variant: "button" })} />
       Previous
      </ButtonSecondary>
      <div>
       Page {pageIndex + 1} of {pageOptions.length}
      </div>
      <div className="flex items-center space-x-2">
       <ButtonSecondary onClick={() => nextPage()} disabled={!canNextPage} className="!w-fit">
        Next
        <Icons.arrowRight className={iconVariants({ variant: "button", className: "!-mr-1 ml-2" })} />
       </ButtonSecondary>
      </div>
     </div>
    )}
   </div>
  </>
 );
}
