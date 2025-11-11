"use client";

import React from "react";
import { Area, AreaChart as ReChartsAreaChart, ResponsiveContainer, XAxis } from "recharts";
import { Icons, iconVariants } from "@/components/ui/Icons";

export interface SparkLineChartProps {
  data: Record<string, number>[];
  categories: string[];
  index: string;
}

export function SparkLineChart({ data, categories, index }: SparkLineChartProps) {
  return (
    <div className="h-10 w-36">
      <ResponsiveContainer className="size-full">
        {data.length ? (
          <ReChartsAreaChart data={data}>
            <XAxis hide dataKey={index} />
            {categories.map((category) => (
              <defs key={category}>
                <linearGradient className="text-accent-primary" id={category.replace(/ /g, "-")} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="currentColor" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
                </linearGradient>
              </defs>
            ))}
            {categories.map((category) => (
              <Area
                className="fill-accent-primary stroke-accent-primary"
                strokeOpacity={1}
                dot={false}
                key={category}
                name={category}
                type="monotone"
                dataKey={category}
                stroke=""
                strokeWidth={2}
                fill={`url(#${category.replace(/ /g, "-")})`}
                strokeLinejoin="round"
                strokeLinecap="round"
                isAnimationActive={true}
                animationDuration={900}
                connectNulls={false}
              />
            ))}
          </ReChartsAreaChart>
        ) : (
          <div className="mb-4 flex items-center justify-start gap-2 text-left text-red-400">
            <Icons.warning className={iconVariants({ variant: "normal" })} />
            <span>No data found.</span>
          </div>
        )}
      </ResponsiveContainer>
    </div>
  );
}
