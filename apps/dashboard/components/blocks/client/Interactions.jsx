"use client";

import clsx from "clsx";
import { useState } from "react";
import { toast } from "sonner";
import Image from "@/components/blocks/client/shared/Image";

export function HomepageLevelUp({ logo }) {
 const [level, setLevel] = useState(2);
 const [xp, setXp] = useState(46);

 const setIt = () => {
  toast.success("You leveled up!", {
   icon: <span className="text-lg">🔥</span>,
  });
  setLevel(Math.floor(Math.random() * 9 + 1));
  setXp(Math.floor(Math.random() * 80) + 5);
 };

 return (
  <div className="mt-6 flex flex-row items-center gap-1">
   <Image src={logo} alt="User avatar" quality={95} width={64} height={64} className="min-h-10 min-w-10 h-10 w-10 self-baseline rounded-full" />
   <span className="ml-2">
    <span className="font-bold">Majonez.exe</span> leveled up to <span className="text-accent-primary font-bold [font-feature-settings:'tnum']">level {level}</span>{" "}
    <span onClick={setIt} className="cursor-pointer select-none">
     🔥
    </span>
    <span className="relative mt-2 block h-2 w-full rounded-full bg-[#2b2d31]">
     <span className="bg-accent-primary absolute inset-0 h-2 rounded-full duration-500" style={{ width: `${xp}%` }} />
    </span>
   </span>
  </div>
 );
}

export function AddReaction({ reaction, countL = 2 }) {
 const [clicked, setClicked] = useState(true);
 const [count, setCount] = useState(countL);

 const setIt = () => {
  toast(!clicked ? "Joined the giveaway!" : "Left the giveaway!", {
   icon: <Image src={reaction} alt="Reaction emoji" quality={95} width={16} height={16} className="min-h-4 min-w-4 h-4 w-4" />,
  });
  setClicked(!clicked);
  setCount(clicked ? count - 1 : count + 1);
 };

 return (
  <div
   className={clsx(
    {
     "border-neutral-700": !clicked,
     "border-accent-primary bg-accent-primary/20": clicked,
    },
    "ml-2 mt-2 flex w-fit cursor-pointer select-none flex-row items-center gap-2 rounded-md border px-2 py-1 text-sm duration-100 [font-feature-settings:'tnum']"
   )}
   onClick={() => setIt()}
  >
   <Image src={reaction} alt={"Reaction emoji"} quality={100} width={16} height={16} className="min-h-4 min-w-4 h-4 w-4" />
   <span className="font-bold">{count}</span>
  </div>
 );
}
