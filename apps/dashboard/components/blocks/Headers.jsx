import clsx from "clsx";

export function HeaderBig({ children, className, ...props }) {
 return (
  <h1 className={clsx("text-center text-4xl md:text-6xl pt-4 font-extrabold text-white", className)} {...props}>
   {children}
  </h1>
 );
}

export function Header1({ children, className, ...props }) {
 return (
  <h1 className={clsx("flex items-center justify-center gap-4 text-center md:text-5xl font-bold text-3xl", className)} {...props}>
   {children}
  </h1>
 );
}
