"use client";

import React, { forwardRef, useRef } from "react";
import avatar from "public/assets/avatar.png";
import { Icons } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/effects/AnimatedBeam";
import Image from "@/components/ui/Image";
import { globalConfig } from "@majoexe/config";

const Circle = forwardRef<HTMLDivElement, { className?: string; children?: React.ReactNode }>(({ className, children }, ref) => {
 return (
  <div ref={ref} className={cn("z-10 flex size-14 items-center justify-center rounded-full border-2 border-neutral-800 bg-background-secondary shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]", className)}>
   {children}
  </div>
 );
});

Circle.displayName = "Circle";

export function AnimatedBeamMultipleOutputDemo({ className }: { className?: string }) {
 const containerRef = useRef<HTMLDivElement>(null);
 const div1Ref = useRef<HTMLDivElement>(null);
 const div2Ref = useRef<HTMLDivElement>(null);
 const div3Ref = useRef<HTMLDivElement>(null);

 const div5Ref = useRef<HTMLDivElement>(null);
 const div6Ref = useRef<HTMLDivElement>(null);
 const div7Ref = useRef<HTMLDivElement>(null);

 return (
  <div className={cn("relative flex items-center justify-center overflow-hidden", className)} ref={containerRef}>
   <div className="flex size-full flex-row items-stretch justify-between gap-10 max-w-lg">
    <div className="flex flex-col justify-center gap-2">
     <Circle ref={div1Ref}>
      <Icons.Bot />
     </Circle>
     <Circle ref={div2Ref}>
      <Icons.Bot />
     </Circle>
     <Circle ref={div3Ref}>
      <Icons.Bot />
     </Circle>
     <Circle ref={div5Ref}>
      <Icons.Bot />
     </Circle>
    </div>
    <div className="flex flex-col justify-center">
     <Circle ref={div6Ref} className="size-18">
      <Image src={avatar.src} alt="Majo.exe avatar" quality={40} width={64} height={64} className="size-18 shrink-0 rounded-full" />
     </Circle>
    </div>
    <div className="flex flex-col justify-center">
     <Circle ref={div7Ref}>
      <Icons.User />
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
