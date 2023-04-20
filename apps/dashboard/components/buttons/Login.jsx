import { ArrowUturnRightIcon } from "@heroicons/react/24/outline";
import { getSession } from "lib/session";
import Link from "next/link";
import { LoginClient } from "./client/Login";

export async function Login() {
 const session = await getSession();

 if (!session) {
  return <LoginClient />;
 }

 return (
  <Link href="/dashboard" className="flex cursor-pointer items-center rounded bg-button-primary px-4 py-2 font-inter leading-6 text-white duration-200 hover:bg-button-primary-hover motion-reduce:transition-none">
   <ArrowUturnRightIcon className="mr-2 h-5 w-5" aria-hidden="true" role="img" /> Go to dashboard
  </Link>
 );
}
