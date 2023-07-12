import clsx from "clsx";
import Link from "next/link";

export function PrimaryButton({ children, ...props }) {
 if (props && props.href) {
  return (
   <Link {...props} className={clsx(props.className, "flex cursor-pointer items-center rounded bg-button-primary px-4 py-2 leading-6 text-white duration-200 hover:bg-button-primary-hover disabled:cursor-not-allowed disabled:bg-button-primary/50 disabled:hover:bg-button-primary-hover/50 motion-reduce:transition-none")}>
    {children}
   </Link>
  );
 } else {
  return (
   <button {...props} className={clsx(props.className, "flex cursor-pointer items-center rounded bg-button-primary px-4 py-2 leading-6 text-white duration-200 hover:bg-button-primary-hover disabled:cursor-not-allowed disabled:bg-button-primary/50 disabled:hover:bg-button-primary-hover/50 motion-reduce:transition-none")}>
    {children}
   </button>
  );
 }
}

export function PrimaryDiscordButton({ children, ...props }) {
 if (props && props.href) {
  return (
   <Link {...props} className={clsx(props.className, "flex cursor-pointer items-center rounded bg-[#5964f2] px-4 py-1 leading-6  text-white duration-200 hover:bg-[#4753c5] disabled:cursor-not-allowed disabled:bg-[#5964f2]/50 disabled:hover:bg-[#4753c5] motion-reduce:transition-none")}>
    {children}
   </Link>
  );
 } else {
  return (
   <button {...props} className={clsx(props.className, "flex cursor-pointer items-center rounded bg-[#5964f2] px-4 py-1 leading-6 text-white duration-200 hover:bg-[#4753c5] disabled:cursor-not-allowed disabled:bg-[#5964f2]/50 disabled:hover:bg-[#4753c5] motion-reduce:transition-none")}>
    {children}
   </button>
  );
 }
}
