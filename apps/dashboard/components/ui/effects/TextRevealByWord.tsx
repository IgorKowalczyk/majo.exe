"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const Word = ({ children, progress, range }: { children: string; progress: any; range: [number, number] }) => {
 const opacity = useTransform(progress, range, [0, 1]);
 return (
  <span className="relative mx-1 lg:mx-2.5">
   <span className={"absolute opacity-30"}>{children}</span>
   <motion.span style={{ opacity }} className={"text-white"}>
    {children}
   </motion.span>
  </span>
 );
};

export default function TextRevealByWord({ text, className }: { text: string; className?: string }) {
 const targetRef = useRef(null);

 const { scrollYProgress } = useScroll({
  target: targetRef,
 });
 const words = text.split(" ");

 return (
  <div ref={targetRef} className={cn("relative z-0 h-[200vh]", className)}>
   <div className={"sticky top-0 mx-auto flex h-1/2 max-w-4xl items-center bg-transparent px-4 py-20"}>
    <p ref={targetRef} className={"flex flex-wrap p-5 text-2xl font-bold text-white/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl"}>
     {words.map((word, i) => {
      const start = i / words.length;
      const end = start + 1 / words.length;
      return (
       <Word key={`word-${start}-${end}`} progress={scrollYProgress} range={[start, end]}>
        {word}
       </Word>
      );
     })}
    </p>
   </div>
  </div>
 );
}
