import React from "react";
import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
 return <div data-slot="skeleton" className={cn("bg-background-secondary relative overflow-hidden rounded-xl border border-neutral-800 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-linear-to-r before:from-transparent before:via-white/10 before:to-transparent", className)} {...props} />;
}
