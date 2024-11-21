"use client";

import Tippy from "@tippyjs/react";
import { animateFill } from "tippy.js";
import "tippy.js/dist/backdrop.css";
import "tippy.js/animations/shift-away.css";
import "tippy.js/dist/tippy.css";
import React from "react";

export const Tooltip = React.forwardRef<HTMLDivElement, { children: React.ReactNode; content: string | number } & React.ComponentProps<typeof Tippy>>(({ children, content, ...props }, ref) => (
 <Tippy ref={ref} content={content} animation="shift-away" plugins={[animateFill]} hideOnClick={false} duration={400} animateFill={true} className="tippy-box font-normal" theme="translucent" interactive={false} placement="top" {...props}>
  {children}
 </Tippy>
));
