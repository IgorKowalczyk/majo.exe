import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Dots } from "components/blocks/Loaders";
import { ProviderLogin } from "components/buttons/client/Provider";
import { getSession } from "lib/session";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getProviders } from "next-auth/react";
import { Header1 } from "@/components/blocks/Headers";

export const metadata = {
 title: "Login",
 description: "Login to your account",
};

export default async function Login({ searchParams }) {
 const providers = await getProviders();
 const user = await getSession();
 if (user) return redirect("/");

 return (
  <div className="h-screen w-full absolute before:grayscale after:absolute after:inset-0 after:h-full after:w-full after:-z-10 after:top-20 after:opacity-30 custom-bg z-20 before:md:bg-[url('/assets/svg/grid.svg')] before:opacity-50 before:w-full before:h-full before:absolute before:z-10">
   <div className="z-20 relative flex h-screen flex-col items-center justify-center gap-4 bg-[radial-gradient(circle,rgba(2,0,36,0)0,rgb(16,17,16,100%))]">
    <div className="mb-4 flex flex-row">
     <Image src="/assets/avatar.png" width={112} height={112} alt="Avatar" className="rounded-full sm:w-28 sm:h-28 w-20 h-20" quality={90} />
     {searchParams.error ? (
      <div className="flex items-center justify-center mx-4">
       <XMarkIcon className="h-8 w-8 text-red-500 " />
      </div>
     ) : (
      <Dots />
     )}
     <div className="flex sm:w-28 sm:h-28 w-20 h-20 items-center justify-center rounded-full bg-white/5 text-5xl backdrop-blur-sm border border-white/20 text-[#939DB8]">?</div>
    </div>

    {searchParams.error ? (
     <>
      <Header1>Something went wrong!</Header1>
      <p className="my-1 text-center text-xl text-[#939DB8]">Something went wrong while trying to connect your Discord account!</p>
     </>
    ) : (
     <>
      <Header1>Connect your Discord account</Header1>
      <p className="my-1 text-center text-xl text-[#939DB8]">Authorize your Discord account to use all the Majo.exe features</p>
     </>
    )}
    <div className="flex sm:flex-row gap-4 flex-col">
     {Object.values(providers).map((provider) => (
      <ProviderLogin key={provider.name} provider={provider} />
     ))}
     <Link href="/" className="flex cursor-pointer items-center rounded bg-button-secondary px-4 py-2  leading-6 text-white duration-200 hover:bg-button-secondary-hover motion-reduce:transition-none">
      <>
       <ArrowUturnLeftIcon className="mr-2 h-5 w-5" aria-hidden="true" role="img" />
       Go back
      </>
     </Link>
    </div>
   </div>
  </div>
 );
}
