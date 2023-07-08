import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Invite } from "components/buttons/server/Invite";
import { Login } from "components/buttons/server/Login";
import Link from "next/link";
import { SplineBlock } from "@/components/blocks/client/Spline";
import { Header1 } from "@/components/blocks/Headers";

export default async function Main() {
 return (
  <>
   <div className="min-h-screen w-full relative flex items-center justify-center before:grayscale z-20 before:md:bg-grid-[#fff] flex-col  before:opacity-5 before:w-full before:h-full before:absolute before:z-10">
    <div className="absolute top-0 left-0 w-full z-10 h-full bg-[radial-gradient(circle,rgba(2,0,36,0)0,rgb(16,17,16,100%))]" />
    <div className="-mt-14 xl:w-4/5 md:w-[90%] z-20 relative flex lg:flex-row items-center flex-col">
     <div className="flex flex-col gap-4 justify-start lg:items-start lg:w-1/2 w-full items-center">
      <Link href={"/api/invite"} className="text-center -mt-4 font-medium bg-background-menu-button/50 backdrop-blur flex flex-row items-center border group transition-all duration-200 hover:bg-background-menu-button/40 cursor-copy border-neutral-700 rounded-full px-6 py-1 w-fit">
       Introducing Majo.exe v6
       <ArrowRightIcon className="inline-block w-4 h-4 ml-2 group-hover:translate-x-1 transition-all duration-200" />
      </Link>
      <Header1 className={"lg:text-start text-center justify-center lg:!justify-start !font-black"}>The only one Discord Bot</Header1>
      <h2 className="max-w-[680px] text-2xl lg:text-left text-center text-white/70">Majo.exe will not only keep your server entertained but also assist you with moderation and many other things!</h2>
      <div className="mt-2 flex gap-4 sm:flex-row flex-col">
       <Login />
       <Invite />
      </div>
     </div>
     <div className="lg:flex hidden flex-col justify-center items-center w-1/2">
      <SplineBlock url="https://prod.spline.design/wibg6pm5xTPtuPq1/scene.splinecode" />
     </div>
    </div>
   </div>
   <hr className="m-[0_auto] mb-8 h-[1px] w-full border-none px-8 duration-300 motion-reduce:transition-none bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.1)_50%,transparent)]" />
  </>
 );
}
