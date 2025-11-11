import React from "react";
import { cn } from "@/lib/utils";

export const Badge = ({ className, children, ...props }: React.ComponentProps<"div">) => (
  <div className={cn("bg-button-primary rounded-md px-1 py-px pb-0 text-xs uppercase", className)} {...props}>
    {children}
  </div>
);
