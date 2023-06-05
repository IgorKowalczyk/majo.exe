import { ArrowUturnRightIcon } from "@heroicons/react/24/outline";
import { LoginClient } from "components/buttons/client/Login";
import { getSession } from "lib/session";
import { PrimaryButton } from "./Primary";

export async function Login() {
 const session = await getSession();

 if (!session) {
  return <LoginClient />;
 }

 return (
  <PrimaryButton href="/dashboard">
   <ArrowUturnRightIcon className="mr-2 h-5 w-5" aria-hidden="true" role="img" /> Go to dashboard
  </PrimaryButton>
 );
}
