"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
 const animations = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1, originY: 0 },
  exit: { scale: 0, opacity: 0 },
  transition: { type: "spring", stiffness: 350, damping: 40 },
 };

 return (
  <motion.div {...animations} layout className="mx-auto w-full">
   {children}
  </motion.div>
 );
}

export interface AnimatedListProps {
 className?: string;
 children: React.ReactNode;
 delay?: number;
}

export const AnimatedList = React.memo(({ className, children, delay = 1000 }: AnimatedListProps) => {
 const [index, setIndex] = useState(0);
 const childrenArray = useMemo(() => {
  const result: React.ReactNode[] = [];
  /* eslint-disable-next-line @eslint-react/no-children-for-each */
  React.Children.forEach(children, (child) => {
   result.push(child);
  });
  return result;
 }, [children]);

 useEffect(() => {
  if (index < childrenArray.length - 1) {
   const timeout = setTimeout(() => {
    setIndex((prevIndex) => prevIndex + 1);
   }, delay);

   return () => clearTimeout(timeout);
  }
 }, [index, delay, childrenArray.length]);

 const itemsToShow = useMemo(() => {
  const result = childrenArray.slice(0, index + 1).reverse();
  return result;
 }, [index, childrenArray]);

 return (
  <div className={`flex flex-col items-center gap-3 ${className}`}>
   <AnimatePresence>
    {itemsToShow.map((item) => (
     <AnimatedListItem key={(item as React.ReactElement).key}>{item}</AnimatedListItem>
    ))}
   </AnimatePresence>
  </div>
 );
});

AnimatedList.displayName = "AnimatedList";
