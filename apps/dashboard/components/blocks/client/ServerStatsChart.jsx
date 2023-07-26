"use client";

import { Block } from "../Block";
import { Header4 } from "../Headers";
import AreaChart from "./AreaChart";

export function ServerStatsChart({ guildJoin, guildLeave }) {
 const numberFormatter = (value) => Intl.NumberFormat("us").format(value).toString();
 function sumArray(array, metric) {
  return array.reduce((accumulator, currentValue) => accumulator + currentValue[metric], 0);
 }

 return (
  <div className="flex flex-col gap-6">
   <Block>
    <Header4 className="mb-4 !items-start !justify-normal opacity-80">
     Members Joined <span className="text-accent-primary">(+{sumArray(guildJoin, "Joins")})</span>
    </Header4>
    <AreaChart className="mt-10 h-80" data={guildJoin} index="date" categories={["Joins"]} yAxisWidth={50} valueFormatter={numberFormatter} curveType="monotone" />
   </Block>
   <Block>
    <Header4 className="mb-4 !items-start !justify-normal opacity-80">
     Members Left <span className="text-accent-primary">(-{sumArray(guildLeave, "Leaves")})</span>
    </Header4>
    <AreaChart className="mt-10 h-80" data={guildLeave} index="date" categories={["Leaves"]} yAxisWidth={50} valueFormatter={numberFormatter} curveType="monotone" />
   </Block>
  </div>
 );
}
