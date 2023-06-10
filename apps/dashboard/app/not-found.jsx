import { QuestionMarkCircleIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Header1, HeaderBig } from "@/components/blocks/Headers";
import { PrimaryButton } from "@/components/buttons/server/Primary";
import { SecondaryButton } from "@/components/buttons/server/Secondary";
import "styles/glitch.css";

export default function NotFound() {
 return (
  <div className="flex h-screen flex-col items-center justify-center gap-4">
   <HeaderBig title="404!" className={"glitch relative"}>
    404!
   </HeaderBig>
   <Header1>Sorry, page not found!</Header1>
   <h2 className="text-center text-xl opacity-50">We're sorry we can't find the page you're looking for.</h2>
   <div className="flex gap-4">
    <PrimaryButton href="/">
     <ArrowLeftIcon className="mr-2 h-5 w-5" aria-hidden="true" role="img" />
     Go back home
    </PrimaryButton>
    <SecondaryButton href="/discord">
     <QuestionMarkCircleIcon className="mr-2 h-5 w-5" aria-hidden="true" role="img" /> Contact support
    </SecondaryButton>
   </div>
  </div>
 );
}
