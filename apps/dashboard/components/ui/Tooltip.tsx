"use client";

import { Provider, Root, Trigger, Content } from "@radix-ui/react-tooltip";
import React from "react";
import { cn } from "@/lib/utils";

export interface TooltipProps extends React.ComponentProps<typeof Content> {
 content: string | undefined;
}

export const Tooltip = ({ className, content, children, sideOffset = 4, ...props }: TooltipProps) => (
 <Provider>
  <Root delayDuration={100}>
   <Trigger asChild>{children}</Trigger>
   <Content sideOffset={sideOffset} className={cn("bg-background-menu-button animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 overflow-hidden rounded-lg border border-neutral-700 px-3 py-1.5 text-sm shadow-md", className)} {...props}>
    {content}
   </Content>
  </Root>
 </Provider>
);
