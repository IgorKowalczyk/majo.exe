import { meta, social } from "@/config";
import NexLink from "next/link";
import Image from "next/image";

export function Nav() {
 return (
  <nav className="fixed w-full items-center bg-[#141f2f]/90 py-4 text-left shadow-lg backdrop-blur-[9px]">
   <NexLink href="/" className="font-poppins text-lg text-white">
    <div className="px-4 flex items-center gap-2">
    <Image src={social.logo} alt="Majo.exe" width={36} height={36} />
    <h1 className="font-poppins text-2xl">{meta.title}</h1>
    </div>
   </NexLink>
  </nav>
 );
}
