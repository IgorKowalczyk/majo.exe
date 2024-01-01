import { twMerge } from "tailwind-merge";

export function Block({ children, theme = "normal", ...props }) {
 return (
  <div
   {...props}
   className={twMerge(
    // prettier
    theme === "normal" && "border-neutral-800",
    theme === "danger" && "border-red-400/50",
    "bg-background-secondary hide-scrollbar overflow-x-scroll rounded-md border p-6",
    props.className
   )}
  >
   {children}
  </div>
 );
}
