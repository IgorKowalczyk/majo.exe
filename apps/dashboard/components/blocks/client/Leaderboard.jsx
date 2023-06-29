"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useMemo, useEffect } from "react";
import { useTable, useSortBy, usePagination, useGlobalFilter } from "react-table";
import { Tooltip } from "@/components/blocks/client/Tooltip";
import { InputWithIcon } from "@/components/buttons/server/Input";
import { SecondaryButton } from "@/components/buttons/server/Secondary";

export function Leaderboard({ data }) {
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
     <div className="flex items-center space-x-4">
      <div className="relative">{value?.avatar && <Image src={`https://cdn.discordapp.com/avatars/${value?.discordId}/${value?.avatar}.${value?.avatar.startsWith("a_") ? "gif" : "png"}`} alt={`${value?.name} avatar`} quality={95} width={32} height={32} className="w-12 h-12 rounded-full" />}</div>
      <Tooltip content={`Discord ID: ${value?.discordId}`}>
       <p className="font-bold text-left">
        {value?.name || value?.id}
        <span className="opacity-70">#{value?.discriminator || "0000"}</span>
       </p>
      </Tooltip>
     </div>
    ),
   },
   {
    Header: "XP",
    accessor: "xp",
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
  getTableProps,
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
   <div className="flex flex-col">
    <div className="flex items-center gap-4 flex-row">
     <InputWithIcon icon={<MagnifyingGlassIcon className="w-5 h-5" />} placeholder="Search" alue={globalFilter || ""} onChange={(e) => setGlobalFilter(e.target.value)} className="h-10" />
     <select
      value={pageSize}
      onChange={(e) => {
       setPageSize(Number(e.target.value));
      }}
      className="rounded-md border bg-transparent pl-2 py-2 pr-9 !ring-0 !ring-transparent border-neutral-800 text-white h-10"
     >
      {[10, 20, 30, 40, 50].map((pageSize) => (
       <option key={pageSize} value={pageSize} className="bg-neutral-800 text-white">
        Show {pageSize}
       </option>
      ))}
     </select>
    </div>

    <table {...getTableProps()} className="min-w-full divide-y divide-neutral-800">
     {/* Table header */}
     <thead>
      {headerGroups.map((headerGroup) => (
       <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map((column) => (
         <th key={column.id} {...column.getHeaderProps(column.getSortByToggleProps())} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
          {column.render("Header")}
          {column.isSorted ? (column.isSortedDesc ? " ↓" : " ↑") : ""}
         </th>
        ))}
       </tr>
      ))}
     </thead>

     {/* Table body */}
     <tbody {...getTableBodyProps()}>
      {page.map((row) => {
       prepareRow(row);
       return (
        <tr key={row.id} {...row.getRowProps()}>
         {row.cells.map((cell) => (
          <td key={cell.column.id} {...cell.getCellProps()} className="whitespace-nowrap px-6 py-4">
           {cell.render("Cell")}
          </td>
         ))}
        </tr>
       );
      })}
     </tbody>
    </table>

    {/* Pagination */}
    <div className="mt-2 flex items-center justify-between border-t pt-2 text-gray-600 border-t-neutral-800">
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
   </div>
  </>
 );
}
