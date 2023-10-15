import { twMerge } from "tailwind-merge";

export function GraphSkeleton({ className }) {
 return (
  <div className="flex flex-col items-center justify-center">
   <div className={twMerge(className, "relative isolate h-80 w-full overflow-hidden rounded-md border border-neutral-900 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent")} />
  </div>
 );
}

export function TextSkeleton({ className, ...otherProps }) {
 return <div className={twMerge(className, "relative isolate h-6 min-h-[24px] max-w-[20rem] overflow-hidden rounded-md border border-neutral-900 bg-neutral-500/40  before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent")} {...otherProps} />;
}

export function InputSkeleton({ className }) {
 return <div className={twMerge(className, "relative isolate h-10 w-full max-w-[20rem] overflow-hidden rounded-md border border-neutral-900 bg-neutral-500/40  before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent")} />;
}

export function EmbedSkeleton({ className }) {
 return <div className={twMerge(className, "relative isolate h-96 w-full overflow-hidden rounded-md border border-neutral-900 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent")} />;
}

export function AvatarSkeleton({ className }) {
 return <div className={twMerge(className, "relative isolate h-16 min-h-[4rem] w-16 min-w-[4rem] overflow-hidden rounded-full border border-neutral-900 bg-neutral-500/40 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent")} />;
}

export function ButtonSkeleton({ className }) {
 return <div className={twMerge(className, "relative isolate h-10 w-32 overflow-hidden rounded-md border border-neutral-900 bg-neutral-500/40  before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent")} />;
}
