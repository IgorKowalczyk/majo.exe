"use client";

import { buttonVariants } from "@/components/Buttons";
import { Header2, Header3 } from "@/components/Headers";
import { Icons, iconVariants } from "@/components/Icons";
import Link from "next/link";
import "styles/glitch.css";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
 return (
  <div className="relative z-20 flex min-h-screen w-full flex-col items-center justify-center gap-4">
   <div className="z-30">
    <Header2 className="mb-2 justify-center !text-3xl">500, server error!</Header2>
    <Header3 className="max-w-lg text-center font-normal opacity-50">Sorry, we're having trouble loading this page. Please try again later or contact support.</Header3>
    <div className="mt-6 flex flex-wrap justify-center gap-4">
     <Link href="/" className={buttonVariants({ variant: "primary" })}>
      <Icons.refresh className={iconVariants({ variant: "button" })} onClick={reset} />
      Try again
     </Link>
     <Link href="/discord" className={buttonVariants({ variant: "secondary" })}>
      <Icons.help className={iconVariants({ variant: "button" })} /> Contact support
     </Link>
    </div>
   </div>
  </div>
 );
}
