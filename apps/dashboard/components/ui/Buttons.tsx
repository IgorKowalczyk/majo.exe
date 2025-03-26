import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva("flex cursor-pointer items-center rounded-lg px-4 py-2 leading-6 text-white duration-200 disabled:cursor-not-allowed motion-reduce:transition-none", {
 variants: {
  variant: {
   primary: "bg-button-primary hover:bg-button-primary-hover disabled:bg-button-primary/50 disabled:hover:bg-button-primary-hover/50",
   secondary: "bg-button-secondary border border-neutral-700/80 hover:bg-button-secondary-hover disabled:bg-button-secondary/30 hover:border-neutral-600 hover:disabled:bg-button-secondary-hover/40",
   red: "bg-button-secondary border border-neutral-700/80 hover:bg-button-secondary-hover disabled:bg-button-secondary/30 hover:border-neutral-600 hover:disabled:bg-button-secondary-hover/40 text-red-400",
   discord: "bg-[#5964f2] hover:bg-[#4753c5] disabled:bg-[#5964f2]/50 disabled:hover:bg-[#4753c5]",
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
