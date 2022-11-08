import { Container } from "@components/blocks/Container";
import { QuestionMarkCircleIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Main(props) {
 return (
  <Container>
   <div className="flex h-screen flex-col items-center justify-center gap-4">
    <h1 className="flex items-start text-center font-inter text-5xl">Error 404</h1>
    <h2 className="text-center font-inter text-xl opacity-50">We're sorry — we can't find the page you're looking for.</h2>
    <div className="flex gap-4">
     <Link href="/discord">
      <div className="flex cursor-pointer items-center rounded bg-button-secondary px-4 py-2 font-inter leading-6 text-white duration-200 hover:bg-button-secondary-hover motion-reduce:transition-none">
       <QuestionMarkCircleIcon className="mr-2 h-5 w-5" aria-hidden="true" role="img" /> Support
      </div>
     </Link>
     <Link href="/">
      <div className="flex cursor-pointer items-center rounded bg-button-primary px-4 py-2 font-inter leading-6 text-white duration-200 hover:bg-button-primary-hover motion-reduce:transition-none">
       <ArrowLeftIcon className="mr-2 h-5 w-5" aria-hidden="true" role="img" /> Go back
      </div>
     </Link>
    </div>
   </div>
  </Container>
 );
}
