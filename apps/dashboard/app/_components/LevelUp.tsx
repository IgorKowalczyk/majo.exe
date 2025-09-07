"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import Image from "@/components/ui/Image";
import { cn } from "@/lib/utils";

export interface LevelUpProps extends React.ComponentProps<"div"> {
 avatar: string;
 username: string;
}

export const LevelUp = ({ avatar, username, className, ...props }: LevelUpProps) => {
 const [level, setLevel] = useState<number>(2);
 const [xp, setXp] = useState<number>(46);

 const setIt = () => {
  toast("You leveled up!", {
   icon: <span className="text-lg">🔥</span>,
  });
  setLevel(Math.floor(Math.random() * 9 + 1));
  setXp(Math.floor(Math.random() * 80) + 5);
 };

 return (
  <div className={cn("mt-6 flex flex-row items-center gap-1", className)} {...props}>
   <Image src={avatar} alt="User avatar" quality={50} width={40} height={64} className="size-10 shrink-0 self-baseline rounded-full" />
   <span className="ml-2">
    <span className="font-bold">{username}</span> leveled up to <span className="font-bold text-accent-primary [font-feature-settings:'tnum']">level {level}</span>{" "}
    <span onClick={setIt} className="cursor-pointer select-none">
     🔥
    </span>
    <span className="relative mt-3 block h-2 w-full rounded-full bg-[#2b2d31]">
     <span className="absolute inset-0 h-2 rounded-full bg-accent-primary duration-500" style={{ width: `${xp}%` }} />
    </span>
   </span>
  </div>
 );
};
