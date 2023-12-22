import { twMerge } from "tailwind-merge";

export function Block({ children, theme = "normal", ...props }) {
 return (
  <div
   {...props}
   className={twMerge(
    // prettier
    props.className,
    theme === "normal" && "border-neutral-800",
    theme === "danger" && "border-red-400/50",
    "bg-background-secondary hide-scrollbar overflow-x-scroll rounded-md border p-6"
   )}
  >
   {children}
  </div>
 );
}
