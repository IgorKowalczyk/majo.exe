import { getSession } from "lib/session";
import { Icons, iconVariants } from "@/components/Icons";
import { buttonVariants } from "@/components/Buttons";
import { DiscordLogin } from "@/components/client/DiscordLogin";
import Link from "next/link";
import { cn } from "@/lib/utils";

export async function LoginButton() {
 const session = await getSession();
 if (!session) return <DiscordLogin />;

 return (
  <Link href="/dashboard" className={cn(buttonVariants({ variant: "primary" }))}>
   <Icons.cornerRight className={iconVariants({ variant: "button" })} /> Go to dashboard
  </Link>
 );
}
