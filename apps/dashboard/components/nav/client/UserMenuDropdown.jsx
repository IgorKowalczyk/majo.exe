"use client";

import { signOut } from "next-auth/react";
import Image from "@/components/client/shared/Image";
import Menu from "@/components/client/shared/Menu";
import { Icons, iconVariants } from "@/components/Icons";

export function UserMenuDropdown({ user }) {
 return (
  <>
   <Menu
    label={
     <>
      <Image width="32" height="32" quality={100} className="-ml-1 size-6 shrink-0 rounded-full" src={user.avatar} loading="lazy" alt={`${user.name} Avatar`} />
      <span>{user.global_name || user.name}</span>
     </>
    }
   >
    <div className="mb-2">
     <Menu.Link href="/dashboard">
      <Icons.dashboard className={iconVariants({ variant: "button", className: "ml-1" })} /> Dashboard
     </Menu.Link>
     <Menu.Link href="/user/profile">
      <Icons.User className={iconVariants({ variant: "button", className: "ml-1" })} /> Profile
     </Menu.Link>
    </div>

    <div className="pt-1">
     <Menu.Link href="/discord">
      <Icons.help className={iconVariants({ variant: "button", className: "ml-1" })} /> Support
     </Menu.Link>
     <Menu.Item
      onClick={(e) => {
       e.preventDefault();
       signOut({ redirect: true, callbackUrl: "/" });
      }}
      style="action"
     >
      <Icons.logout className={iconVariants({ variant: "button", className: "ml-1" })} /> Logout
     </Menu.Item>
    </div>
   </Menu>
  </>
 );
}
