import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Invite } from "components/buttons/server/Invite";
import { Login } from "components/buttons/server/Login";
import Link from "next/link";
import { HeaderBig } from "@/components/blocks/Headers";

export default async function Main() {
 return (
  <div className="h-screen w-full absolute before:grayscale after:absolute after:inset-0 after:h-full after:w-full after:-z-10 after:top-20 after:opacity-30 custom-bg z-20 before:md:bg-[url('/assets/svg/grid.svg')] before:opacity-50 before:w-full before:h-full before:absolute before:z-10">
   <div className="z-20 py-32 relative flex h-screen flex-col items-center justify-center gap-4 bg-[radial-gradient(circle,rgba(2,0,36,0)0,rgb(16,17,16,100%))]">
    <Link href={"/invite"} className="text-center -mt-4 font-medium bg-background-menu-button/50 backdrop-blur flex flex-row items-center border group transition-all duration-200 hover:bg-background-menu-button/40 cursor-copy border-neutral-700 rounded-full px-6 py-1">
     Introducing Majo.exe v6
     <ArrowRightIcon className="inline-block w-4 h-4 ml-2 group-hover:translate-x-1 transition-all duration-200" />
    </Link>
    <HeaderBig>
     <p>The only one Discord Bot</p>
     <p>you will ever need.</p>
    </HeaderBig>
    <h2 className="max-w-[680px] text-center text-2xl text-white/70 px-4">Majo.exe will not only keep your server entertained but also assist you with moderation and many other things!</h2>
    <div className="mt-2 flex gap-4">
     <Login />
     <Invite />
    </div>
    {/*
    <div className="w-1/2 mt-24 bg-background-menu-button/80 h-screen border border-neutral-800 rounded-3xl"></div>
 */}
   </div>
  </div>
 );
}
