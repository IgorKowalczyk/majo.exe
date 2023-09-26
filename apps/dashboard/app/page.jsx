import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Invite } from "components/buttons/server/Invite";
import { Login } from "components/buttons/server/Login";
import Link from "next/link";
import GlobeClient from "@/components/blocks/client/Globe";
import { Header1 } from "@/components/blocks/Headers";

export default async function Main() {
 return (
  <>
   <div className="relative z-20 flex min-h-screen w-full flex-col items-center justify-center before:absolute before:z-10  before:h-full before:w-full before:opacity-5 before:grayscale before:md:bg-grid-[#fff]">
    <div className="absolute left-0 top-0 z-10 h-full w-full bg-[radial-gradient(circle,rgba(2,0,36,0)0,rgb(16,17,16,100%))]" />
    <div className="relative z-20 -mt-14 flex select-none flex-col items-center md:w-[90%] lg:flex-row xl:w-4/5">
     <div className="flex w-full flex-col items-center justify-start gap-4 px-3 lg:w-1/2 lg:items-start">
      <Link href={"/api/invite"} className="before:w-wit group relative -mt-4 h-8 cursor-pointer rounded-full bg-gradient-to-tr from-neutral-700 via-neutral-700 to-[#111012] p-px font-medium text-neutral-300 duration-200 before:absolute before:inset-0 before:h-8 before:rounded-full before:bg-gradient-to-tr before:from-neutral-700 before:via-neutral-500 before:to-[#111012] before:opacity-0 before:duration-200 hover:before:opacity-100">
       Introducing Majo.exe v6
       <ArrowRightIcon className="ml-2 inline-block h-4 w-4 transition-all duration-200 group-hover:translate-x-1" />
      </Link>
      <Header1 className={"mb-0 justify-center text-center !font-black sm:mb-4 lg:!justify-start lg:text-start"}>The only one Discord Bot</Header1>
      <h2 className="max-w-[680px] text-center text-2xl text-white/70 lg:text-left">Majo.exe will not only keep your server entertained but also assist you with moderation and many other things!</h2>
      <div className="mt-2 flex flex-col gap-4 sm:flex-row">
       <Login />
       <Invite />
      </div>
     </div>
     <div className="hidden min-h-[500px] w-1/2 flex-col items-center justify-center lg:flex ">
      <GlobeClient />
     </div>
    </div>
   </div>
   <hr className="m-[0_auto] mb-8 h-[1px] w-full border-none bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.1)_50%,transparent)] px-8 duration-300 motion-reduce:transition-none" />
  </>
 );
}
