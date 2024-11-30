import { cva, VariantProps } from "class-variance-authority";
import React, { HTMLAttributes } from "react";
import Header, { headerVariants } from "@/components/ui/Headers";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export const blockVariants = cva("hide-scrollbar overflow-x-scroll rounded-md border bg-background-secondary p-6", {
 variants: {
  theme: {
   normal: "border-neutral-800",
   danger: "border-red-400/50",
  },
 },
 defaultVariants: {
  theme: "normal",
 },
});

export const Block = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & VariantProps<typeof blockVariants>>(({ children, theme, className, ...props }, ref) => (
 <div {...props} className={cn(blockVariants({ theme }), className)} ref={ref}>
  {children}
 </div>
));

interface ErrorBlockProps extends HTMLAttributes<HTMLDivElement> {
 title: string;
 description: string;
}

export const ErrorBlock = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & ErrorBlockProps>(({ title, description, ...props }, ref) => (
 <Block {...props} ref={ref}>
  <Header className={cn(headerVariants({ variant: "h3", margin: "normal" }), "text-red-400")}>
   <Icons.warning className={iconVariants({ variant: "large" })} />
   {title}
  </Header>
  <p>{description}</p>
 </Block>
));
