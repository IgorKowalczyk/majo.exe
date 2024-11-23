import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { cva, VariantProps } from "class-variance-authority";
import React, { HTMLAttributes } from "react";

export const buttonVariants = cva("flex cursor-pointer items-center rounded-md px-4 py-2 leading-6 text-white duration-200 motion-reduce:transition-none disabled:cursor-not-allowed", {
 variants: {
  variant: {
   primary: "bg-button-primary hover:bg-button-primary-hover disabled:bg-button-primary/50 disabled:hover:bg-button-primary-hover/50",
   secondary: "bg-button-secondary hover:bg-button-secondary-hover disabled:bg-button-secondary/30 hover:disabled:bg-button-secondary-hover/40",
   red: "bg-red-400/20 hover:bg-red-400/50 disabled:bg-red-400/10",
   discord: "bg-[#5964f2] hover:bg-[#4753c5] disabled:bg-[#5964f2]/50 disabled:hover:bg-[#4753c5]",
  },
 },
 defaultVariants: {
  variant: "primary",
 },
});

export const Button = React.forwardRef<HTMLButtonElement, HTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>>(({ className, variant, ...props }, ref) => (
 <button ref={ref} className={twMerge(buttonVariants({ variant }), className)} {...props}>
  {props.children}
 </button>
));

// ===================

/**
 * @deprecated Use `Button` instead.
 */
export function ButtonPrimary({ children, type = "default", ...props }) {
 if (type === "default") {
  if (props && props.href) {
   return (
    <Link {...props} className={twMerge(props.className, "bg-button-primary hover:bg-button-primary-hover disabled:bg-button-primary/50 disabled:hover:bg-button-primary-hover/50 flex cursor-pointer items-center rounded-md px-4 py-2 leading-6 text-white duration-200 disabled:cursor-not-allowed motion-reduce:transition-none")}>
     {children}
    </Link>
   );
  } else {
   return (
    <button {...props} className={twMerge(props.className, "bg-button-primary hover:bg-button-primary-hover disabled:bg-button-primary/50 disabled:hover:bg-button-primary-hover/50 flex cursor-pointer items-center rounded-md px-4 py-2 leading-6 text-white duration-200 disabled:cursor-not-allowed motion-reduce:transition-none")} type="button">
     {children}
    </button>
   );
  }
 } else if (type === "discord") {
  if (props && props.href) {
   return (
    <Link {...props} className={twMerge(props.className, "flex cursor-pointer items-center rounded-md bg-[#5964f2] px-4 py-1 leading-6 text-white duration-200 hover:bg-[#4753c5] disabled:cursor-not-allowed disabled:bg-[#5964f2]/50 disabled:hover:bg-[#4753c5] motion-reduce:transition-none")}>
     {children}
    </Link>
   );
  } else {
   return (
    <button {...props} className={twMerge(props.className, "flex cursor-pointer items-center rounded-md bg-[#5964f2] px-4 py-1 leading-6 text-white duration-200 hover:bg-[#4753c5] disabled:cursor-not-allowed disabled:bg-[#5964f2]/50 disabled:hover:bg-[#4753c5] motion-reduce:transition-none")} type="button">
     {children}
    </button>
   );
  }
 }
}

/**
 * @deprecated Use `Button` instead.
 */
export function ButtonSecondary({ children, type = "default", ...props }) {
 if (type === "default") {
  if (props && props.href) {
   return (
    <Link {...props} className={twMerge(props.className, "bg-button-secondary hover:bg-button-secondary-hover disabled:bg-button-secondary/30 hover:disabled:bg-button-secondary-hover/40 flex cursor-pointer items-center rounded-md px-4 py-2 leading-6 text-white duration-200 disabled:cursor-not-allowed motion-reduce:transition-none")}>
     {children}
    </Link>
   );
  } else {
   return (
    <button {...props} className={twMerge(props.className, "bg-button-secondary hover:bg-button-secondary-hover disabled:bg-button-secondary/30 hover:disabled:bg-button-secondary-hover/40 flex cursor-pointer items-center rounded-md px-4 py-2 leading-6 text-white duration-200 disabled:cursor-not-allowed motion-reduce:transition-none")} type="button">
     {children}
    </button>
   );
  }
 } else if (type === "discord") {
  if (props && props.href) {
   return (
    <Link {...props} className={twMerge(props.className, "flex cursor-pointer items-center rounded-md bg-[#4e5058] px-4 py-1 leading-6 text-white duration-200 hover:bg-[#6c6f79] disabled:cursor-not-allowed disabled:bg-[#4e5058]/50 disabled:hover:bg-[#6c6f79]/50 motion-reduce:transition-none")}>
     {children}
    </Link>
   );
  } else {
   return (
    <button {...props} className={twMerge(props.className, "flex cursor-pointer items-center rounded-md bg-[#4e5058] px-4 py-1 leading-6 text-white duration-200 hover:bg-[#6c6f79] disabled:cursor-not-allowed disabled:bg-[#4e5058]/50 disabled:hover:bg-[#6c6f79]/50 motion-reduce:transition-none")} type="button">
     {children}
    </button>
   );
  }
 }
}

/**
 * @deprecated Use `Button` instead.
 */
export function RedButton({ children, ...props }) {
 if (props && props.href) {
  return (
   <Link {...props} className={twMerge(props.className, "flex cursor-pointer items-center rounded-md bg-red-400/20 px-4 py-2 leading-6 text-red-400 duration-200 hover:bg-red-400/50 disabled:cursor-not-allowed disabled:bg-red-400/10 motion-reduce:transition-none")}>
    {children}
   </Link>
  );
 } else {
  return (
   <button {...props} className={twMerge(props.className, "flex cursor-pointer items-center rounded-md bg-red-400/20 px-4 py-2 leading-6 text-red-400 duration-200 hover:bg-red-400/50 disabled:cursor-not-allowed disabled:bg-red-400/10 motion-reduce:transition-none")} type="button">
    {children}
   </button>
  );
 }
}
