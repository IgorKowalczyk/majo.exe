"use client";

import { Area, CartesianGrid, AreaChart as ReChartsAreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { twMerge } from "tailwind-merge";

export const getYAxisDomain = (autoMinValue, minValue, maxValue) => {
 const minDomain = autoMinValue ? "auto" : minValue ?? 0;
 const maxDomain = maxValue ?? "auto";
 return [minDomain, maxDomain];
};

export default function AreaChart({ data = [], categories = [], index, stack = false, valueFormatter = (value) => value, startEndOnly = false, showXAxis = true, showYAxis = true, yAxisWidth = 56, showAnimation = true, animationDuration = 900, showTooltip = true, showGridLines = true, showGradient = true, autoMinValue = false, curveType = "linear", minValue, maxValue, connectNulls = false, allowDecimals = true, noDataText, className, ...other }) {
 const yAxisDomain = getYAxisDomain(autoMinValue, minValue, maxValue);

 const categoryColors = categories.map((category) => {
  return `url(#${category.includes(" ") ? category.replace(" ", "-") : category})`;
 });

 return (
  <div className={twMerge("h-80 w-full", className)} {...other}>
   <ResponsiveContainer className="h-full w-full">
    {data?.length ? (
     <ReChartsAreaChart data={data}>
      {showGridLines ? <CartesianGrid className="stroke-gray-600 stroke-1" strokeDasharray="3 3" horizontal={true} vertical={false} /> : null}
      <XAxis hide={!showXAxis} dataKey={index} tick={{ transform: "translate(0, 6)" }} ticks={startEndOnly ? [data[0][index], data[data.length - 1][index]] : undefined} fill="" stroke="" className="fill-gray-600" interval="preserveStartEnd" tickLine={false} axisLine={false} padding={{ left: 10, right: 10 }} minTickGap={5} />
      <YAxis width={yAxisWidth} hide={!showYAxis} axisLine={false} tickLine={false} type="number" domain={yAxisDomain} tick={{ transform: "translate(-3, 0)" }} fill="" stroke="" className="fill-gray-600" tickFormatter={valueFormatter} allowDecimals={allowDecimals} />
      {showTooltip ? <Tooltip wrapperStyle={{ outline: "none" }} isAnimationActive={false} cursor={{ stroke: "#d1d5db", strokeWidth: 1 }} content={({ active, payload, label }) => <ChartTooltip active={active} payload={payload} label={label} categoryColors={categoryColors} valueFormatter={valueFormatter} />} position={{ y: 0 }} /> : null}
      {categories.map((category) => {
       return (
        <defs key={category}>
         {showGradient ? (
          <linearGradient className={"text-accent-primary"} id={category.includes(" ") ? category.replace(" ", "-") : category} x1="0" y1="0" x2="0" y2="1">
           <stop offset="5%" stopColor="currentColor" stopOpacity={0.4} />
           <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
          </linearGradient>
         ) : (
          <linearGradient className={"text-accent-primary"} id={category.includes(" ") ? category.replace(" ", "-") : category} x1="0" y1="0" x2="0" y2="1">
           <stop stopColor="currentColor" stopOpacity={0.3} />
          </linearGradient>
         )}
        </defs>
       );
      })}
      {categories.map((category) => (
       <Area
        className="fill-accent-primary stroke-accent-primary"
        activeDot={{
         className: "stroke-accent-primary fill-accent-primary",
        }}
        dot={false}
        key={category}
        name={category}
        type={curveType}
        dataKey={category}
        stroke=""
        fill={`url(#${category.includes(" ") ? category.replace(" ", "-") : category})`}
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
        isAnimationActive={showAnimation}
        animationDuration={animationDuration}
        stackId={stack ? "a" : undefined}
        connectNulls={connectNulls}
       />
      ))}
     </ReChartsAreaChart>
    ) : (
     <p>{noDataText ?? "No data"}</p>
    )}
   </ResponsiveContainer>
  </div>
 );
}

const ChartTooltip = ({ active, payload, label, categoryColors, valueFormatter }) => {
 if (active && payload && categoryColors) {
  return (
   <div className="rounded-lg border border-neutral-800 bg-background-secondary text-white shadow-lg">
    <div className="border-b border-neutral-800 px-4 py-2">
     <p className="font-medium text-white">{label}</p>
    </div>
    <div className="space-y-1 px-4 py-2">
     {payload.map(({ value, name }, idx) => (
      <div key={`id-${idx}`} className="flex items-center justify-between space-x-2">
       <div className="flex items-center space-x-2">
        {categoryColors[idx + "e"] ? <span className="h-4 w-4 shrink-0 rounded-full border border-neutral-800 shadow-md" style={{ backgroundColor: categoryColors[idx] }} /> : <span className="h-4 w-4 shrink-0 rounded-full border border-neutral-800 bg-accent-primary shadow-md" />}
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
