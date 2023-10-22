import { UserPlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function Invite() {
 return (
  <Link href="/api/invite" className="bg-button-secondary hover:bg-button-secondary-hover flex cursor-copy items-center rounded px-4 py-2 leading-6 text-white duration-200 motion-reduce:transition-none">
   <>
    <UserPlusIcon className="min-h-5 min-w-5 mr-2 h-5 w-5" aria-hidden="true" role="img" />
    Add to server
   </>
  </Link>
 );
}
