import Link from "next/link";
import { buttonVariants } from "@/components/ui/Buttons";
import Header, { headerVariants } from "@/components/ui/Headers";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export default function NotFound() {
 return (
  <div className="relative z-20 flex min-h-screen w-full flex-col items-center justify-center gap-4">
   <div className="z-30">
    <Header className={cn(headerVariants({ variant: "h1", margin: "normal", alignment: "center" }))}>404, page not found!</Header>
    <span className="flex max-w-md gap-2 text-center text-xl opacity-50">We're sorry we can't find the page you're looking for. Please try again later or contact support.</span>
    <div className="mt-6 flex flex-wrap justify-center gap-4">
     <Link href="/" className={buttonVariants({ variant: "primary" })}>
      <Icons.arrowLeft className={iconVariants({ variant: "button" })} />
      Go back home
     </Link>

     <Link href="/discord" className={buttonVariants({ variant: "secondary" })}>
      <Icons.help className={iconVariants({ variant: "button" })} /> Contact support
     </Link>
    </div>
   </div>
  </div>
 );
}
