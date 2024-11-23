import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export const Dots = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
 <div className={twMerge("mx-4 flex flex-row items-center gap-2", className)} {...props} ref={ref}>
  {[...Array(3)].map((_, i) => (
   // eslint-disable-next-line @eslint-react/no-array-index-key
   <div key={`dots-${i}`} className="size-2 shrink-0 animate-[loader_1s_ease-in-out_infinite] rounded-full bg-gray-400" style={{ animationDelay: `${150 * i - 50}ms` }} />
  ))}
 </div>
));

export const Typing = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
 <div className={twMerge("mx-4 flex flex-row items-center gap-2", className)} {...props} ref={ref}>
  {[...Array(3)].map((_, i) => (
   // eslint-disable-next-line @eslint-react/no-array-index-key
   <div key={`typing-${i}`} className="size-2 shrink-0 animate-[blinking_1s_ease-in-out_infinite] rounded-full bg-gray-400" style={{ animationDelay: `${150 * i - 50}ms` }} />
  ))}
 </div>
));
