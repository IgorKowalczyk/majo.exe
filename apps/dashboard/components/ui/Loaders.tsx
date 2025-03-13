import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Dots = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
 <div className={cn("mx-4 flex flex-row items-center gap-2", className)} {...props}>
  {[...Array(3)].map((_, i) => (
   <div key={`dots-${i}`} className="size-2 shrink-0 animate-[loader_1s_ease-in-out_infinite] rounded-full bg-gray-400" style={{ animationDelay: `${150 * i - 50}ms` }} />
  ))}
 </div>
);

export const Typing = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
 <div className={cn("mx-4 flex flex-row items-center gap-2", className)} {...props}>
  {[...Array(3)].map((_, i) => (
   <div key={`typing-${i}`} className="size-2 shrink-0 animate-[blinking_1s_ease-in-out_infinite] rounded-full bg-gray-400" style={{ animationDelay: `${150 * i - 50}ms` }} />
  ))}
 </div>
);
