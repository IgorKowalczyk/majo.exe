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
 return (
  <div className="flex flex-col gap-6">
   <GenerateComponent title="New Members" data={guildJoin} csvData={guildJoinCSV} valueName="Joins" fileName="guild-joins" categories={["Joins"]} />
   <GenerateComponent title="Members Left" data={guildLeave} csvData={guildLeaveCSV} valueName="Leaves" fileName="guild-leaves" categories={["Leaves"]} />
   <GenerateComponent title="Messages Sent" data={guildMessage} csvData={guildMessageCSV} valueName="Messages" fileName="guild-messages" categories={["Messages"]} />
  </div>
 );
}

function GenerateComponent({ title, data, csvData, valueName, fileName, categories }) {
 const numberFormatter = (value) => Intl.NumberFormat("us").format(value).toString();

 function sumArray(array, metric) {
  return array.reduce((accumulator, currentValue) => accumulator + currentValue[metric], 0);
 }

 return (
  <Block>
   <Header4 className="mb-4 flex-col !justify-normal whitespace-nowrap sm:flex-row">
    <span>
     <span className="opacity-80">{title}</span> <span className="text-accent-primary">(+{sumArray(data, valueName)})</span>
    </span>
    <Menu as="div" className="relative mx-auto inline-block text-left sm:ml-auto sm:mr-0">
     <div>
      <Menu.Button className="text-normal ml-4 flex cursor-pointer items-center gap-3 font-normal duration-200 motion-reduce:transition-none">
       {({ open }) => (
        <div
         className={clsx(
          {
           "opacity-80": open,
           "hover:opacity-80": !open,
          },
          "bg-background-menu-button flex h-10 select-none items-center rounded border border-neutral-700 px-4 py-2 duration-200 motion-reduce:transition-none"
         )}
        >
         <ArrowDownTrayIcon className="min-h-4 min-w-4 h-4 w-4" aria-hidden="true" role="img" />
         <span className="text-normal !ml-2 font-normal">Export</span>
         <ChevronDownIcon
          className={clsx(
           {
            "rotate-180": open,
           },
           "min-h-4 min-w-4 ml-2 h-4 w-4 duration-200 motion-reduce:transition-none"
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
           onClick={() => fileDl(csvData, `${fileName}.csv`)}
           className={clsx(
            {
             "bg-button-primary text-white": active,
             "text-gray-400": !active,
            },
            "group my-1 flex w-full cursor-pointer items-center rounded-md px-2 py-2 text-sm font-normal duration-200 motion-reduce:transition-none"
           )}
          >
           <DocumentArrowDownIcon className="min-h-5 min-w-5 mr-2 h-5 w-5 " aria-hidden="true" role="img" /> Export as CSV
          </p>
         )}
        </Menu.Item>
        <Menu.Item>
         {({ active }) => (
          <p
           onClick={() => fileDl(JSON.stringify(data), `${fileName}.json`)}
           className={clsx(
            {
             "bg-button-primary text-white": active,
             "text-gray-400": !active,
            },
            "group my-1 flex w-full cursor-pointer items-center rounded-md px-2 py-2 text-sm font-normal duration-200 motion-reduce:transition-none"
           )}
          >
           <DocumentArrowDownIcon className="min-h-5 min-w-5 mr-2 h-5 w-5 " aria-hidden="true" role="img" /> Export as JSON
          </p>
         )}
        </Menu.Item>
       </div>
      </Menu.Items>
     </Transition>
    </Menu>
   </Header4>
   <AreaChart className="mt-10 h-80" data={data} index="date" categories={categories} yAxisWidth={50} valueFormatter={numberFormatter} csvData={csvData} />
  </Block>
 );
}
