"use client";

import { globalConfig } from "@majoexe/config";
import React from "react";
import { Area, AreaProps, CartesianGrid, AreaChart as ReChartsAreaChart, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

interface ChartTooltipProps extends TooltipProps<any, any> {
 categoryColors: string[];
 valueFormatter: (value: number) => string;
}

const ChartTooltip: React.FC<ChartTooltipProps> = ({ categoryColors, valueFormatter, ...props }) => {
 if (!props.active || !props.payload || !categoryColors) return null;

 return (
  <div className="rounded-lg border border-neutral-800 bg-background-secondary text-white shadow-lg">
   <div className="border-b border-neutral-800 px-4 py-2">
    <p className="font-medium text-white">{props.label}</p>
   </div>
   <div className="space-y-1 px-4 py-2">
    {props.payload.map(({ value, name }) => (
     <div key={`chart-tooltip-${name}-${value}`} className="flex items-center justify-between space-x-2">
      <div className="flex items-center space-x-2">
       <span className="size-4 shrink-0 rounded-full border border-neutral-800 bg-accent-primary shadow-md" />
       <p className="whitespace-nowrap text-right text-white">{name}</p>
      </div>
      <p className="whitespace-nowrap text-right font-medium tabular-nums text-white">{valueFormatter(value)}</p>
     </div>
    ))}
   </div>
  </div>
 );
};

export interface AreaChartProps extends AreaProps {
 data?: any[];
 categories?: string[];
 noDataText?: string;
 className?: string;
 showGrid?: boolean;
 showXAxis?: boolean;
 showYAxis?: boolean;
 yAxisWidth?: number;
 autoMinValue?: boolean;
 minValue?: number;
 maxValue?: number;
 valueFormatter?: (value: number) => string;
}

export const AreaChart = React.forwardRef<ReturnType<typeof ReChartsAreaChart>, AreaChartProps>(({ data, categories, noDataText = "No data", className, ...props }, ref) => {
 if (!categories) return null;

 const yAxisDomain: [number | string, number | string] = props.autoMinValue ? [0, "auto"] : [props.minValue ?? 0, props.maxValue ?? "auto"];

 const categoryColors = categories.map((category) => {
  return `url(#${category.replace(/ /g, "-")})`;
 });

 const valueFormatter = (value: number) => (props.valueFormatter ? props.valueFormatter(value) : value.toString());

 return (
  <div className={cn("h-80 w-full", className)} ref={ref as React.Ref<HTMLDivElement>}>
   <ResponsiveContainer className="size-full">
    {data && data.length > 0 ? (
     <ReChartsAreaChart data={data}>
      {props.showGrid && <CartesianGrid className="stroke-gray-600 stroke-1" strokeDasharray="3 3" horizontal={true} vertical={false} />}

      <XAxis hide={!props.showXAxis} dataKey={props.dataKey} tick={{ transform: "translate(0, 6)" }} className="fill-gray-600" interval="preserveStartEnd" tickLine={false} axisLine={false} padding={{ left: 10, right: 10 }} minTickGap={5} />

      <YAxis width={props.yAxisWidth} hide={!props.showYAxis} axisLine={false} tickLine={false} type="number" domain={yAxisDomain} tick={{ transform: "translate(-3, 0)" }} fill="" stroke="" className="fill-gray-600" tickFormatter={valueFormatter} allowDecimals={false} />

      <Tooltip wrapperStyle={{ outline: "none" }} isAnimationActive={true} animationDuration={500} cursor={{ stroke: globalConfig.defaultColor, strokeWidth: 1 }} content={({ ...props }) => <ChartTooltip {...props} categoryColors={categoryColors} valueFormatter={valueFormatter} />} position={{ y: 0 }} />

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
        stroke=""
        fill={`url(#${category.replace(/ /g, "-")})`}
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
        isAnimationActive={true}
        animationDuration={1500}
        {...props}
        dataKey={category}
       />
      ))}
     </ReChartsAreaChart>
    ) : (
     <p className="mb-4 flex items-center justify-start gap-2 text-left text-red-400">
      <Icons.warning className={iconVariants({ variant: "large", className: "mr-2 !stroke-2" })} />
      {noDataText}
     </p>
    )}
   </ResponsiveContainer>
  </div>
 );
});
