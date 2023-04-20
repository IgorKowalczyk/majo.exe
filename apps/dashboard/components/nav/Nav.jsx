import { RectangleStackIcon } from "@heroicons/react/24/outline";
import { getSession } from "lib/session";
import Image from "next/image";
import Link from "next/link";
import { meta, social } from "../../config";
import { LoginClient } from "../buttons/client/Login";
import { Invite } from "../buttons/Invite";
import { SecondaryButton } from "../buttons/Secondary";
import { MenuDropdown } from "./client/MenuDropdown";

export async function Nav() {
 const session = await getSession();
 return (
  <nav className="fixed z-[9999] flex w-full items-center bg-background-navbar/70 py-4 text-left shadow-lg backdrop-blur-[9px]">
   <Link href="/" className="font-inter text-lg text-white">
    <div className="flex cursor-pointer items-center gap-2 px-4 text-xl duration-200 hover:opacity-90 motion-reduce:transition-none">
     <Image className="rounded-full" src={social.logo} alt="Majo.exe" width={36} height={36} />
     <h1 className="font-inter sm:block hidden font-bold">{meta.title}</h1>
    </div>
   </Link>
   <div className="ml-auto mr-4 font-inter">
    {session ? (
     <div className="flex items-center">
      <SecondaryButton href="/dashboard">
       <RectangleStackIcon className="mr-2 h-5 w-5 " aria-hidden="true" role="img" /> Dashboard
      </SecondaryButton>
      {session?.user && <MenuDropdown user={session.user} />}
     </div>
    ) : (
     <div className="flex items-center justify-center gap-2">
      <div className="md:block hidden">
       <Invite />
      </div>
      <LoginClient />
     </div>
    )}
   </div>
  </nav>
 );
}
