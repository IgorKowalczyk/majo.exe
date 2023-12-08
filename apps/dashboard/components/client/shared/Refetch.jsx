"use client";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SecondaryButton } from "@/components/Secondary";

export function Refetch() {
 const router = useRouter();
 const [rotating, setRotating] = useState(false);

 const handleClick = () => {
  setRotating(true);
  router.refresh();
 };

 return (
  <SecondaryButton onClick={handleClick}>
   <ArrowPathIcon
    className={clsx(
     {
      "animate-spin": rotating,
     },
     "min-h-5 min-w-5 mr-2 h-5 w-5"
    )}
    aria-hidden="true"
    role="img"
   />{" "}
   Refetch
  </SecondaryButton>
 );
}
