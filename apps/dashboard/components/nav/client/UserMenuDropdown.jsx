"use client";

import { RectangleStackIcon, UserIcon, ArrowRightStartOnRectangleIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import Image from "@/components/client/shared/Image";
import Menu from "@/components/client/shared/Menu";

export function UserMenuDropdown({ user }) {
 return (
  <>
   <Menu
    label={
     <>
      <Image width="32" height="32" quality={100} className="-ml-1 !h-6 min-h-6 !w-6 min-w-6 rounded-full" src={user.image} loading="lazy" alt={`${user.name} Avatar`} />
      <span>{user.global_name || user.name}</span>
     </>
    }
   >
    <div className="mb-2">
     <Menu.Link href="/dashboard">
      <RectangleStackIcon className="mr-2 h-5 min-h-5 w-5 min-w-5 " aria-hidden="true" role="img" /> Dashboard
     </Menu.Link>
     <Menu.Link href="/user/profile">
      <UserIcon className="mr-2 h-5 min-h-5 w-5 min-w-5 " aria-hidden="true" role="img" /> Profile
     </Menu.Link>
    </div>

    <div className="pt-1">
     <Menu.Link href="/discord">
      <QuestionMarkCircleIcon className="mr-2 h-5 min-h-5 w-5 min-w-5 " aria-hidden="true" role="img" /> Support
     </Menu.Link>
     <Menu.Item onClick={() => signOut({ redirect: true, callbackUrl: "/" })} style="action">
      <ArrowRightStartOnRectangleIcon className="mr-2 h-5 min-h-5 w-5 min-w-5" aria-hidden="true" role="img" /> Logout
     </Menu.Item>
    </div>
   </Menu>
  </>
 );
}
