import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Skeleton = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn("bg-background-secondary relative overflow-hidden rounded-md border border-neutral-800 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent", className)} {...props} />);
