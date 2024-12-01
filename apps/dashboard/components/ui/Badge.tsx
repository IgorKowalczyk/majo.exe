import React from "react";
import { cn } from "@/lib/utils";

export const Badge = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, children, ...props }, ref) => (
 <div ref={ref} className={cn("bg-button-primary rounded-md px-1 py-px pb-0 text-xs uppercase", className)} {...props}>
  {children}
 </div>
));
