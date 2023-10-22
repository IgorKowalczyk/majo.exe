import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { getSession } from "lib/session";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getProviders } from "next-auth/react";
import { Header1 } from "@/components/blocks/Headers";
import { Dots } from "@/components/blocks/Loaders";
import { ProviderLogin } from "@/components/buttons/client/Provider";

export const metadata = {
 title: "Login",
 description: "Login to your account",
};

export default async function Login({ searchParams }) {
 const providers = await getProviders();
 const user = await getSession();
 if (user) return redirect("/");

 return (
  <div className="before:md:bg-grid-[#fff] relative z-20 flex min-h-screen w-full flex-col items-center justify-center gap-4 px-3 before:absolute before:z-10 before:h-full before:w-full before:opacity-5 before:grayscale">
   <div className="absolute left-0 top-0 z-10 h-full w-full bg-[radial-gradient(circle,rgba(2,0,36,0)0,rgb(16,17,16,100%))]" />
   <div className="z-30 mb-2 flex flex-row">
    <Image src="/assets/avatar.png" width={112} height={112} alt="Avatar" className="h-20 w-20 rounded-full sm:h-28 sm:w-28" quality={90} />
    {searchParams.error ? (
     <div className="mx-4 flex items-center justify-center">
      <XMarkIcon className="min-h-8 min-w-8 h-8 w-8 text-red-500 " />
     </div>
    ) : (
     <Dots />
    )}
    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/5 text-5xl text-[#939DB8] backdrop-blur-sm sm:h-28 sm:w-28">?</div>
   </div>

   <div className="z-30">
    {searchParams.error ? (
     <>
      <Header1 className={"!justify-center"}>Something went wrong!</Header1>
      <p className="my-1 mt-2 text-center text-xl text-[#939DB8]">Something went wrong while trying to connect your Discord account!</p>
     </>
    ) : (
     <>
      <Header1 className={"!justify-center"}>Connect your account</Header1>
      <p className="my-1 mt-2 text-center text-xl text-[#939DB8]">Authorize your Discord account to use all the Majo.exe features</p>
     </>
    )}
   </div>
   <div className="z-30 flex flex-col gap-4 sm:flex-row">
    {Object.values(providers).map((provider) => (
     <ProviderLogin key={provider.name} provider={provider} />
    ))}
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
