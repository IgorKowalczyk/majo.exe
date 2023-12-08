import { ArrowUturnRightIcon } from "@heroicons/react/24/outline";
import { getSession } from "lib/session";
import { PrimaryButton } from "@/components/blocks/Primary";
import { ProviderLogin } from "@/components/blocks/Provider";

export async function Login() {
 const session = await getSession();

 if (!session) {
  return <ProviderLogin provider={{ id: "discord", name: "Discord" }} />;
 }

 return (
  <PrimaryButton href="/dashboard">
   <ArrowUturnRightIcon className="min-h-5 min-w-5 mr-2 h-5 w-5" aria-hidden="true" role="img" /> Go to dashboard
  </PrimaryButton>
 );
}
