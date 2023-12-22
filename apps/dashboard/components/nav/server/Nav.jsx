import { RectangleStackIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { dashboardConfig } from "@majoexe/config";
import clsx from "clsx";
import { getSession } from "lib/session";
import Link from "next/link";
import { ButtonSecondary } from "@/components/Buttons";
import { ProviderLogin } from "@/components/client/ProviderLogin";
import Image from "@/components/client/shared/Image";
import { SideMenuControl } from "@/components/nav/client/SideMenuControl";
import { UserMenuDropdown } from "@/components/nav/client/UserMenuDropdown";

export async function Nav({ theme }) {
 const session = await getSession();

 return (
  <nav className="bg-background-navbar fixed z-[9999] flex w-full items-center border-b border-b-neutral-800 py-4 text-left shadow-lg md:bg-opacity-70 md:backdrop-blur-[9px]">
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
      <Image className="h-9 min-h-9 w-9 min-w-9 rounded-full" src={dashboardConfig.logo} alt={`${dashboardConfig.title} logo`} width={36} height={36} />
      <p className="hidden font-bold sm:block">{dashboardConfig.title}</p>
     </div>
    </Link>
    <div className="hidden md:flex">
     <div className="mx-4 h-6 w-1 border-l-2 border-l-neutral-700" />
     <Link href="/commands" className="flex items-center text-white/60 duration-200 hover:text-white motion-reduce:transition-none">
      <svg className="mr-2 h-6 min-h-6 w-6 min-w-5" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24">
       <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M5 3C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5ZM16.8995 8.41419L15.4853 6.99998L7 15.4853L8.41421 16.8995L16.8995 8.41419Z" />
      </svg>
      <span className="-mb-px">Commands</span>
     </Link>
    </div>
    <div className="ml-auto mr-4 ">
     {session ? (
      <div className="flex items-center gap-2">
       <Link href="/dashboard" className="hidden items-center text-white/60 duration-200 hover:text-white motion-reduce:transition-none md:flex">
        <RectangleStackIcon className="mr-2 h-6 min-h-6 w-6 min-w-6" aria-hidden="true" role="img" /> <span className="-mb-px">Dashboard</span>
       </Link>
       <UserMenuDropdown user={session} />
      </div>
     ) : (
      <div className="flex items-center justify-center gap-2">
       <div className="hidden md:block">
        <ButtonSecondary href="/api/invite">
         <UserPlusIcon className="mr-2 h-5 min-h-5 w-5 min-w-5" aria-hidden="true" role="img" />
         Add to your server
        </ButtonSecondary>
       </div>
       <ProviderLogin provider={{ id: "discord", name: "Discord" }} />
      </div>
     )}
    </div>
   </div>
  </nav>
 );
}
