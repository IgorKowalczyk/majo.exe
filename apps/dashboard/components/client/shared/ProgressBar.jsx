"use client";

import { globalConfig } from "@nyxia/config";
import { AppProgressBar as ProgressBarNext } from "next-nprogress-bar";
import { Suspense } from "react";

export default function ProgressBar() {
 return (
  <Suspense fallback={null}>
   <ProgressBarNext height="2px" color={globalConfig.defaultColor} options={{ showSpinner: false }} shallowRouting />
  </Suspense>
 );
}
