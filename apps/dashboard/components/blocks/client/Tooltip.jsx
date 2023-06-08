"use client";

import Tippy from "@tippyjs/react";
import { animateFill } from "tippy.js";

export function Tooltip({ children, content, ...props }) {
 return (
  <Tippy content={content} animation="shift-away" plugins={[animateFill]} hideOnClick={false} duration={400} animateFill={true} className="tippy-box font-normal" theme="translucent" interactive={true} placement="top" {...props}>
   {children}
  </Tippy>
 );
}
