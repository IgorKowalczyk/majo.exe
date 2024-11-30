"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/Buttons";
import Header, { headerVariants } from "@/components/ui/Headers";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
 return (
  <div className="relative z-20 flex min-h-screen w-full flex-col items-center justify-center gap-4">
   <div className="z-30">
    <Header className={cn(headerVariants({ variant: "h1", margin: "normal", alignment: "center" }))}>500, server error!</Header>
    <span className="text-xl text-center gap-2 max-w-md opacity-50 flex">Sorry, we're having trouble loading this page. Please try again later or contact support.</span>
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
