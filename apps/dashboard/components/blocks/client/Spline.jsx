"use client";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import React, { Suspense } from "react";
const Spline = React.lazy(() => import("@splinetool/react-spline"));

export function SplineBlock({ url }) {
 return (
  <Suspense
   fallback={
    <div className="flex h-full w-full flex-col items-center justify-center">
     <ArrowPathIcon className="h-12 w-12 animate-spin" />
    </div>
   }
  >
   <Spline scene={url} />
  </Suspense>
 );
}
