"use client";

import { DataEntry, sumArray } from "@majoexe/util/functions/util";
import { json2csv } from "json-2-csv";
import { StatsChart } from "@/components/client/charts/ServerStatsChart";
import { Block } from "@/components/ui/Block";
import type { ChartConfig } from "@/components/ui/Chart";

interface StatisticChartsProps {
 guildJoin: DataEntry[];
 guildLeave: DataEntry[];
 guildMessage: DataEntry[];
 chartConfig?: ChartConfig;
}

export function StatisticCharts({ guildJoin, guildLeave, guildMessage, chartConfig }: StatisticChartsProps) {
 const combinedData = guildJoin.map((join) => ({
  date: join.date,
  Joins: join.Joins,
  Leaves: guildLeave.find((leave) => leave.date === join.date)?.Leaves || 0,
 })) satisfies DataEntry[];

 return (
  <div className="space-y-4">
   <Block>
    <StatsChart
     title="Members"
     data={combinedData}
     CSVData={json2csv(combinedData)}
     fileName="guild-members"
     categories={["Joins", "Leaves"]}
     chartConfig={chartConfig}
     calculateTotal={(data, dateRange) => {
      if (dateRange.days === Infinity) {
       return sumArray(data, "Joins") - sumArray(data, "Leaves");
      }
      return (
       sumArray(
        data.filter((item) => new Date(item.date) >= new Date(Date.now() - dateRange.days * 24 * 60 * 60 * 1000)),
        "Joins"
       ) -
       sumArray(
        data.filter((item) => new Date(item.date) >= new Date(Date.now() - dateRange.days * 24 * 60 * 60 * 1000)),
        "Leaves"
       )
      );
     }}
    />
   </Block>
   <Block>
    <StatsChart
     title="Messages Sent"
     data={guildMessage}
     CSVData={json2csv(guildMessage)}
     fileName="guild-messages"
     categories={["Messages"]}
     chartConfig={chartConfig}
     calculateTotal={(data, dateRange) => {
      if (dateRange.days === Infinity) {
       return sumArray(data, "Messages");
      }
      return sumArray(
       data.filter((item) => new Date(item.date) >= new Date(Date.now() - dateRange.days * 24 * 60 * 60 * 1000)),
       "Messages"
      );
     }}
    />
   </Block>
  </div>
 );
}
