"use client";

import { SessionProvider } from "next-auth/react";

export function Session({ children }) {
 return <SessionProvider>{children}</SessionProvider>;
}
