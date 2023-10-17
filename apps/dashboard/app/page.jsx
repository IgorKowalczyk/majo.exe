import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import ray from "public/assets/ray.png";
import Balancer from "react-wrap-balancer";
import GlobeClient from "@/components/blocks/client/Globe";
import { Header1 } from "@/components/blocks/Headers";
import { Invite } from "@/components/buttons/server/Invite";
import { Login } from "@/components/buttons/server/Login";

export default async function Main() {
 return (
  <>
   <div className="before:md:bg-grid-[#fff] relative z-20 flex min-h-screen w-full items-center justify-center before:absolute before:z-10 before:h-full before:w-full before:opacity-5 before:grayscale">
    <div className="absolute left-0 top-0 z-10 h-full w-full bg-[radial-gradient(circle,rgba(2,0,36,0)0,rgb(16,17,16,100%))]" />
    <div className="relative z-20 -mt-8 flex w-full select-none flex-col items-center justify-center gap-4 px-3 md:w-[90%]">
     <Link href={"/api/invite"} className="before:w-wit group relative -mt-4 flex h-8 cursor-pointer items-center justify-center rounded-full bg-gradient-to-tr from-neutral-700/80 via-neutral-700/80 to-[#111012]/80 p-px text-center text-lg font-normal text-neutral-300 duration-200 before:absolute before:inset-0 before:h-8 before:rounded-full before:bg-gradient-to-tr before:from-neutral-700 before:via-neutral-500 before:to-[#111012] before:opacity-0 before:duration-200 hover:before:opacity-100">
      <span className="from-black-10/50 relative mt-px flex h-full w-full items-center rounded-full bg-gradient-to-tr to-[#111012] px-6">
       Introducing Majo.exe v6
       <ArrowRightIcon className="min-h-4 min-w-4 ml-2 inline-block h-4 w-4 transition-all duration-200 group-hover:translate-x-1" />
      </span>
     </Link>
     <Header1 className={"text-fill-transparent mb-0 justify-center bg-gradient-to-b	from-white to-neutral-400 box-decoration-clone bg-clip-text text-center !font-black !leading-snug xl:!text-5xl 2xl:!text-7xl"}>The only one Discord Bot</Header1>
     <h2 className="max-w-[680px] text-center text-2xl text-white/70">
      <Balancer>Majo.exe will not only keep your server entertained but also assist you with moderation and many other things!</Balancer>
     </h2>
     <div className="mt-2 flex flex-col gap-4 sm:flex-row">
      <Login />
      <Invite />
     </div>
    </div>
    <Image alt="Background" width={1000} height={1000} className="pointer-events-none absolute -top-20 left-0 right-0 z-0 mx-auto hidden h-full w-full select-none lg:block" src={ray} loading={"eager"} />
    <div className="absolute bottom-0 z-10 hidden min-h-[500px] w-full translate-y-1/2 flex-col items-center justify-center md:flex">
     <GlobeClient />
     <div className="absolute inset-0 z-[-10] m-auto mt-[100px] h-[580px] w-[580px] rounded-full bg-[#ddd] opacity-5 blur-3xl" />
    </div>
   </div>
   <div className="bg-background-primary relative z-[600] min-h-screen">
    <hr className="m-[0_auto] mb-8 h-px w-full border-none bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.1)_50%,transparent)] px-8 duration-300 motion-reduce:transition-none" />
    <div className="cont">
     <div className="blob" />
    </div>
   </div>
  </>
 );
}
