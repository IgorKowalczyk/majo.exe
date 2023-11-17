"use client";

import { globalConfig } from "@majoexe/config";
import { AppProgressBar as ProgressBarNext } from "next-nprogress-bar";

export default function ProgressBar() {
 return <ProgressBarNext height="2px" color={globalConfig.defaultColor} options={{ showSpinner: false }} shallowRouting />;
}
