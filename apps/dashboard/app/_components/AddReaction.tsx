"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import Image from "@/components/ui/Image";

export function AddReaction({ reaction, countL = 2 }: { reaction: string; countL?: number }) {
 const [clicked, setClicked] = useState<boolean>(true);
 const [count, setCount] = useState<number>(countL);

 const setIt = () => {
  toast(!clicked ? "Joined the giveaway!" : "Left the giveaway!", {
   icon: <Image src={reaction} alt="Reaction emoji" quality={95} width={16} height={16} className="size-4 shrink-0" />,
  });
  setClicked(!clicked);
  setCount(clicked ? count - 1 : count + 1);
 };

 return (
  <div
   className={cn(
    {
     "border-neutral-700": !clicked,
     "border-accent-primary bg-accent-primary/20": clicked,
    },
    "ml-2 mt-2 flex w-fit cursor-pointer select-none flex-row items-center gap-2 rounded-md border px-2 py-1 text-sm duration-100 [font-feature-settings:'tnum']"
   )}
   onClick={() => setIt()}
  >
   <Image src={reaction} alt="Reaction emoji" quality={100} width={16} height={16} className="size-4 shrink-0" />
   <span className="font-bold">{count}</span>
  </div>
 );
}
