import clsx from "clsx";

export function HeaderBig({ children, className, ...props }) {
 return (
  <h1 className={clsx("pt-4 text-center text-4xl font-extrabold text-white md:text-6xl", className)} {...props}>
   {children}
  </h1>
 );
}

export function Header1({ children, className, ...props }) {
 return (
  <h1 className={clsx("flex items-center justify-center gap-4 text-center text-3xl font-bold md:text-5xl", className)} {...props}>
   {children}
  </h1>
 );
}
