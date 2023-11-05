import { RectangleStackIcon } from "@heroicons/react/24/outline";
import { dashboardConfig } from "@majoexe/config";
import clsx from "clsx";
import { getSession } from "lib/session";
import Link from "next/link";
import Image from "@/components/blocks/client/shared/Image";
import { ProviderLogin } from "@/components/buttons/client/Provider";
import { Invite } from "@/components/buttons/server/Invite";
import { SideMenuControl } from "@/components/nav/client/SideMenuControl";
import { UserMenuDropdown } from "@/components/nav/client/UserMenuDropdown";

export async function Nav({ theme }) {
 const session = await getSession();

 return (
  <nav className="bg-background-navbar/70 fixed z-[9999] flex w-full items-center border-b border-b-neutral-800 py-4 text-left shadow-lg backdrop-blur-[9px]">
   <SideMenuControl />
   <div
    className={clsx(
     {
      "xl:w-4/5": theme === "compact",
      "w-full": !theme || theme === "full",
     },
     "mx-auto flex items-center"
    )}
   >
    <Link href="/" className="text-lg text-white">
     <div className="flex cursor-pointer items-center gap-2 pl-4 pr-2 text-xl duration-200 hover:opacity-90 motion-reduce:transition-none">
      <Image className="min-h-9 min-w-9 h-9 w-9 rounded-full" src={dashboardConfig.logo} alt="Majo.exe" width={36} height={36} />
      <h1 className=" hidden font-bold sm:block">{dashboardConfig.title}</h1>
     </div>
    </Link>
    <div className="hidden md:flex">
     <div className="mx-4 h-6 w-1 border-l-2 border-l-neutral-700" />

     <Link href="/commands" className="flex items-center text-white/60 duration-200 hover:text-white motion-reduce:transition-none">
      <RectangleStackIcon className="min-h-5 min-w-5 mr-2 h-5 w-5 " aria-hidden="true" role="img" /> Commands
     </Link>
    </div>
    <div className="ml-auto mr-4 ">
     {session ? (
      <div className="flex items-center gap-2">
       <Link href="/dashboard" className="hidden items-center text-white/60 duration-200 hover:text-white motion-reduce:transition-none md:flex">
        <RectangleStackIcon className="min-h-5 min-w-5 mr-2 h-5 w-5 " aria-hidden="true" role="img" /> Dashboard
       </Link>
       <UserMenuDropdown user={session} />
      </div>
     ) : (
      <div className="flex items-center justify-center gap-2">
       <div className="hidden md:block">
        <Invite />
       </div>
       <ProviderLogin provider={{ id: "discord", name: "Discord" }} />
      </div>
     )}
    </div>
   </div>
  </nav>
 );
}
