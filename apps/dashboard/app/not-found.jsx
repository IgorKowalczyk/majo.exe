import { ButtonPrimary } from "@/components/Buttons";
import { ButtonSecondary } from "@/components/Buttons";
import { Header2, Header3, HeaderBig } from "@/components/Headers";
import { Icons, iconVariants } from "@/components/Icons";
import "styles/glitch.css";

export default function NotFound() {
 return (
  <div className="relative z-20 flex min-h-screen w-full flex-col items-center justify-center gap-4 before:absolute before:z-10 before:size-full before:opacity-5 before:grayscale before:md:bg-grid-[#fff]">
   <div className="absolute left-0 top-0 z-10 size-full bg-[radial-gradient(circle,rgba(2,0,36,0)0,rgb(16,17,16,100%))]" />
   <div className="z-30">
    <div className="flex flex-col items-center justify-center">
     <HeaderBig title="404!" className="glitch relative">
      404!
     </HeaderBig>
    </div>
    <Header2 className="justify-center">Sorry, page not found!</Header2>
    <Header3 className="text-center font-normal opacity-50">We're sorry we can't find the page you're looking for.</Header3>
    <div className="mt-4 flex flex-wrap justify-center gap-2">
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
