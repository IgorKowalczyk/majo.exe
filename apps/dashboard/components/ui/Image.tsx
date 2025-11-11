"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface ImageWithFallbackProps extends Omit<React.ComponentProps<typeof Image>, "src"> {
  fallbackImage?: string;
  src: string;
}

const ImageWithFallback = ({ fallbackImage = "/assets/fallback.webp", src, ...props }: ImageWithFallbackProps) => {
  const [error, setError] = useState<boolean | null>(null);

  useEffect(() => {
    setError(null);
  }, [src]);

  return <Image onError={() => setError(null)} src={error ? fallbackImage : src} {...props} alt={props.alt || "Image"} />;
};

export default ImageWithFallback;
