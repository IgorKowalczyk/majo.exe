"use client";

import { signIn } from "next-auth/react";
import { Icons, iconVariants } from "./ui/Icons";
import { Button } from "@/components/ui/Buttons";

export function DiscordLogin() {
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
