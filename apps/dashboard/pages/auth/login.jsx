import { Container } from "../../components/blocks/Container";
import { getProviders, signIn, getSession } from "next-auth/react";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function Login({ providers }) {
 return (
  <Container>
   <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-cover md:bg-shapes ">
    <div
     className="
     flex flex-col items-center gap-4 drop-shadow-[0_0_150px_rgba(0,124,240,0.5)]"
    >
     <div className="mb-4 flex flex-row">
      <Image src="/assets/avatar.png" width={90} height={90} alt="Avatar" className="rounded-full" quality={90} />
      <div className="mx-4 flex flex-row items-center gap-2">
       {[...Array(3)].map((_, i) => (
        <div key={i} className="h-2 w-2 animate-pulse rounded-full bg-gray-400" style={{ animationDelay: `${150 * i - 50}ms` }} />
       ))}
      </div>
      <div className="flex h-[90px] w-[90px] items-center justify-center rounded-full bg-white/5 text-5xl text-[#939DB8]">?</div>
     </div>

     <h1 className="text-center font-inter text-6xl font-bold">Connect your account</h1>
     <p className="my-1 text-center text-xl text-[#939DB8]">Authorize your Discord account to use all the Majo.exe features</p>
     <div className="flex flex-row gap-4">
      {Object.values(providers).map((provider) => (
       <div key={provider.name}>
        <button onClick={() => signIn(provider.id)} className="flex cursor-pointer items-center rounded bg-button-primary px-4 py-2 leading-6 text-white duration-200 hover:bg-button-primary-hover motion-reduce:transition-none">
         <svg className="mr-2 h-5 w-5" aria-hidden="true" role="img" viewBox="0 0 24 24">
          <path fill="currentColor" d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z" />
         </svg>
         Login with {provider.name}
        </button>
       </div>
      ))}
      <Link href="/" className="flex cursor-pointer items-center rounded bg-button-secondary px-4 py-2 font-inter leading-6 text-white duration-200 hover:bg-button-secondary-hover motion-reduce:transition-none">
       <>
        <ArrowUturnLeftIcon className="mr-2 h-5 w-5" aria-hidden="true" role="img" />
        Go back
       </>
      </Link>
     </div>
    </div>
   </div>
  </Container>
 );
}

export async function getServerSideProps(context) {
 const session = await getSession(context);
 if (!session) {
  return {
   props: { providers: await getProviders() },
  };
 } else {
  return {
   redirect: {
    destination: "/",
    permanent: false,
   },
  };
 }
}
