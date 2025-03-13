"use client";

import React, { createContext, useState, ReactNode } from "react";

interface VisibilityContextProps {
 sideNavVisible: boolean;
 toggleSideNav: () => void;
}

export const VisibilityContext = createContext<VisibilityContextProps>({
 sideNavVisible: false,
 toggleSideNav: () => {},
});

interface VisibilityProviderProps {
 children: ReactNode;
}

export const VisibilityProvider = ({ children }: VisibilityProviderProps) => {
 const [sideNavVisible, setSideNavVisible] = useState(false);
 const toggleSideNav = () => setSideNavVisible(!sideNavVisible);

 return <VisibilityContext value={{ sideNavVisible, toggleSideNav }}>{children}</VisibilityContext>;
};
