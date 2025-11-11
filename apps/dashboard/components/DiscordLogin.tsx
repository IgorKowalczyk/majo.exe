"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Buttons";
import { Icons, iconVariants } from "@/components/ui/Icons";

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
