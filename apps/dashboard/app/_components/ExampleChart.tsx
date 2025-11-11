"use client";

import { pseudoRandom } from "@majoexe/util/functions/util";
import React from "react";
import { Suspense } from "react";
import { Area, AreaChart } from "recharts";
import { ChartContainer } from "@/components/ui/Chart";

export const ExampleChart = () => {
  const data = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - i * 86400000).toISOString().split("T")[0],
    Joins: Math.floor(pseudoRandom(i / 1.33)),
  }));

  return (
    <Suspense fallback={<div className="h-56 w-full rounded-xl border border-neutral-800 bg-background-secondary" />}>
      <ChartContainer config={{ Joins: { label: "Joins", color: "hsl(var(--chart-blue))" } }} className="aspect-auto h-80 w-full absolute inset-x-0 bottom-0 scale-105">
        <AreaChart accessibilityLayer data={data}>
          <defs>
            <linearGradient id="fill-joins" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-blue))" stopOpacity={0.4} />
              <stop offset="95%" stopColor="hsl(var(--chart-blue))" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <Area
            strokeLinejoin="round"
            strokeLinecap="round"
            key="Joins"
            dataKey="Joins"
            type="monotoneX"
            fill="url(#fill-joins)"
            stroke="hsl(var(--chart-blue))"
            strokeWidth={2}
            stackId="stack-joins"
          />
        </AreaChart>
      </ChartContainer>
    </Suspense>
  );
};
