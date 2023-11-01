import Link from "next/link";
import { twMerge } from "tailwind-merge";

export function RedButton({ children, ...props }) {
 if (props && props.href) {
  return (
   <Link {...props} className={twMerge(props.className, "flex cursor-pointer items-center rounded bg-red-400/20 px-4 py-2 leading-6 text-red-400 duration-200 hover:bg-red-400/50 disabled:cursor-not-allowed disabled:bg-red-400/10 motion-reduce:transition-none")}>
    {children}
   </Link>
  );
 } else {
  return (
   <button {...props} className={twMerge(props.className, "flex cursor-pointer items-center rounded bg-red-400/20 px-4 py-2 leading-6 text-red-400 duration-200 hover:bg-red-400/50 disabled:cursor-not-allowed disabled:bg-red-400/10 motion-reduce:transition-none")}>
    {children}
   </button>
  );
 }
}
