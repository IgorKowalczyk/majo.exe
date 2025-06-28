"use client";

import { DataEntry } from "@majoexe/util/functions/util";
import { CalendarRangeIcon, ChevronsUpDownIcon, DownloadIcon } from "lucide-react";
import React, { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Button } from "@/components/ui/Buttons";
import { ChartContainer, ChartConfig, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/Chart";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import Header, { headerVariants } from "@/components/ui/Headers";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from "@/components/ui/Select";
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
 CSVData?: string;
 fileName?: string;
 categories: string[];
 chartConfig?: ChartConfig;
 showDateRange?: boolean;
 calculateTotal?: (data: DataEntry[], dateRange: DateRange) => number;
}

export const StatsChart = ({ title, data, CSVData, fileName, categories, chartConfig, showDateRange = true, calculateTotal }: StatsChartProps) => {
 const [dateRange, setDateRange] = useState<DateRange>(dateRanges[0]);

 let filteredData = data;

 if (dateRange && dateRange.days !== Infinity) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - dateRange.days);
  filteredData = data.filter((item) => item.date && new Date(item.date) >= cutoffDate) as typeof filteredData;
 }

 const start = filteredData[0]?.date;
 const end = filteredData[filteredData.length - 1]?.date;

 const total = calculateTotal ? calculateTotal(filteredData, dateRange) : null;

 const downloadFile = (data: string, fileName: string) => {
  const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
 };

 return (
  <>
   <div className="mb-4 flex flex-col items-center justify-normal gap-2 whitespace-nowrap lg:flex-row">
    <Header className={cn(headerVariants({ variant: "h2" }), "flex-col items-center gap-1 lg:items-start")}>
     <span>
      {title}{" "}
      {total !== null && (
       <span
        className={cn({
         "text-red-400": total < 0,
         "text-button-primary": total >= 0,
        })}
       >
        ({total >= 0 ? `+${total}` : total})
       </span>
      )}
     </span>
     {start && end && showDateRange && (
      <div className="text-left text-sm font-normal opacity-40">
       {start.toString()} - {end.toString()}
      </div>
     )}
    </Header>
    <div className="relative mx-auto flex flex-row flex-wrap items-center justify-center gap-2 lg:ml-auto lg:mr-0 lg:gap-2">
     {fileName && CSVData && (
      <DropdownMenu>
       <DropdownMenuTrigger asChild>
        <Button variant="select">
         <DownloadIcon className={iconVariants({ variant: "small" })} />
         Export
         <ChevronsUpDownIcon
          className={iconVariants({
           variant: "small",
           className: "text-neutral-400 duration-200 motion-reduce:transition-none",
          })}
         />
        </Button>
       </DropdownMenuTrigger>
       <DropdownMenuContent className="min-w-42">
        <DropdownMenuItem onClick={() => downloadFile(CSVData, `${fileName}.csv`)}>
         <Icons.fileCSV className={iconVariants({ variant: "button", className: "ml-1" })} /> Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => downloadFile(JSON.stringify(data), `${fileName}.json`)}>
         <Icons.fileJSON className={iconVariants({ variant: "button", className: "ml-1" })} /> Export as JSON
        </DropdownMenuItem>
       </DropdownMenuContent>
      </DropdownMenu>
     )}
     {showDateRange && (
      <Select
       value={dateRange?.days.toString() ?? dateRanges[0].days.toString()}
       onValueChange={(value) => setDateRange(dateRanges.find((range) => range.days.toString() === value) || dateRanges[0])}
      >
       <SelectTrigger>
        <SelectValue placeholder="Select date range">
         <span className="flex items-center gap-2">
          <CalendarRangeIcon className={iconVariants({ variant: "small" })} />
          <span>Date Range: {dateRange?.label ?? "N/A"}</span>
         </span>
        </SelectValue>
       </SelectTrigger>

       <SelectContent className="min-w-[var(--radix-select-trigger-width)]">
        {dateRanges.map((range) => (
         <SelectItem key={`range-${range.label}`} value={range.days.toString()}>
          {range.label}
         </SelectItem>
        ))}
       </SelectContent>
      </Select>
     )}
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
      <Area
       key={category}
       dataKey={category}
       type="monotoneX"
       fill={`url(#fill-${category.toLowerCase().replace(/ /g, "")})`}
       stroke={chartConfig?.[category as keyof typeof chartConfig]?.color || "hsl(var(--chart-5))"}
       stackId={`stack-${category}`}
       strokeWidth={2}
      />
     ))}
     <ChartLegend content={<ChartLegendContent />} />
    </AreaChart>
   </ChartContainer>
  </>
 );
};
