import { twMerge } from "tailwind-merge";

export function Block({ children, ...props }) {
 return (
  <div {...props} className={twMerge(props.className, "bg-background-secondary hide-scrollbar overflow-x-scroll rounded-md border border-neutral-800 p-6")}>
   {children}
  </div>
 );
}
