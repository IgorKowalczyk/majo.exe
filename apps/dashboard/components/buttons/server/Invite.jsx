import { UserPlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function Invite() {
 return (
  <Link href="/api/invite" className="flex cursor-copy items-center rounded bg-button-secondary px-4 py-2  leading-6 text-white duration-200 hover:bg-button-secondary-hover motion-reduce:transition-none">
   <>
    <UserPlusIcon className="mr-2 h-5 w-5" aria-hidden="true" role="img" />
    Add to server
   </>
  </Link>
 );
}
