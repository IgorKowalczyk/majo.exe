import Link from "next/link";
import { UserAddIcon } from "@heroicons/react/outline";

export function Invite() {
 return (
  <Link href="/invite">
   <a href="/invite" className="flex cursor-pointer items-center rounded px-5 py-2 font-poppins leading-6 text-white duration-200 bg-button-secondary hover:bg-button-secondary-hover motion-reduce:transition-none">
    <UserAddIcon className="mr-2 h-5 w-5" aria-hidden="true" role="img" />
    Add to server
   </a>
  </Link>
 );
}
