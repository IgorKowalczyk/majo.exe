import Link from "next/link";
import { twMerge } from "tailwind-merge";

export function PrimaryButton({ children, ...props }) {
 if (props && props.href) {
  return (
   <Link {...props} className={twMerge(props.className, "bg-button-primary hover:bg-button-primary-hover disabled:bg-button-primary/50 disabled:hover:bg-button-primary-hover/50 flex cursor-pointer items-center rounded px-4 py-2 leading-6 text-white duration-200 disabled:cursor-not-allowed motion-reduce:transition-none")}>
    {children}
   </Link>
  );
 } else {
  return (
   <button {...props} className={twMerge(props.className, "bg-button-primary hover:bg-button-primary-hover disabled:bg-button-primary/50 disabled:hover:bg-button-primary-hover/50 flex cursor-pointer items-center rounded px-4 py-2 leading-6 text-white duration-200 disabled:cursor-not-allowed motion-reduce:transition-none")}>
    {children}
   </button>
  );
 }
}

export function PrimaryDiscordButton({ children, ...props }) {
 if (props && props.href) {
  return (
   <Link {...props} className={twMerge(props.className, "flex cursor-pointer items-center rounded bg-[#5964f2] px-4 py-1 leading-6 text-white duration-200 hover:bg-[#4753c5] disabled:cursor-not-allowed disabled:bg-[#5964f2]/50 disabled:hover:bg-[#4753c5] motion-reduce:transition-none")}>
    {children}
   </Link>
  );
 } else {
  return (
   <button {...props} className={twMerge(props.className, "flex cursor-pointer items-center rounded bg-[#5964f2] px-4 py-1 leading-6 text-white duration-200 hover:bg-[#4753c5] disabled:cursor-not-allowed disabled:bg-[#5964f2]/50 disabled:hover:bg-[#4753c5] motion-reduce:transition-none")}>
    {children}
   </button>
  );
 }
}
