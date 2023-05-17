import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { Dots } from "components/blocks/Loaders";
import { ProviderLogin } from "components/buttons/client/Provider";
import { getSession } from "lib/session";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getProviders } from "next-auth/react";

export const metadata = {
 title: "Login",
 description: "Login to your account",
};

export default async function Login() {
 const providers = await getProviders();
 const user = await getSession();
 if (user) return redirect("/");

 return (
  <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-cover md:bg-shapes ">
   <div
    className="
     flex flex-col items-center gap-4 drop-shadow-[0_0_150px_rgba(0,124,240,0.5)]"
   >
    <div className="mb-4 flex flex-row">
     <Image src="/assets/avatar.png" width={112} height={112} alt="Avatar" className="rounded-full w-28 h-28" quality={90} />
     <Dots />
     <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white/5 text-5xl text-[#939DB8]">?</div>
    </div>

    <h1 className="text-center  text-6xl font-bold">Connect your account</h1>
    <p className="my-1 text-center text-xl text-[#939DB8]">Authorize your Discord account to use all the Majo.exe features</p>
    <div className="flex flex-row gap-4">
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
