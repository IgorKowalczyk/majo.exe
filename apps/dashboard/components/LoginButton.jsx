import { getSession } from "lib/session";
import { Icons, iconVariants } from "./Icons";
import { ButtonPrimary } from "@/components/Buttons";
import { ProviderLogin } from "@/components/client/ProviderLogin";

export async function LoginButton() {
 const session = await getSession();

 if (!session) {
  return <ProviderLogin provider={{ id: "discord", name: "Discord" }} />;
 }

 return (
  <ButtonPrimary href="/dashboard">
   <Icons.cornerRight className={iconVariants({ variant: "button" })} /> Go to dashboard
  </ButtonPrimary>
 );
}
