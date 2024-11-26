import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

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

export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>>(({ className, variant, ...props }, ref) => (
 <button ref={ref} className={cn(buttonVariants({ variant }), className)} {...props}>
  {props.children}
 </button>
));
