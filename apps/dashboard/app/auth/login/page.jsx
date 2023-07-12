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
  <div className="custom-bg absolute z-20 h-screen w-full before:absolute before:z-10 before:h-full before:w-full before:opacity-50 before:grayscale after:absolute after:inset-0 after:top-20 after:-z-10 after:h-full after:w-full after:opacity-30 before:md:bg-[url('/assets/svg/grid.svg')]">
   <div className="relative z-20 flex h-screen flex-col items-center justify-center gap-4 bg-[radial-gradient(circle,rgba(2,0,36,0)0,rgb(16,17,16,100%))]">
    <div className="mb-4 flex flex-row">
     <Image src="/assets/avatar.png" width={112} height={112} alt="Avatar" className="h-20 w-20 rounded-full sm:h-28 sm:w-28" quality={90} />
     {searchParams.error ? (
      <div className="mx-4 flex items-center justify-center">
       <XMarkIcon className="h-8 w-8 text-red-500 " />
      </div>
     ) : (
      <Dots />
     )}
     <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/5 text-5xl text-[#939DB8] backdrop-blur-sm sm:h-28 sm:w-28">?</div>
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
    <div className="flex flex-col gap-4 sm:flex-row">
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
