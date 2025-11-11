import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import Header, { headerVariants } from "@/components/ui/Headers";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export const blockVariants = cva("hide-scrollbar overflow-x-scroll rounded-xl border bg-background-secondary p-6", {
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

export const Block = ({ children, theme, className, ...props }: React.ComponentProps<"div"> & VariantProps<typeof blockVariants>) => (
  <div {...props} className={cn(blockVariants({ theme }), className)}>
    {children}
  </div>
);

interface ErrorBlockProps extends React.ComponentProps<"div"> {
  title: string;
  description: string;
}

export const ErrorBlock = ({ title, description, ...props }: ErrorBlockProps) => (
  <Block {...props}>
    <Header className={cn(headerVariants({ variant: "h3", margin: "normal" }), "text-red-400")}>
      <Icons.warning className={iconVariants({ variant: "large" })} />
      {title}
    </Header>
    <p>{description}</p>
  </Block>
);
