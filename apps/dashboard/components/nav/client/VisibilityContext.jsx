"use client";

import { createContext, useState } from "react";

export const VisibilityContext = createContext();

export function VisibilityProvider({ children }) {
 const [sideNavVisible, setSideNavVisible] = useState(false);
 const toggleSideNav = () => setSideNavVisible(!sideNavVisible);

 return <VisibilityContext.Provider value={{ sideNavVisible, toggleSideNav }}>{children}</VisibilityContext.Provider>;
}
