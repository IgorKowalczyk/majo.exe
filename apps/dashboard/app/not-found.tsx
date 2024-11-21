import { ButtonPrimary } from "@/components/Buttons";
import { ButtonSecondary } from "@/components/Buttons";
import { Header2, Header3 } from "@/components/Headers";
import { Icons, iconVariants } from "@/components/Icons";
import "styles/glitch.css";

export default function NotFound() {
 return (
  <div className="relative z-20 flex min-h-screen w-full flex-col items-center justify-center gap-4">
   <div className="z-30">
    <Header2 className="mb-2 justify-center !text-3xl">404, page not found!</Header2>
    <Header3 className="max-w-md text-center font-normal opacity-50">We're sorry we can't find the page you're looking for. Please try again later or contact support.</Header3>
    <div className="mt-6 flex flex-wrap justify-center gap-4">
     <ButtonPrimary href="/">
      <Icons.arrowLeft className={iconVariants({ variant: "button" })} />
      Go back home
     </ButtonPrimary>
     <ButtonSecondary href="/discord">
      <Icons.help className={iconVariants({ variant: "button" })} /> Contact support
     </ButtonSecondary>
    </div>
   </div>
  </div>
 );
}
