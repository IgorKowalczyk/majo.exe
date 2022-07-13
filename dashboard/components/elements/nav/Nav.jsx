import { meta } from "@/config";

export function Nav() {
 return (
  <nav className="fixed w-full bg-[#24282D]/90 shadow-lg backdrop-blur-[9px]">
   <div className="flex w-full items-center gap-2 text-left">
    <h1 className="font-poppins text-2xl">{meta.title}</h1>
   </div>
  </nav>
 );
}
