import { getSession } from "lib/session";
import { Icons, iconVariants } from "@/components/ui/Icons";
import { buttonVariants } from "@/components/ui/Buttons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { DiscordLogin } from "@/components/DiscordLogin";

export async function LoginButton() {
 const session = await getSession();
 if (!session) return <DiscordLogin />;

 return (
  <Link href="/dashboard" className={cn(buttonVariants({ variant: "primary" }))}>
   <Icons.cornerRight className={iconVariants({ variant: "button" })} /> Go to dashboard
  </Link>
 );
}
