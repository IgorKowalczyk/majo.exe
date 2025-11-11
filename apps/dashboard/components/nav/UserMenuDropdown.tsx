"use client";

import { ChevronsUpDownIcon, HomeIcon, LogOutIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import React from "react";
import { Button } from "@/components/ui/Buttons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import { Icons, iconVariants } from "@/components/ui/Icons";
import Image from "@/components/ui/Image";
import { getSession } from "@/lib/session";
import { usePathname } from "next/navigation";

export type UserSession = Awaited<ReturnType<typeof getSession>>;

export const UserMenuDropdown = ({ user, ...props }: React.ComponentProps<typeof DropdownMenu> & { user: UserSession }) => {
  const route = usePathname();

  if (!user) return null;

  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>
        <Button variant="select">
          <Image width="32" height="32" quality={100} className="size-6 shrink-0 rounded-full" src={user.avatar} loading="lazy" alt={`${user.name} Avatar`} />
          {user.global_name || user.name}

          <ChevronsUpDownIcon
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
            <UserIcon className={iconVariants({ variant: "button", className: "ml-1" })} /> Profile
          </Link>
        </DropdownMenuItem>
        {route !== "/" && (
          <DropdownMenuItem asChild>
            <Link href="/">
              <HomeIcon className={iconVariants({ variant: "button", className: "ml-1" })} /> Home
            </Link>
          </DropdownMenuItem>
        )}

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
          className="`hover:text-red-400! hover:bg-button-action-hover/40!"
        >
          <LogOutIcon className={iconVariants({ variant: "button", className: "ml-1" })} /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
