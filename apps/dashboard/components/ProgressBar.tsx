"use client";

import { globalConfig } from "@majoexe/config";
import { AppProgressBar as ProgressBarNext } from "next-nprogress-bar";
import React, { Suspense } from "react";

export const ProgressBar = (props: React.ComponentProps<typeof ProgressBarNext>) => {
 return (
  <Suspense fallback={null}>
   <ProgressBarNext color={globalConfig.defaultColor} options={{ showSpinner: false }} shallowRouting height="2px" {...props} />
  </Suspense>
 );
};
