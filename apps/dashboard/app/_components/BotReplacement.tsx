"use client";

import { globalConfig } from "@majoexe/config";
import { BotIcon, UserIcon } from "lucide-react";
import avatar from "public/assets/avatar.png";
import React, { useRef } from "react";
import { AnimatedBeam } from "@/components/ui/effects/AnimatedBeam";
import Image from "@/components/ui/Image";
import { cn } from "@/lib/utils";

const Circle = ({ className, children, ...props }: React.ComponentProps<"div">) => {
 return (
  <div className={cn("z-10 flex size-14 items-center justify-center rounded-full border-2 border-neutral-800 bg-background-secondary", className)} {...props}>
   {children}
  </div>
 );
};

export function BotReplacement({ className }: { className?: string }) {
 const containerRef = useRef<HTMLDivElement>(null);
 const div1Ref = useRef<HTMLDivElement>(null);
 const div2Ref = useRef<HTMLDivElement>(null);
 const div3Ref = useRef<HTMLDivElement>(null);

 const div5Ref = useRef<HTMLDivElement>(null);
 const div6Ref = useRef<HTMLDivElement>(null);
 const div7Ref = useRef<HTMLDivElement>(null);

 return (
  <div className={cn("relative flex items-center justify-center overflow-hidden", className)} ref={containerRef}>
   <div className="flex size-full max-w-lg flex-row items-stretch justify-between gap-10">
    <div className="flex flex-col justify-center gap-2">
     <Circle ref={div1Ref}>
      <BotIcon />
     </Circle>
     <Circle ref={div2Ref}>
      <BotIcon />
     </Circle>
     <Circle ref={div3Ref}>
      <BotIcon />
     </Circle>
     <Circle ref={div5Ref}>
      <BotIcon />
     </Circle>
    </div>
    <div className="flex flex-col justify-center">
     <Circle ref={div6Ref} className="size-18">
      <Image src={avatar.src} alt="Majo.exe avatar" quality={40} width={64} height={64} className="size-18 shrink-0 rounded-full" />
     </Circle>
    </div>
    <div className="flex flex-col justify-center">
     <Circle ref={div7Ref}>
      <UserIcon />
     </Circle>
    </div>
   </div>

   <AnimatedBeam containerRef={containerRef} fromRef={div1Ref} toRef={div6Ref} gradientStartColor={globalConfig.defaultColor} gradientStopColor={globalConfig.defaultColor} />
   <AnimatedBeam containerRef={containerRef} fromRef={div2Ref} toRef={div6Ref} gradientStartColor={globalConfig.defaultColor} gradientStopColor={globalConfig.defaultColor} />
   <AnimatedBeam containerRef={containerRef} fromRef={div3Ref} toRef={div6Ref} gradientStartColor={globalConfig.defaultColor} gradientStopColor={globalConfig.defaultColor} />
   <AnimatedBeam containerRef={containerRef} fromRef={div5Ref} toRef={div6Ref} gradientStartColor={globalConfig.defaultColor} gradientStopColor={globalConfig.defaultColor} />
   <AnimatedBeam containerRef={containerRef} fromRef={div6Ref} toRef={div7Ref} gradientStartColor={globalConfig.defaultColor} gradientStopColor={globalConfig.defaultColor} />
  </div>
 );
}
