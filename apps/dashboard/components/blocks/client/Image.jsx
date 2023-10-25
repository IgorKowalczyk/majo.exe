"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const ImageWithFallback = ({ fallbackImage = "/assets/fallback.webp", alt, src, ...props }) => {
 const [error, setError] = useState(null);

 useEffect(() => {
  setError(null);
 }, [src]);

 return <Image alt={alt} onError={setError} src={error ? fallbackImage : src} {...props} />;
};

export default ImageWithFallback;
