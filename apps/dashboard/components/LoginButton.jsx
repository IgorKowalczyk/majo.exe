import { getSession } from "lib/session";
import { Icons, iconVariants } from "./Icons";
import { ButtonPrimary } from "@/components/Buttons";
import { DiscordLogin } from "@/components/client/DiscordLogin";

export async function LoginButton() {
 const session = await getSession();

 if (!session) {
  return <DiscordLogin />;
 }

 return (
  <ButtonPrimary href="/dashboard">
   <Icons.cornerRight className={iconVariants({ variant: "button" })} /> Go to dashboard
  </ButtonPrimary>
 );
}
