import { meta, social } from "@config";
import { RectangleStackIcon } from "@heroicons/react/24/outline";
import { LoginClient } from "components/buttons/client/Login";
import { Invite } from "components/buttons/server/Invite";
import { UserMenuDropdown } from "components/nav/client/UserMenuDropdown";
import { getSession } from "lib/session";
import Image from "next/image";
import Link from "next/link";
import { ServerDropdown } from "../client/ServerDropdown";
import { SideMenuControl } from "../client/SideMenuControl";

export async function Nav() {
 const session = await getSession();
 return (
  <nav className="fixed z-[9999] flex w-full items-center border-b border-b-neutral-800 bg-background-navbar/70 py-4 text-left shadow-lg backdrop-blur-[9px]">
   <SideMenuControl />
   <Link href="/" className="text-lg text-white">
    <div className="flex cursor-pointer items-center gap-2 pl-4 pr-2 text-xl duration-200 hover:opacity-90 motion-reduce:transition-none">
     <Image className="h-9 min-h-[2.25rem] w-9 min-w-[2.25rem] rounded-full" src={social.logo} alt="Majo.exe" width={36} height={36} />
     <h1 className=" hidden font-bold sm:block">{meta.title}</h1>
    </div>
   </Link>
   {session && <ServerDropdown />}
   <>
    <div className="mx-4 h-6 w-1 border-l-2 border-l-neutral-700" />

    <Link href="/commands" className="items-center text-white/60 duration-200 hover:text-white motion-reduce:transition-none md:flex">
     <RectangleStackIcon className="mr-2 h-5 w-5 " aria-hidden="true" role="img" /> Commands
    </Link>
   </>
   <div className="ml-auto mr-4 ">
    {session ? (
     <div className="flex items-center gap-2">
      <Link href="/dashboard" className="hidden items-center text-white/60 duration-200 hover:text-white motion-reduce:transition-none md:flex">
       <RectangleStackIcon className="mr-2 h-5 w-5 " aria-hidden="true" role="img" /> Dashboard
      </Link>
      <UserMenuDropdown user={session} />
     </div>
    ) : (
     <div className="flex items-center justify-center gap-2">
      <div className="hidden md:block">
       <Invite />
      </div>
      <LoginClient />
     </div>
    )}
   </div>
  </nav>
 );
}
