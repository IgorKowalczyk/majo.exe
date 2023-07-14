"use client";

import { AppProgressBar as ProgressBarNext } from "next-nprogress-bar";

export default function ProgressBar() {
 return <ProgressBarNext height="2px" color="#5865F2" options={{ showSpinner: false }} shallowRouting />;
}
