"use client";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { SecondaryButton } from "@/components/buttons/Secondary";

export function Refetch() {
 const router = useRouter();

 return (
  <SecondaryButton onClick={() => router.refresh()}>
   <ArrowPathIcon className="mr-2 h-5 w-5" aria-hidden="true" role="img" /> Refetch
  </SecondaryButton>
 );
}
