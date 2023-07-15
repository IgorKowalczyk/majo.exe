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

export function Header2({ children, className, ...props }) {
 return (
  <h2 className={clsx("flex items-center justify-center gap-4 text-center text-2xl font-bold md:text-4xl", className)} {...props}>
   {children}
  </h2>
 );
}

export function Header3({ children, className, ...props }) {
 return (
  <h3 className={clsx("flex items-center justify-center gap-4 text-center text-xl font-bold md:text-3xl", className)} {...props}>
   {children}
  </h3>
 );
}

export function Header4({ children, className, ...props }) {
 return (
  <h4 className={clsx("flex items-center justify-center gap-4 text-center text-lg font-bold md:text-2xl", className)} {...props}>
   {children}
  </h4>
 );
}

export function Header5({ children, className, ...props }) {
 return (
  <h5 className={clsx("flex items-center justify-center gap-4 text-center text-base font-bold md:text-xl", className)} {...props}>
   {children}
  </h5>
 );
}
