import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva("flex cursor-pointer items-center rounded-lg px-4 py-2 leading-6 text-white duration-200 disabled:cursor-not-allowed motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary ", {
 variants: {
  variant: {
   primary: "bg-button-primary hover:bg-button-primary-hover disabled:bg-button-primary/50 disabled:hover:bg-button-primary-hover/50",
   secondary: "bg-button-secondary border border-neutral-700/80 hover:bg-button-secondary-hover disabled:bg-button-secondary/30 hover:border-neutral-600 disabled:text-neutral-400/60 hover:disabled:bg-button-secondary-hover/20",
   red: "bg-button-secondary border border-neutral-700/80 hover:bg-button-secondary-hover disabled:bg-button-secondary/30 hover:border-neutral-600 hover:disabled:bg-button-secondary-hover/40 text-red-400 disabled:text-red-400/50",
   discord: "bg-[#5964f2] hover:bg-[#4753c5] disabled:bg-[#5964f2]/50 disabled:hover:bg-[#4753c5]",
   select: "hover:bg-background-menu-button focus:bg-background-menu-button focus:border-neutral-700 data-[state=open]:border-neutral-700 data-[state=open]:bg-background-menu-button border border-neutral-800 px-3 py-2 gap-3 text-sm font-normal duration-200 hover:border-neutral-700 motion-reduce:transition-none sm:text-sm",
  },
 },
 defaultVariants: {
  variant: "primary",
 },
});

export const Button = ({ className, variant, ...props }: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) => (
 <button className={cn(buttonVariants({ variant }), className)} {...props} type={props.type ?? "button"}>
  {props.children}
 </button>
);
