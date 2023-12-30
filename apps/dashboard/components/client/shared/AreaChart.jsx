"use client";

import { globalConfig } from "@majoexe/config";
import { Area, CartesianGrid, AreaChart as ReChartsAreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { twMerge } from "tailwind-merge";
import { Icons, iconVariants } from "@/components/Icons";

export default function AreaChart({ data = [], categories = [], index, valueFormatter = (value) => value, startEndOnly = false, showXAxis = true, showYAxis = true, yAxisWidth = 56, autoMinValue = false, curveType = "monotone", minValue, maxValue, connectNulls = true, noDataText = "This chart has no data! Please check back later.", className, ...other }) {
 const yAxisDomain = autoMinValue ? [0, "auto"] : [minValue ?? 0, maxValue ?? "auto"];

 const categoryColors = categories.map((category) => {
  return `url(#${category.replace(/ /g, "-")})`;
 });

 return (
  <div className={twMerge("h-80 w-full", className)} {...other}>
   <ResponsiveContainer className="h-full w-full">
    {data && data.length > 0 ? (
     <ReChartsAreaChart data={data}>
      <CartesianGrid className="stroke-gray-600 stroke-1" strokeDasharray="3 3" horizontal={true} vertical={false} />
      <XAxis hide={!showXAxis} dataKey={index} tick={{ transform: "translate(0, 6)" }} ticks={startEndOnly ? [data[0][index], data[data.length - 1][index]] : undefined} fill="" stroke="" className="fill-gray-600" interval="preserveStartEnd" tickLine={false} axisLine={false} padding={{ left: 10, right: 10 }} minTickGap={5} />
      <YAxis width={yAxisWidth} hide={!showYAxis} axisLine={false} tickLine={false} type="number" domain={yAxisDomain} tick={{ transform: "translate(-3, 0)" }} fill="" stroke="" className="fill-gray-600" tickFormatter={(value) => Math.round(valueFormatter(value))} allowDecimals={false} />
      <Tooltip wrapperStyle={{ outline: "none" }} isAnimationActive={true} animationDuration={500} cursor={{ stroke: globalConfig.defaultColor, strokeWidth: 1 }} content={({ active, payload, label }) => <ChartTooltip active={active} payload={payload} label={label} categoryColors={categoryColors} valueFormatter={valueFormatter} />} position={{ y: "auto" }} />
      {categories.map((category) => (
       <defs key={category}>
        <linearGradient className="text-accent-primary" id={category.replace(/ /g, "-")} x1="0" y1="0" x2="0" y2="1">
         <stop offset="5%" stopColor="currentColor" stopOpacity={0.4} />
         <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
        </linearGradient>
       </defs>
      ))}
      {categories.map((category) => (
       <Area // prettier
        className="fill-accent-primary stroke-accent-primary"
        activeDot={{ className: "stroke-accent-primary fill-accent-primary" }}
        dot={false}
        key={category}
        name={category}
        type={curveType}
        dataKey={category}
        stroke=""
        fill={`url(#${category.replace(/ /g, "-")})`}
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
        isAnimationActive={true}
        animationDuration={1500}
        connectNulls={connectNulls}
       />
      ))}
     </ReChartsAreaChart>
    ) : (
     <p className="mb-4 flex items-center justify-start gap-2 text-left text-red-400">
      <Icons.warning className={iconVariants({ variant: "large", className: "mr-2 stroke-2" })} />
      {noDataText}
     </p>
    )}
   </ResponsiveContainer>
  </div>
 );
}

const ChartTooltip = ({ active, payload, label, categoryColors, valueFormatter }) => {
 if (active && payload && categoryColors) {
  return (
   <div className="bg-background-secondary rounded-lg border border-neutral-800 text-white shadow-lg">
    <div className="border-b border-neutral-800 px-4 py-2">
     <p className="font-medium text-white">{label}</p>
    </div>
    <div className="space-y-1 px-4 py-2">
     {payload.map(({ value, name }, idx) => (
      <div key={`id-${idx}`} className="flex items-center justify-between space-x-2">
       <div className="flex items-center space-x-2">
        <span className="bg-accent-primary h-4 min-h-4 w-4 min-w-4 shrink-0 rounded-full border border-neutral-800 shadow-md" />
        <p className="whitespace-nowrap text-right text-white">{name}</p>
       </div>
       <p className="whitespace-nowrap text-right font-medium tabular-nums text-white">{valueFormatter(value)}</p>
      </div>
     ))}
    </div>
   </div>
  );
 }
 return null;
};
