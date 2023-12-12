"use client";

import { Menu, Transition } from "@headlessui/react";
import { ArrowDownTrayIcon, ChevronDownIcon, DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import fileDl from "js-file-download";
import { Fragment } from "react";
import { Block } from "@/components/Block";
import AreaChart from "@/components/client/shared/AreaChart";
import { Header4 } from "@/components/Headers";

export function ServerStatsChart({ guildJoin, guildLeave, guildJoinCSV, guildLeaveCSV, guildMessage, guildMessageCSV }) {
 return (
  <div className="flex flex-col gap-6">
   <GenerateComponent title="New Members" data={guildJoin} CSVData={guildJoinCSV} valueName="Joins" fileName="guild-joins" categories={["Joins"]} />
   <GenerateComponent title="Members Left" data={guildLeave} CSVData={guildLeaveCSV} valueName="Leaves" fileName="guild-leaves" categories={["Leaves"]} />
   <GenerateComponent title="Messages Sent" data={guildMessage} CSVData={guildMessageCSV} valueName="Messages" fileName="guild-messages" categories={["Messages"]} />
  </div>
 );
}

function GenerateComponent({ title, data, CSVData, valueName, fileName, categories }) {
 const numberFormatter = (value) => Intl.NumberFormat("us").format(value).toString();

 function sumArray(array, metric) {
  return array.reduce((accumulator, currentValue) => accumulator + currentValue[metric], 0);
 }

 return (
  <Block>
   <Header4 className="mb-4 flex-col !justify-normal whitespace-nowrap sm:flex-row">
    <span className="opacity-80">{title}</span> <span className="text-accent-primary">(+{sumArray(data, valueName)})</span>
    <Menu as="div" className="relative mx-auto inline-block text-left sm:ml-auto sm:mr-0">
     <Menu.Button className="ui-open:border-neutral-700 hover:bg-background-menu-button ui-open:bg-background-menu-button ml-4 flex h-10 cursor-pointer select-none items-center gap-3 rounded-md border border-neutral-800 px-3 py-2 text-sm font-normal duration-200 hover:border-neutral-700 motion-reduce:transition-none sm:text-sm">
      <>
       <ArrowDownTrayIcon className="min-h-4 min-w-4 h-4 w-4" aria-hidden="true" role="img" />
       <span>Export</span>
       <ChevronDownIcon className="min-h-4 ui-open:rotate-180 min-w-4 h-4 w-4 duration-200 motion-reduce:transition-none" />
      </>
     </Menu.Button>
     <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
      <Menu.Items className="bg-background-secondary absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-xl border border-neutral-800 px-2 py-1 shadow-2xl">
       <Menu.Item>
        <p onClick={() => fileDl(CSVData, `${fileName}.csv`)} className="ui-active:bg-button-primary ui-active:text-white group my-1 flex w-full cursor-pointer items-center rounded-md px-2 py-2 text-sm font-normal text-gray-400 duration-200 motion-reduce:transition-none">
         <DocumentArrowDownIcon className="min-h-5 min-w-5 mr-2 h-5 w-5 " aria-hidden="true" role="img" /> Export as CSV
        </p>
       </Menu.Item>
       <Menu.Item>
        <p onClick={() => fileDl(JSON.stringify(data), `${fileName}.json`)} className="ui-active:bg-button-primary ui-active:text-white group my-1 flex w-full cursor-pointer items-center rounded-md px-2 py-2 text-sm font-normal text-gray-400 duration-200 motion-reduce:transition-none">
         <DocumentArrowDownIcon className="min-h-5 min-w-5 mr-2 h-5 w-5 " aria-hidden="true" role="img" /> Export as JSON
        </p>
       </Menu.Item>
      </Menu.Items>
     </Transition>
    </Menu>
   </Header4>
   <AreaChart className="mt-10 h-80" data={data} index="date" categories={categories} yAxisWidth={50} valueFormatter={numberFormatter} CSVData={CSVData} />
  </Block>
 );
}
