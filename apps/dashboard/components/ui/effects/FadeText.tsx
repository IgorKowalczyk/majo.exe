"use client";

import { motion, Variants } from "framer-motion";
import React, { useMemo } from "react";

interface FadeTextProps extends React.HTMLAttributes<HTMLDivElement> {
 framerProps?: Variants;
}

export const Fade = React.forwardRef<HTMLDivElement, FadeTextProps>(
 (
  {
   className,
   children,
   framerProps = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { type: "spring" } },
   },
  },
  ref
 ) => {
  const FADE_ANIMATION_VARIANTS = useMemo(() => {
   const { hidden, show, ...rest } = framerProps as {
    [name: string]: { [name: string]: number; opacity: number };
   };

   return {
    ...rest,
    hidden: {
     ...(hidden ?? {}),
     opacity: hidden?.opacity ?? 0,
    },
    show: {
     ...(show ?? {}),
     opacity: show?.opacity ?? 1,
    },
   };
  }, [framerProps]);

  return (
   <motion.div initial="hidden" animate="show" viewport={{ once: true }} variants={FADE_ANIMATION_VARIANTS} className={className} ref={ref}>
    {children}
   </motion.div>
  );
 }
);
