import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export const Skeleton = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={twMerge("relative bg-background-secondary overflow-hidden rounded-md border border-neutral-800 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent", className)} {...props} />);

/**
 * @deprecated Use `Skeleton` instead.
 */
export function GraphSkeleton({ className }) {
 return <div className={twMerge(className, "bg-background-menu-button relative isolate h-80 w-full overflow-hidden rounded-md border border-neutral-800 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent")} />;
}

/**
 * @deprecated Use `Skeleton` instead.
 */
export function TextSkeleton({ className, ...otherProps }) {
 return <div className={twMerge(className, "bg-background-menu-button relative isolate h-6 min-h-6 max-w-[20rem] overflow-hidden rounded-md border border-neutral-800 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent")} {...otherProps} />;
}

/**
 * @deprecated Use `Skeleton` instead.
 */
export function InputSkeleton({ className }) {
 return <div className={twMerge(className, "bg-background-menu-button relative isolate h-10 w-full max-w-[20rem] overflow-hidden rounded-md border border-neutral-800 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent")} />;
}

/**
 * @deprecated Use `Skeleton` instead.
 */
export function EmbedSkeleton({ className }) {
 return <div className={twMerge(className, "relative isolate h-96 w-full overflow-hidden rounded-md border border-neutral-800 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent")} />;
}

/**
 * @deprecated Use `Skeleton` instead.
 */
export function AvatarSkeleton({ className }) {
 return <div className={twMerge(className, "bg-background-menu-button relative isolate h-16 min-h-16 w-16 min-w-16 overflow-hidden rounded-full border border-neutral-800 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent")} />;
}

/**
 * @deprecated Use `Skeleton` instead.
 */
export function ButtonSkeleton({ className }) {
 return <div className={twMerge(className, "bg-background-menu-button relative isolate h-10 w-32 overflow-hidden rounded-md border border-neutral-800 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent")} />;
}
