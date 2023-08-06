import { twMerge } from "tailwind-merge";

export function HeaderBig({ children, className, ...props }) {
 return (
  <h1 className={twMerge("pt-4 text-center text-4xl font-extrabold text-white md:text-6xl", className)} {...props}>
   {children}
  </h1>
 );
}

export function Header1({ children, className, ...props }) {
 return (
  <h1 className={twMerge("mb-4 flex items-center justify-start gap-4 text-left text-3xl font-bold md:text-5xl", className)} {...props}>
   {children}
  </h1>
 );
}

export function Header2({ children, className, ...props }) {
 return (
  <h2 className={twMerge("flex items-center justify-center gap-4 text-center text-2xl font-bold md:text-4xl", className)} {...props}>
   {children}
  </h2>
 );
}

export function Header3({ children, className, ...props }) {
 return (
  <h3 className={twMerge("flex items-center justify-center gap-4 text-center text-xl font-bold md:text-3xl", className)} {...props}>
   {children}
  </h3>
 );
}

export function Header4({ children, className, ...props }) {
 return (
  <h4 className={twMerge("flex items-center justify-center gap-4 text-center text-lg font-bold md:text-2xl", className)} {...props}>
   {children}
  </h4>
 );
}

export function Header5({ children, className, ...props }) {
 return (
  <h5 className={twMerge("flex items-center justify-center gap-4 text-center text-base font-bold md:text-xl", className)} {...props}>
   {children}
  </h5>
 );
}
