import { ArrowUturnLeftIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Header1 } from "@/components/blocks/Headers";

export const metadata = {
 title: "Error",
 description: "Something went wrong! Please try again later, or contact us if the problem persists.",
};

export default async function ErrorPage({ searchParams }) {
 return (
  <div className="before:md:bg-grid-[#fff] relative z-20 flex min-h-screen w-full flex-col items-center justify-center gap-4 px-3 before:absolute before:z-10 before:h-full before:w-full before:opacity-5 before:grayscale">
   <div className="absolute left-0 top-0 z-10 h-full w-full bg-[radial-gradient(circle,rgba(2,0,36,0)0,rgb(16,17,16,100%))]" />
   <div className="z-30">
    <>
     <ExclamationTriangleIcon className="mx-auto mb-2 h-20 w-20 rounded-full border border-neutral-700 bg-neutral-700/25 p-4 text-red-500 backdrop-blur-md" />
     <Header1 className={"!justify-center text-center"}>Something went wrong!</Header1>
     <p className="my-1 mt-2 text-center text-xl text-[#939DB8]">{searchParams.error}</p>
    </>
   </div>
   <div className="z-30 flex flex-col gap-4 sm:flex-row">
    <Link href="/" className="bg-button-secondary hover:bg-button-secondary-hover flex cursor-pointer items-center rounded px-4 py-2 leading-6 text-white duration-200 motion-reduce:transition-none">
     <>
      <ArrowUturnLeftIcon className="min-h-5 min-w-5 mr-2 h-5 w-5" aria-hidden="true" role="img" />
      Go back
     </>
    </Link>
   </div>
  </div>
 );
}
