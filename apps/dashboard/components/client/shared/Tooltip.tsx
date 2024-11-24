"use client";

import React from "react";
import { Provider, Root, Trigger, Content } from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

export interface TooltipProps extends React.ComponentPropsWithoutRef<typeof Content> {
 children: React.ReactNode;
 content: string | undefined;
}

export const Tooltip = React.forwardRef<React.ElementRef<typeof Content>, TooltipProps>(({ className, content, children, sideOffset = 4, ...props }, ref) => (
 <Provider>
  <Root delayDuration={100}>
   <Trigger>{children}</Trigger>
   <Content ref={ref} sideOffset={sideOffset} className={cn("z-50 overflow-hidden rounded-md border border-neutral-700 bg-background-menu-button px-3 py-1.5 text-sm shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className)} {...props}>
    {content}
   </Content>
  </Root>
 </Provider>
));
