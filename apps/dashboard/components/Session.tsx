"use client";

import { SessionProvider } from "next-auth/react";

export function Session({ children }: { children: React.ReactNode }) {
 return (
  <SessionProvider refetchInterval={5 * 60} refetchOnWindowFocus={false}>
   {children}
  </SessionProvider>
 );
}
