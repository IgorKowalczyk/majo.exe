"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const ImageWithFallback = ({ fallbackImage = "/assets/fallback.webp", src, ...props }: { fallbackImage?: string; src: string } & React.ComponentProps<typeof Image>) => {
 const [error, setError] = useState<boolean | null>(null);

 useEffect(() => {
  setError(null);
 }, [src]);

 return <Image onError={() => setError(null)} src={error ? fallbackImage : src} {...props} />;
};

export default ImageWithFallback;
