import { getSession } from "lib/session";
import { redirect } from "next/navigation";
import { getProviders } from "next-auth/react";
import { ButtonSecondary } from "@/components/Buttons";
import { ProviderLogin } from "@/components/client/ProviderLogin";
import Image from "@/components/client/shared/Image";
import { Header1 } from "@/components/Headers";
import { Icons, iconVariants } from "@/components/Icons";
import { Dots } from "@/components/Loaders";

export const metadata = {
 title: "Login",
 description: "Login to your account",
};

export default async function LoginPage({ searchParams }) {
 const providers = await getProviders();
 const user = await getSession();
 if (user) return redirect("/");

 return (
  <div className="before:md:bg-grid-[#fff] relative z-20 flex min-h-screen w-full flex-col items-center justify-center gap-4 px-3 before:absolute before:z-10 before:h-full before:w-full before:opacity-5 before:grayscale">
   <div className="absolute left-0 top-0 z-10 h-full w-full bg-[radial-gradient(circle,rgba(2,0,36,0)0,rgb(16,17,16,100%))]" />
   <div className="z-30 mb-2 flex flex-row">
    <Image src="/assets/avatar.png" width={80} height={80} alt="Avatar" className="h-20 min-h-20 w-20 min-w-20 rounded-full sm:h-28 sm:min-h-28 sm:w-28 sm:min-w-28" quality={90} />
    {searchParams.error ? (
     <div className="mx-4 flex items-center justify-center">
      <Icons.close className="h-8 min-h-8 w-8 min-w-8 text-red-500" />
     </div>
    ) : (
     <Dots />
    )}
    <div className="flex h-20 min-h-20 w-20 min-w-20 items-center justify-center rounded-full border border-white/20 bg-white/5 text-5xl text-[#939DB8] backdrop-blur-sm sm:h-28 sm:min-h-28 sm:w-28 sm:min-w-28">?</div>
   </div>

   <div className="z-30">
    {searchParams.error ? (
     <>
      <Header1 className="!justify-center text-center">Something went wrong!</Header1>
      <p className="my-1 mt-2 text-center text-xl text-[#939DB8]">Something went wrong while trying to connect your Discord account!</p>
     </>
    ) : (
     <>
      <Header1 className="!justify-center text-center">Connect your account</Header1>
      <p className="my-1 mt-2 text-center text-xl text-[#939DB8]">Authorize your Discord account to use all of Nyxia's features</p>
     </>
    )}
   </div>
   <div className="z-30 flex flex-col gap-4 sm:flex-row">
    {Object.values(providers).map((provider) => (
     <ProviderLogin key={provider.name} provider={provider} />
    ))}
    <ButtonSecondary href="/">
     <Icons.arrowLeft className={iconVariants({ variant: "button" })} />
     Go back home
    </ButtonSecondary>
   </div>
  </div>
 );
}
