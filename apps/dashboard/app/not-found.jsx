import { QuestionMarkCircleIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { ButtonPrimary } from "@/components/Buttons";
import { ButtonSecondary } from "@/components/Buttons";
import { Header2, Header3, HeaderBig } from "@/components/Headers";
import "styles/glitch.css";

export default function NotFound() {
 return (
  <div className="before:md:bg-grid-[#fff] relative z-20 flex min-h-screen w-full flex-col items-center justify-center gap-4 before:absolute before:z-10 before:h-full before:w-full before:opacity-5 before:grayscale">
   <div className="absolute left-0 top-0 z-10 h-full w-full bg-[radial-gradient(circle,rgba(2,0,36,0)0,rgb(16,17,16,100%))]" />
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
      <ArrowLeftIcon className="mr-2 h-5 min-h-5 w-5 min-w-5" aria-hidden="true" role="img" />
      Go back home
     </ButtonPrimary>
     <ButtonSecondary href="/discord">
      <QuestionMarkCircleIcon className="mr-2 h-5 min-h-5 w-5 min-w-5" aria-hidden="true" role="img" /> Contact support
     </ButtonSecondary>
    </div>
   </div>
  </div>
 );
}
