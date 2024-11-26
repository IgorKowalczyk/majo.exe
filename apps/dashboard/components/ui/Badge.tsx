import { cn } from "@/lib/utils";
import React from "react";

export const Badge = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, children, ...props }, ref) => (
 <div ref={ref} className={cn("rounded-md bg-button-primary px-1 py-px pb-0 text-xs uppercase", className)} {...props}>
  {children}
 </div>
));
