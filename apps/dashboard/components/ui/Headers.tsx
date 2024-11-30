import { cva, type VariantProps } from "class-variance-authority";
import React, { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const headerVariants = cva("flex items-center font-bold", {
 variants: {
  variant: {
   big: "text-3xl font-extrabold md:text-5xl xl:!text-4xl 2xl:!text-6xl",
   medium: "text-3xl font-black md:text-4xl",
   gradient: "text-xl font-black md:text-2xl",
   h1: "text-3xl",
   h2: "text-2xl",
   h3: "text-xl",
   h4: "text-lg md:text-xl",
   h5: "text-base font-medium md:text-lg",
  },
  effects: {
   gradient: "bg-gradient-to-b from-white to-neutral-400 box-decoration-clone bg-clip-text font-black text-fill-transparent",
  },
  alignment: {
   center: "justify-center text-center",
   left: "justify-start text-left",
  },
  margin: {
   normal: "mb-2",
   wide: "mb-4",
  },
  spacing: {
   normal: "gap-2",
   wide: "gap-4",
  },
 },
 defaultVariants: {
  variant: "h1",
  alignment: "left",
  spacing: "normal",
 },
});

const Header = React.forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement> & VariantProps<typeof headerVariants>>(({ className, variant, ...props }, ref) => (
 <h1 ref={ref} className={cn(headerVariants({ variant }), className)} {...props}>
  {props.children}
 </h1>
));

export default Header;

// ======================================================================

interface LegacyHeaderProps extends HTMLAttributes<HTMLHeadingElement> {
 children: ReactNode;
 className?: string;
}

/**
 * @deprecated Use `Header` instead.
 */
export function Header2({ children, className, ...props }: LegacyHeaderProps) {
 return (
  <h2 className={cn("mb-1 flex items-center justify-start gap-2 text-left text-2xl font-bold", className)} {...props}>
   {children}
  </h2>
 );
}

/**
 * @deprecated Use `Header` instead.
 */
export function Header3({ children, className, ...props }: LegacyHeaderProps) {
 return (
  <h3 className={cn("mb-1 flex items-center gap-2 text-center text-xl font-bold", className)} {...props}>
   {children}
  </h3>
 );
}

/**
 * @deprecated Use `Header` instead.
 */
export function Header4({ children, className, ...props }: LegacyHeaderProps) {
 return (
  <h4 className={cn(className, "flex items-center gap-4 text-center text-lg font-bold md:text-xl")} {...props}>
   {children}
  </h4>
 );
}
