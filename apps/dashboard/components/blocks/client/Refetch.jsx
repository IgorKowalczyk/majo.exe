"use client";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { SecondaryButton } from "@/components/buttons/Secondary";
import { useState } from "react";
import clsx from "clsx";

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
     "mr-2 h-5 w-5"
    )}
    aria-hidden="true"
    role="img"
   />{" "}
   Refetch
  </SecondaryButton>
 );
}