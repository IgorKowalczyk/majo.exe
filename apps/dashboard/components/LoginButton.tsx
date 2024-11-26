import { getSession } from "lib/session";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { Button, buttonVariants } from "@/components/ui/Buttons";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function DiscordLoginButton() {
 return (
  <Button
   variant="primary"
   onClick={(e) => {
    e.preventDefault();
    signIn("discord", { scope: "session identity guilds" });
   }}
  >
   <Icons.discord className={iconVariants({ variant: "button" })} />
   Login with Discord
  </Button>
 );
}

export async function LoginButton() {
 const session = await getSession();
 if (!session) return <DiscordLoginButton />;

 return (
  <Link href="/dashboard" className={cn(buttonVariants({ variant: "primary" }))}>
   <Icons.cornerRight className={iconVariants({ variant: "button" })} /> Go to dashboard
  </Link>
 );
}

("use client");

import { signIn } from "next-auth/react";
