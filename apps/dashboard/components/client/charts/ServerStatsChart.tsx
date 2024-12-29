"use client";

import { DataEntry } from "@majoexe/util/functions/util";
import fileDl from "js-file-download";
import React, { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { ChartContainer, ChartConfig, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/BetaChart";
import { Block } from "@/components/ui/Block";
import Header, { headerVariants } from "@/components/ui/Headers";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { ListBox, ListBoxArrow, ListBoxButton, ListBoxOption, ListBoxOptions } from "@/components/ui/ListBox";
import { Menu, MenuArrow, MenuButton, MenuItem, MenuItems } from "@/components/ui/Menu";
import { cn } from "@/lib/utils";

export const dateRanges = [
 { label: "Last 7 days", days: 7 },
 { label: "Last 14 days", days: 14 },
 { label: "Last 30 days", days: 30 },
 { label: "All time", days: Infinity },
] as const;

export type DateRange = (typeof dateRanges)[number];

export interface StatsChartProps {
 title: string;
 data: DataEntry[];
 CSVData: string;
 fileName: string;
 categories: string[];
 chartConfig?: ChartConfig;
 calculateTotal: (data: DataEntry[], dateRange: DateRange) => number;
}

export const StatsChart = React.forwardRef<HTMLDivElement, StatsChartProps>(({ title, data, CSVData, fileName, categories, chartConfig, calculateTotal }, ref) => {
 const [dateRange, setDateRange] = useState<DateRange>(dateRanges[0]);

 let filteredData = data;

 if (dateRange && dateRange.days !== Infinity) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - dateRange.days);
  filteredData = data.filter((item) => item.date && new Date(item.date) >= cutoffDate) as typeof filteredData;
 }

 const start = filteredData[0]?.date;
 const end = filteredData[filteredData.length - 1]?.date;

 const total = calculateTotal(data, dateRange);

 return (
  <Block ref={ref}>
   <div className="mb-4 flex flex-col items-center justify-normal gap-2 whitespace-nowrap lg:flex-row">
    <Header className={cn(headerVariants({ variant: "h2" }), "flex-col items-center gap-1 lg:items-start")}>
     <span>
      {title}{" "}
      <span
       className={cn({
        "text-red-400": total < 0,
        "text-button-primary": total >= 0,
       })}
      >
       ({total >= 0 ? `+${total}` : total})
      </span>
     </span>
     {start && end && (
      <div className="text-left text-sm font-normal opacity-40">
       {start.toString()} - {end.toString()}
      </div>
     )}
    </Header>
    <div className="relative mx-auto flex flex-row flex-wrap items-center justify-center gap-2 lg:ml-auto lg:mr-0 lg:gap-2">
     <Menu>
      <MenuButton>
       <Icons.Download className={iconVariants({ variant: "small" })} />
       <span>Export</span>
       <MenuArrow />
      </MenuButton>
      <MenuItems>
       <div>
        <MenuItem onClick={() => fileDl(CSVData, `${fileName}.csv`)}>
         <Icons.fileCSV className={iconVariants({ variant: "button", className: "ml-1" })} /> Export as CSV
        </MenuItem>
        <MenuItem onClick={() => fileDl(JSON.stringify(data), `${fileName}.json`)}>
         <Icons.fileJSON className={iconVariants({ variant: "button", className: "ml-1" })} /> Export as JSON
        </MenuItem>
       </div>
      </MenuItems>
     </Menu>
     <ListBox value={dateRange} onChange={(value) => setDateRange(dateRanges.find((range) => range.days.toString() === value) || dateRanges[0])}>
      <ListBoxButton className="flex items-center gap-3">
       <Icons.CalendarRange className={iconVariants({ variant: "small" })} />
       <span>Date Range: {dateRange?.label ?? "N/A"}</span>
       <ListBoxArrow />
      </ListBoxButton>

      <ListBoxOptions>
       {dateRanges.map((range) => (
        <ListBoxOption key={`range-${range.label}`} value={range.days.toString()}>
         {range.label}
        </ListBoxOption>
       ))}
      </ListBoxOptions>
     </ListBox>
    </div>
   </div>
   <ChartContainer config={chartConfig || {}} className="aspect-auto h-[250px] w-full">
    <AreaChart accessibilityLayer data={filteredData}>
     <defs>
      {categories.map((category) => {
       const config = (chartConfig ?? {})[category as keyof typeof chartConfig];
       const color = config ? config.color : "hsl(var(--chart-1))";
       return (
        <linearGradient key={category} id={`fill-${category.toLowerCase().replace(/ /g, "")}`} x1="0" y1="0" x2="0" y2="1">
         <stop offset="5%" stopColor={color} stopOpacity={0.8} />
         <stop offset="95%" stopColor={color} stopOpacity={0.1} />
        </linearGradient>
       );
      })}
     </defs>
     <CartesianGrid vertical={false} />
     <XAxis
      dataKey="date"
      tickLine={false}
      axisLine={false}
      tickMargin={8}
      minTickGap={32}
      tickFormatter={(value) => {
       const date = new Date(value);
       return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
       });
      }}
     />
     <ChartTooltip
      cursor={true}
      content={
       <ChartTooltipContent
        labelFormatter={(value) => {
         return new Date(value).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
         });
        }}
        indicator="line"
       />
      }
     />

     {categories.map((category) => (
      <Area key={category} dataKey={category} type="monotoneX" fill={`url(#fill-${category.toLowerCase().replace(/ /g, "")})`} stroke={chartConfig?.[category as keyof typeof chartConfig]?.color || "hsl(var(--chart-5))"} stackId={`stack-${category}`} />
     ))}
     <ChartLegend content={<ChartLegendContent />} />
    </AreaChart>
   </ChartContainer>
  </Block>
 );
});
