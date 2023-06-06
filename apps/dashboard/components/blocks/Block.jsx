import clsx from "clsx";

export function Block({ children, ...props }) {
 return (
  <div {...props} className={clsx(props.className, "bg-background-secondary p-6 rounded-md border border-neutral-800")}>
   {children}
  </div>
 );
}

export function CodeCard({ children, ...props }) {
 return (
  <div {...props} className={clsx(props.className, "bg-background-secondary inline-block px-2 py-1 rounded-md border border-neutral-800")}>
   {children}
  </div>
 );
}
