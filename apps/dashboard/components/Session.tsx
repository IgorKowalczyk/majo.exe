"use client";

import { ProgressProvider } from "@bprogress/next/app";
import { SessionProvider } from "next-auth/react";

export function Session({ children }: { children: React.ReactElement }) {
 return (
  <ProgressProvider color="#5865f2" height="2px" options={{ showSpinner: false }} shallowRouting>
   <SessionProvider refetchInterval={5 * 60} refetchOnWindowFocus={false}>
    {children}
   </SessionProvider>{" "}
  </ProgressProvider>
 );
}
