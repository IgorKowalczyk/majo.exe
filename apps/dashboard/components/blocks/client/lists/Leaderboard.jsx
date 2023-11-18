"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { formatNumber } from "@majoexe/util/functions";
import Link from "next/link";
import { useMemo, useEffect } from "react";
import { useTable, useSortBy, usePagination, useGlobalFilter } from "react-table";
import Image from "@/components/blocks/client/shared/Image";
import { Tooltip } from "@/components/blocks/client/shared/Tooltip";
import { InputWithIcon } from "@/components/buttons/server/Input";
import { SecondaryButton } from "@/components/buttons/server/Secondary";

export function Leaderboard({ data, showControls = true, showSearch = true }) {
 const columns = useMemo(
  () => [
   {
    Header: "#",
    accessor: "id",
    Cell: ({ value }) => `#${value}`,
   },
   {
    Header: "User",
    accessor: "user",
    Cell: ({ value }) => (
     <div id={value?.discordId}>
      <Tooltip content={`Discord ID: ${value?.discordId || "Unknown"}`}>
       <Link className="flex w-fit items-center space-x-4" href={showControls ? `user/${value?.discordId}` : `#${value?.discordId}`} passHref>
        <div className="relative">{value?.avatar && <Image src={`https://cdn.discordapp.com/avatars/${value?.discordId}/${value?.avatar}.${value?.avatar.startsWith("a_") ? "gif" : "png"}`} alt={`${value?.name} avatar`} quality={95} width={32} height={32} className="min-h-12 min-w-12 h-12 w-12 rounded-full" />}</div>
        <span className="text-left font-bold">
         {value?.global_name || value?.name}
         {value?.discriminator !== "0" && <span className="opacity-70">#{value?.discriminator || "0000"}</span>}
        </span>
       </Link>
      </Tooltip>
     </div>
    ),
   },
   {
    Header: "XP",
    accessor: "xp",
    Cell: ({ value }) => (
     <Tooltip content={value}>
      <span className="cursor-help">{formatNumber(value)}</span>
     </Tooltip>
    ),
   },
   {
    Header: "Level",
    accessor: "level",
   },
  ],
  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  []
 );

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
    sortBy: [
     {
      id: "id",
      desc: false,
     },
    ],
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
    <div className="flex flex-row items-center gap-4">
     {showSearch && <InputWithIcon icon={<MagnifyingGlassIcon className="min-h-5 min-w-5 h-5 w-5" />} placeholder="Search" value={globalFilter || ""} onChange={(e) => setGlobalFilter(e.target.value)} className="h-10" />}
     {showControls && (
      <select
       value={pageSize}
       onChange={(e) => {
        setPageSize(Number(e.target.value));
       }}
       className="h-10 rounded-md border border-neutral-800 bg-transparent py-2 pl-2 pr-9 text-white !ring-0 !ring-transparent"
      >
       {[10, 20, 30, 40, 50].map((pageSizeOption) => (
        <option key={pageSizeOption} value={pageSizeOption} className="bg-neutral-800 text-white">
         Show {pageSizeOption}
        </option>
       ))}
      </select>
     )}
    </div>

    <table className="min-w-full divide-y divide-neutral-800">
     {/* Table header */}
     <thead>
      {headerGroups.map((headerGroup, index) => (
       <tr {...headerGroup.getHeaderGroupProps()} key={`headerGroup-${index}`}>
        {headerGroup.headers.map((column, colIndex) => (
         <th {...column.getHeaderProps()} {...column.getSortByToggleProps()} key={`header-${colIndex}`} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
          {column.render("Header")}
          {column.isSorted ? (column.isSortedDesc ? " ↓" : " ↑") : ""}
         </th>
        ))}
       </tr>
      ))}
     </thead>

     {/* Table body */}
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
     <div className="mt-2 flex items-center justify-between border-t border-t-neutral-800 pt-2 text-gray-600">
      <SecondaryButton onClick={() => previousPage()} disabled={!canPreviousPage} className={"!w-fit"}>
       Previous
      </SecondaryButton>
      <div>
       Page {pageIndex + 1} of {pageOptions.length}
      </div>
      <div className="flex items-center space-x-2">
       <SecondaryButton onClick={() => nextPage()} disabled={!canNextPage} className={"!w-fit"}>
        Next
       </SecondaryButton>
      </div>
     </div>
    )}
   </div>
  </>
 );
}
