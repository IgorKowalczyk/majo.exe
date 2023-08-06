import clsx from "clsx";

export function Block({ children, ...props }) {
 return (
  <div {...props} className={clsx(props.className, "rounded-md border border-neutral-800 bg-background-secondary p-6")}>
   {children}
  </div>
 );
}
