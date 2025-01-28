"use client";

import React, { createContext, useState, forwardRef } from "react";

export const VisibilityContext = createContext({ sideNavVisible: false, toggleSideNav: () => {} } as { sideNavVisible: boolean; toggleSideNav: () => void });

export const VisibilityProvider = forwardRef<HTMLDivElement, { children: React.ReactNode }>(({ children }, ref) => {
 const [sideNavVisible, setSideNavVisible] = useState(false);
 const toggleSideNav = () => setSideNavVisible(!sideNavVisible);

 return (
  <VisibilityContext value={{ sideNavVisible, toggleSideNav }}>
   <div ref={ref}>{children}</div>
  </VisibilityContext>
 );
});
