import Link from "next/link";
import { twMerge } from "tailwind-merge";

export function SecondaryButton({ children, ...props }) {
 if (props && props.href) {
  return (
   <Link {...props} className={twMerge(props.className, "bg-button-secondary hover:bg-button-secondary-hover disabled:bg-button-secondary/30 hover:disabled:bg-button-secondary-hover/40 flex cursor-pointer items-center rounded px-4 py-2 leading-6 text-white duration-200 disabled:cursor-not-allowed motion-reduce:transition-none")}>
    {children}
   </Link>
  );
 } else {
  return (
   <button {...props} className={twMerge(props.className, "bg-button-secondary hover:bg-button-secondary-hover disabled:bg-button-secondary/30 hover:disabled:bg-button-secondary-hover/40 flex cursor-pointer items-center rounded px-4 py-2 leading-6 text-white duration-200 disabled:cursor-not-allowed motion-reduce:transition-none")}>
    {children}
   </button>
  );
 }
}

export function SecondaryDiscordButton({ children, ...props }) {
 if (props && props.href) {
  return (
   <Link {...props} className={twMerge(props.className, "flex cursor-pointer items-center rounded bg-[#4e5058] px-4 py-1 leading-6 text-white duration-200 hover:bg-[#6c6f79] disabled:cursor-not-allowed disabled:bg-[#4e5058]/50 disabled:hover:bg-[#6c6f79]/50 motion-reduce:transition-none")}>
    {children}
   </Link>
  );
 } else {
  return (
   <button {...props} className={twMerge(props.className, "flex cursor-pointer items-center rounded bg-[#4e5058] px-4 py-1 leading-6 text-white duration-200 hover:bg-[#6c6f79] disabled:cursor-not-allowed disabled:bg-[#4e5058]/50 disabled:hover:bg-[#6c6f79]/50 motion-reduce:transition-none")}>
    {children}
   </button>
  );
 }
}
