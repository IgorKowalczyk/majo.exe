import { getSession } from "lib/session";
import Link from "next/link";
import { DiscordLogin } from "@/components/DiscordLogin";
import { buttonVariants } from "@/components/ui/Buttons";
import { Icons, iconVariants } from "@/components/ui/Icons";
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
