import { twMerge } from "tailwind-merge";
import { ReactNode, HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

interface HeaderProps extends HTMLAttributes<HTMLHeadingElement> {
 children: ReactNode;
 className?: string;
}

const headerVariants = cva("flex items-center font-bold", {
 variants: {
  size: {
   big: "text-4xl md:text-6xl font-extrabold",
   gradient: "text-xl md:text-2xl font-black",
   h1: "text-3xl",
   h2: "text-2xl",
   h3: "text-xl",
   h4: "text-lg md:text-xl",
   h5: "text-base md:text-lg font-medium",
  },
  alignment: {
   center: "text-center justify-center",
   left: "text-left justify-start",
  },
  spacing: {
   normal: "gap-2",
   wide: "gap-4",
  },
 },
 defaultVariants: {
  size: "h1",
  alignment: "left",
  spacing: "normal",
 },
});

export function HeaderBig({ children, className, ...props }: HeaderProps) {
 return (
  <h1 className={twMerge(className, "pt-4 text-center text-4xl font-extrabold text-white md:text-6xl")} {...props}>
   {children}
  </h1>
 );
}

export function GradientHeader({ children, className, ...props }: HeaderProps) {
 return (
  <h1 className={twMerge(className, "text-fill-transparent mb-0 flex items-center gap-4 bg-gradient-to-b from-white to-neutral-400 box-decoration-clone bg-clip-text text-left text-xl font-black md:text-2xl")} {...props}>
   {children}
  </h1>
 );
}

export function Header1({ children, className, ...props }: HeaderProps) {
 return (
  <h1 className={twMerge("mb-2 flex items-center justify-start gap-2 text-3xl font-bold", className)} {...props}>
   {children}
  </h1>
 );
}

export function Header2({ children, className, ...props }: HeaderProps) {
 return (
  <h2 className={twMerge("mb-1 flex items-center justify-start gap-2 text-left text-2xl font-bold", className)} {...props}>
   {children}
  </h2>
 );
}

export function Header3({ children, className, ...props }: HeaderProps) {
 return (
  <h3 className={twMerge("mb-1 flex items-center gap-2 text-center text-xl font-bold", className)} {...props}>
   {children}
  </h3>
 );
}

export function Header4({ children, className, ...props }: HeaderProps) {
 return (
  <h4 className={twMerge(className, "flex items-center gap-4 text-center text-lg font-bold md:text-xl")} {...props}>
   {children}
  </h4>
 );
}

export function Header5({ children, className, ...props }: HeaderProps) {
 return (
  <h5 className={twMerge(className, "flex items-center gap-4 text-center text-base font-medium md:text-lg")} {...props}>
   {children}
  </h5>
 );
}
