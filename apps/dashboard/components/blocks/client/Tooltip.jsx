"use client";

/*
import Tippy from "@tippyjs/react";
import { animateFill } from "tippy.js";
import "tippy.js/dist/backdrop.css";
import "tippy.js/animations/shift-away.css";
import "tippy.js/dist/tippy.css";
*/

/* eslint-disable-next-line no-unused-vars */
export function Tooltip({ children, content, ...props }) {
 return children;
 /* 
 return (
  <Tippy content={content || ""} animation="shift-away" plugins={[animateFill]} hideOnClick={false} duration={400} animateFill={true} className="tippy-box font-normal" theme="translucent" interactive={true} placement="top" {...props}>
   {children}
  </Tippy>
 ); */
}
