import React, { HTMLAttributes } from "react";
import Header, { headerVariants } from "@/components/ui/Headers";
import { cn } from "@/lib/utils";

interface GraphCardProps extends HTMLAttributes<HTMLDivElement> {
 title: string;
 description: string;
 value: string;
 icon: React.ReactNode;
 graph: React.ReactNode;
}

export const GraphCard = ({ title, description, value, icon, graph, className, ...props }: GraphCardProps) => (
 <div className={cn("bg-background-secondary mt-4 overflow-auto rounded-xl border border-neutral-800 p-4", className)} {...props}>
  <div className="flex flex-row items-center justify-between">
   <div className="flex flex-row items-center gap-4">
    {icon}
    <div className="flex flex-col">
     <Header className={cn(headerVariants({ variant: "h4" }), "justify-start whitespace-nowrap")}>{title}</Header>
     <p className="text-sm text-gray-400">{description}</p>
    </div>
   </div>
   <div className="flex flex-row items-center gap-4">
    {parseInt(value) > 0 ? (
     <p className="flex gap-2 rounded-full border border-accent-primary/50 bg-accent-primary/20 px-2 py-1 text-sm font-bold text-accent-primary">
      +{value} {graph}
     </p>
    ) : parseInt(value) < 0 ? (
     <p className="flex gap-2 rounded-full border border-red-400/50 bg-red-400/30 px-2 py-1 text-sm font-bold text-red-400">
      -{value} {graph}
     </p>
    ) : (
     <p className="flex gap-2 rounded-full border border-white/50 bg-white/20 px-2 py-1 text-sm font-bold text-white">
      {value} {graph}
     </p>
    )}
   </div>
  </div>
 </div>
);
