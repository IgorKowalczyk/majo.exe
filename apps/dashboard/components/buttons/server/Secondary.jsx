import clsx from "clsx";
import Link from "next/link";

export function SecondaryButton({ children, ...props }) {
 if (props && props.href) {
  return (
   <Link {...props} className={clsx(props.className, "flex cursor-pointer items-center rounded bg-button-secondary disabled:bg-button-secondary/50 hover:disabled:bg-button-secondary-hover/50 px-4 py-2 leading-6 text-white duration-200 hover:bg-button-secondary-hover motion-reduce:transition-none")}>
    {children}
   </Link>
  );
 } else {
  return (
   <button {...props} className={clsx(props.className, "flex cursor-pointer items-center rounded bg-button-secondary disabled:bg-button-secondary/50 hover:disabled:bg-button-secondary-hover/50 px-4 py-2 leading-6 text-white duration-200 hover:bg-button-secondary-hover motion-reduce:transition-none")}>
    {children}
   </button>
  );
 }
}

export function SecondaryDiscordButton({ children, ...props }) {
 if (props && props.href) {
  return (
   <Link {...props} className={clsx(props.className, "flex cursor-pointer items-center rounded bg-[#4e5058] disabled:bg-[#4e5058]/50 disabled:hover:bg-[#6c6f79]/50 px-4 py-1 leading-6 text-white duration-200 hover:bg-[#6c6f79] motion-reduce:transition-none")}>
    {children}
   </Link>
  );
 } else {
  return (
   <button {...props} className={clsx(props.className, "flex cursor-pointer items-center rounded bg-[#4e5058] disabled:bg-[#4e5058]/50 disabled:hover:bg-[#6c6f79]/50 px-4 py-1 leading-6 text-white duration-200 hover:bg-[#6c6f79] motion-reduce:transition-none")}>
    {children}
   </button>
  );
 }
}
