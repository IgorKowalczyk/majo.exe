"use client";

import { RotateCwIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Buttons";
import Particles from "@/components/ui/effects/Particles";
import Header, { headerVariants } from "@/components/ui/Headers";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
 return (
  <>
   <div className="absolute left-0 top-0 z-10 size-full bg-[radial-gradient(circle,rgba(2,0,36,0)0,rgb(16,17,16,100%))]" />
   <div className="relative flex min-h-screen w-full flex-col items-center justify-center gap-3 p-6">
    <Particles className="absolute inset-0" quantity={200} ease={80} color={"#fff"} refresh />

    <div className="z-30">
     <Header className={cn(headerVariants({ variant: "h1", margin: "normal", alignment: "center" }))}>500! Server error!</Header>
     <span className="flex max-w-md gap-2 text-center text-xl opacity-50">Sorry, we're having trouble loading this page. Please try again later or contact support.</span>
     <div className="mt-6 flex flex-wrap justify-center gap-3">
      <Link href="/" className={buttonVariants({ variant: "primary" })}>
       <RotateCwIcon className={iconVariants({ variant: "button" })} onClick={reset} />
       Try again
      </Link>
      <Link href="/discord" className={buttonVariants({ variant: "secondary" })}>
       <Icons.help className={iconVariants({ variant: "button" })} /> Contact support
      </Link>
     </div>
    </div>
   </div>
  </>
 );
}
