"use client";

import { motion, Variants } from "framer-motion";

import { cn } from "@/lib/utils";

interface WordPullUpProps {
 words: string;
 delayMultiple?: number;
 wrapperFramerProps?: Variants;
 framerProps?: Variants;
 className?: string;
 wordsClassName?: string;
}

export function WordPullUp({
 words,
 wrapperFramerProps = {
  hidden: { opacity: 0 },
  show: {
   opacity: 1,
   transition: {
    staggerChildren: 0.1,
   },
  },
 },
 framerProps = {
  hidden: { y: 10, opacity: 0 },
  show: { y: 0, opacity: 1 },
 },
 className,
 wordsClassName,
}: WordPullUpProps) {
 return (
  <motion.h1 variants={wrapperFramerProps} initial="hidden" animate="show" className={className}>
   {words.split(" ").map((word, i) => (
    <motion.span key={i} variants={framerProps} style={{ display: "inline-block", paddingRight: "8px" }} className={cn("relative", wordsClassName)}>
     {word === "" ? <span>&nbsp;</span> : word}
    </motion.span>
   ))}
  </motion.h1>
 );
}
