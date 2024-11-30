import { buttonVariants } from "@/components/ui/Buttons";
import { Header2, Header3 } from "@/components/ui/Headers";
import { Icons, iconVariants } from "@/components/ui/Icons";
import Link from "next/link";

export default function NotFound() {
 return (
  <div className="relative z-20 flex min-h-screen w-full flex-col items-center justify-center gap-4">
   <div className="z-30">
    <Header2 className="mb-2 justify-center !text-3xl">404, page not found!</Header2>
    <Header3 className="max-w-md text-center font-normal opacity-50">We're sorry we can't find the page you're looking for. Please try again later or contact support.</Header3>
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
