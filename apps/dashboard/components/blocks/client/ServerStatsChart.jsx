"use client";

import { Menu, Transition } from "@headlessui/react";
import { ArrowDownTrayIcon, ChevronDownIcon, DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import fileDl from "js-file-download";
import { Fragment } from "react";
import { Block } from "@/components/blocks/Block";
import AreaChart from "@/components/blocks/client/AreaChart";
import { Header4 } from "@/components/blocks/Headers";

export function ServerStatsChart({ guildJoin, guildLeave, guildJoinCSV, guildLeaveCSV, guildMessage, guildMessageCSV }) {
 const numberFormatter = (value) => Intl.NumberFormat("us").format(value).toString();
 function sumArray(array, metric) {
  return array.reduce((accumulator, currentValue) => accumulator + currentValue[metric], 0);
 }

 return (
  <div className="flex flex-col gap-6">
   <Block>
    <Header4 className="mb-4 !items-start !justify-normal">
     <span className="opacity-80">Members Joined</span> <span className="text-accent-primary">(+{sumArray(guildJoin, "Joins")})</span>
     <Menu as="div" className="relative ml-auto inline-block text-left">
      <div>
       <Menu.Button className="text-normal ml-4 flex cursor-pointer items-center gap-3 font-normal duration-200 motion-reduce:transition-none">
        {({ open }) => (
         <div
          className={clsx(
           {
            "opacity-80": open,
            "hover:opacity-80": !open,
           },
           "bg-background-menu-button flex h-10 select-none items-center rounded border border-neutral-700 px-4 py-2 duration-200  motion-reduce:transition-none"
          )}
         >
          <ArrowDownTrayIcon className="h-4 w-4" aria-hidden="true" role="img" />
          <span className="text-normal !ml-2 font-normal">Export</span>
          <ChevronDownIcon
           className={clsx(
            {
             "rotate-180": open,
            },
            "ml-2 h-4 w-4 duration-200 motion-reduce:transition-none"
           )}
          />
         </div>
        )}
       </Menu.Button>
      </div>
      <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
       <Menu.Items className="bg-background-menu absolute right-0 z-50 mt-2 w-56 origin-top-right divide-y divide-neutral-800 rounded-md border border-neutral-800 p-1 shadow-2xl">
        <div className="px-1 py-1 ">
         <Menu.Item>
          {({ active }) => (
           <p
            onClick={() => fileDl(guildJoinCSV, "guild-joins.csv")}
            className={clsx(
             {
              "bg-button-primary text-white": active,
              "text-gray-400": !active,
             },
             "group my-1 flex w-full cursor-pointer items-center rounded-md px-2 py-2 text-sm font-normal duration-200 motion-reduce:transition-none"
            )}
           >
            <DocumentArrowDownIcon className="mr-2 h-5 w-5 " aria-hidden="true" role="img" /> Export as CSV
           </p>
          )}
         </Menu.Item>
         <Menu.Item>
          {({ active }) => (
           <p
            onClick={() => fileDl(JSON.stringify(guildJoin), "guild-joins.json")}
            className={clsx(
             {
              "bg-button-primary text-white": active,
              "text-gray-400": !active,
             },
             "group my-1 flex w-full cursor-pointer items-center rounded-md px-2 py-2 text-sm font-normal duration-200 motion-reduce:transition-none"
            )}
           >
            <DocumentArrowDownIcon className="mr-2 h-5 w-5 " aria-hidden="true" role="img" /> Export as JSON
           </p>
          )}
         </Menu.Item>
        </div>
       </Menu.Items>
      </Transition>
     </Menu>
    </Header4>
    <AreaChart className="mt-10 h-80" data={guildJoin} index="date" categories={["Joins"]} yAxisWidth={50} valueFormatter={numberFormatter} curveType="monotone" csvData={guildJoinCSV} />
   </Block>
   <Block>
    <Header4 className="mb-4 !items-start !justify-normal">
     <span className="opacity-80">Members Left</span> <span className="text-accent-primary">(+{sumArray(guildLeave, "Leaves")})</span>
     <Menu as="div" className="relative ml-auto inline-block text-left">
      <div>
       <Menu.Button className="text-normal ml-4 flex cursor-pointer items-center gap-3 font-normal duration-200 motion-reduce:transition-none">
        {({ open }) => (
         <div
          className={clsx(
           {
            "opacity-80": open,
            "hover:opacity-80": !open,
           },
           "bg-background-menu-button flex h-10 select-none items-center rounded border border-neutral-700 px-4 py-2 duration-200  motion-reduce:transition-none"
          )}
         >
          <ArrowDownTrayIcon className="h-4 w-4" aria-hidden="true" role="img" />
          <span className="text-normal !ml-2 font-normal">Export</span>
          <ChevronDownIcon
           className={clsx(
            {
             "rotate-180": open,
            },
            "ml-2 h-4 w-4 duration-200 motion-reduce:transition-none"
           )}
          />
         </div>
        )}
       </Menu.Button>
      </div>
      <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
       <Menu.Items className="bg-background-menu absolute right-0 z-50 mt-2 w-56 origin-top-right divide-y divide-neutral-800 rounded-md border border-neutral-800 p-1 shadow-2xl">
        <div className="px-1 py-1 ">
         <Menu.Item>
          {({ active }) => (
           <p
            onClick={() => fileDl(guildLeaveCSV, "guild-leaves.csv")}
            className={clsx(
             {
              "bg-button-primary text-white": active,
              "text-gray-400": !active,
             },
             "group my-1 flex w-full cursor-pointer items-center rounded-md px-2 py-2 text-sm font-normal duration-200 motion-reduce:transition-none"
            )}
           >
            <DocumentArrowDownIcon className="mr-2 h-5 w-5 " aria-hidden="true" role="img" /> Export as CSV
           </p>
          )}
         </Menu.Item>
         <Menu.Item>
          {({ active }) => (
           <p
            onClick={() => fileDl(JSON.stringify(guildLeave), "guild-joins.json")}
            className={clsx(
             {
              "bg-button-primary text-white": active,
              "text-gray-400": !active,
             },
             "group my-1 flex w-full cursor-pointer items-center rounded-md px-2 py-2 text-sm font-normal duration-200 motion-reduce:transition-none"
            )}
           >
            <DocumentArrowDownIcon className="mr-2 h-5 w-5 " aria-hidden="true" role="img" /> Export as JSON
           </p>
          )}
         </Menu.Item>
        </div>
       </Menu.Items>
      </Transition>
     </Menu>
    </Header4>
    <AreaChart className="mt-10 h-80" data={guildLeave} index="date" categories={["Leaves"]} yAxisWidth={50} valueFormatter={numberFormatter} curveType="monotone" csvData={guildLeaveCSV} />
   </Block>

   <Block>
    <Header4 className="mb-4 !items-start !justify-normal">
     <span className="opacity-80">Messages Sent</span> <span className="text-accent-primary">(+{sumArray(guildMessage, "Messages")})</span>
     <Menu as="div" className="relative ml-auto inline-block text-left">
      <div>
       <Menu.Button className="text-normal ml-4 flex cursor-pointer items-center gap-3 font-normal duration-200 motion-reduce:transition-none">
        {({ open }) => (
         <div
          className={clsx(
           {
            "opacity-80": open,
            "hover:opacity-80": !open,
           },
           "bg-background-menu-button flex h-10 select-none items-center rounded border border-neutral-700 px-4 py-2 duration-200  motion-reduce:transition-none"
          )}
         >
          <ArrowDownTrayIcon className="h-4 w-4" aria-hidden="true" role="img" />
          <span className="text-normal !ml-2 font-normal">Export</span>
          <ChevronDownIcon
           className={clsx(
            {
             "rotate-180": open,
            },
            "ml-2 h-4 w-4 duration-200 motion-reduce:transition-none"
           )}
          />
         </div>
        )}
       </Menu.Button>
      </div>
      <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
       <Menu.Items className="bg-background-menu absolute right-0 z-50 mt-2 w-56 origin-top-right divide-y divide-neutral-800 rounded-md border border-neutral-800 p-1 shadow-2xl">
        <div className="px-1 py-1 ">
         <Menu.Item>
          {({ active }) => (
           <p
            onClick={() => fileDl(guildMessageCSV, "guild-messages.csv")}
            className={clsx(
             {
              "bg-button-primary text-white": active,
              "text-gray-400": !active,
             },
             "group my-1 flex w-full cursor-pointer items-center rounded-md px-2 py-2 text-sm font-normal duration-200 motion-reduce:transition-none"
            )}
           >
            <DocumentArrowDownIcon className="mr-2 h-5 w-5 " aria-hidden="true" role="img" /> Export as CSV
           </p>
          )}
         </Menu.Item>
         <Menu.Item>
          {({ active }) => (
           <p
            onClick={() => fileDl(JSON.stringify(guildMessage), "guild-messages.json")}
            className={clsx(
             {
              "bg-button-primary text-white": active,
              "text-gray-400": !active,
             },
             "group my-1 flex w-full cursor-pointer items-center rounded-md px-2 py-2 text-sm font-normal duration-200 motion-reduce:transition-none"
            )}
           >
            <DocumentArrowDownIcon className="mr-2 h-5 w-5 " aria-hidden="true" role="img" /> Export as JSON
           </p>
          )}
         </Menu.Item>
        </div>
       </Menu.Items>
      </Transition>
     </Menu>
    </Header4>
    <AreaChart className="mt-10 h-80" data={guildMessage} index="date" categories={["Messages"]} yAxisWidth={50} valueFormatter={numberFormatter} curveType="monotone" csvData={guildMessageCSV} />
   </Block>
  </div>
 );
}
