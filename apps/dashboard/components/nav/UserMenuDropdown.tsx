"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import React from "react";
import { Button } from "@/components/ui/Buttons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import { Icons, iconVariants } from "@/components/ui/Icons";
import Image from "@/components/ui/Image";
import { getSession } from "@/lib/session";

export type UserSession = Awaited<ReturnType<typeof getSession>>;

export const UserMenuDropdown = ({ user, ...props }: React.ComponentProps<typeof DropdownMenu> & { user: UserSession }) => {
 if (!user) return null;

 return (
  <DropdownMenu {...props}>
   <DropdownMenuTrigger asChild>
    <Button variant="select">
     <Image width="32" height="32" quality={100} className="size-6 shrink-0 rounded-full" src={user.avatar} loading="lazy" alt={`${user.name} Avatar`} />
     {user.global_name || user.name}

     <Icons.ChevronsUpDown
      className={iconVariants({
       variant: "small",
       className: "text-neutral-400 duration-200 motion-reduce:transition-none",
      })}
     />
    </Button>
   </DropdownMenuTrigger>
   <DropdownMenuContent className="min-w-52" align="end">
    <DropdownMenuItem asChild>
     <Link href="/dashboard">
      <Icons.dashboard className={iconVariants({ variant: "button", className: "ml-1" })} /> Dashboard
     </Link>
    </DropdownMenuItem>
    <DropdownMenuItem asChild>
     <Link href="/user/profile">
      <Icons.User className={iconVariants({ variant: "button", className: "ml-1" })} /> Profile
     </Link>
    </DropdownMenuItem>

    <DropdownMenuSeparator />

    <DropdownMenuItem asChild>
     <Link href="/discord">
      <Icons.help className={iconVariants({ variant: "button", className: "ml-1" })} /> Support
     </Link>
    </DropdownMenuItem>
    <DropdownMenuItem
     onClick={(e) => {
      e.preventDefault();
      signOut({ redirect: true, callbackUrl: "/" });
     }}
     className="hover:!text-red-400 hover:!bg-button-action-hover/40"
    >
     <Icons.logout className={iconVariants({ variant: "button", className: "ml-1" })} /> Logout
    </DropdownMenuItem>
   </DropdownMenuContent>
  </DropdownMenu>
 );
};
