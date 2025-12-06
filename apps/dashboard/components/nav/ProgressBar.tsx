"use client";

import { ProgressProvider } from "@bprogress/next/app";

export function ProgressBar({ children }: { children: React.ReactElement }) {
  return (
    <ProgressProvider color="#5865f2" height="2px" options={{ showSpinner: false }}>
      {children}
    </ProgressProvider>
  );
}
