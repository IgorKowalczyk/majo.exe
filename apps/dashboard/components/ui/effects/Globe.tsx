"use client";

import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";
import { useSpring } from "react-spring";

const convertColor = (array: [number, number, number]): [number, number, number] => {
 return [array[0] / 255, array[1] / 255, array[2] / 255];
};

const GlobeAnimation = () => {
 const canvasRef = useRef<HTMLCanvasElement>(null);
 const pointerInteracting = useRef<number | null>(null);
 const pointerInteractionMovement = useRef(0);

 const [{ r }, api] = useSpring(() => ({
  r: 0,
  config: {
   mass: 1,
   tension: 280,
   friction: 60,
   precision: 0.001,
  },
 }));

 useEffect(() => {
  let phi = 4.25;
  let width = 0;
  let globe: ReturnType<typeof createGlobe> | null | undefined = undefined;
  const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth);
  window.addEventListener("resize", onResize);
  onResize();
  if (canvasRef.current) {
   globe = createGlobe(canvasRef.current, {
    devicePixelRatio: 2,
    width: 750 * 2,
    height: 750 * 2,
    phi,
    theta: 0.35,
    dark: 1,
    diffuse: 2.5,
    scale: 1,
    mapSamples: 10000,
    mapBrightness: 6,
    baseColor: convertColor([127, 127, 127]),
    markerColor: convertColor([230, 230, 230]),
    glowColor: convertColor([16, 15, 16]),
    opacity: 1,
    markers: [
     // Prettier
     { location: [52.22977, 21.01178], size: 0.06 }, // Warsaw
     { location: [50.11552, 8.68417], size: 0.04 }, // Frankfurt
     { location: [37.77493, -122.41942], size: 0.04 }, // San Francisco
     { location: [40.05832, -74.40566], size: 0.04 }, // New Jersey
     { location: [39.96118, -82.99879], size: 0.04 }, // Ohio
     { location: [-33.865143, 151.2099], size: 0.04 }, // Sydney
     { location: [35.6895, 139.69171], size: 0.04 }, // Tokyo
    ],
    onRender: (state) => {
     if (!pointerInteracting.current) {
      phi += 0.002;
     }
     state.phi = phi + r.get();
     state.width = width * 2;
     state.height = width * 2;
    },
   });
   const timeout1 = setTimeout(() => {
    if (canvasRef.current) {
     canvasRef.current.style.opacity = "1";
    }
   });
   return () => {
    if (globe) globe.destroy();
    window.removeEventListener("resize", onResize);
    if (timeout1) clearTimeout(timeout1);
   };
  }
  const timeout2 = setTimeout(() => {
   if (canvasRef.current) {
    canvasRef.current.style.opacity = "1";
   }
  });
  return () => {
   window.removeEventListener("resize", onResize);
   if (timeout2) clearTimeout(timeout2);
  };
 }, []);

 return (
  <canvas
   ref={canvasRef}
   onPointerDown={(e) => {
    pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
    if (canvasRef.current) {
     canvasRef.current.style.cursor = "grabbing";
    }
   }}
   onPointerUp={() => {
    pointerInteracting.current = null;
    if (canvasRef.current) {
     canvasRef.current.style.cursor = "grab";
    }
   }}
   onPointerOut={() => {
    pointerInteracting.current = null;
    if (canvasRef.current) {
     canvasRef.current.style.cursor = "grab";
    }
   }}
   onMouseMove={(e) => {
    if (pointerInteracting.current !== null) {
     const delta = e.clientX - pointerInteracting.current;
     pointerInteractionMovement.current = delta;
     api.start({
      r: delta / 200,
     });
    }
   }}
   onTouchMove={(e) => {
    if (pointerInteracting.current !== null && e.touches[0]) {
     const delta = e.touches[0].clientX - pointerInteracting.current;
     pointerInteractionMovement.current = delta;
     api.start({
      r: delta / 100,
     });
    }
   }}
   style={{ width: 750, height: 750, maxWidth: "100%", aspectRatio: 1, opacity: 0, transition: "opacity 1s ease", margin: 0 }}
  />
 );
};

export default function GlobeClient() {
 const [webglSupported, setWebglSupported] = useState(true);

 useEffect(() => {
  try {
   const canvas = window.document.createElement("canvas");
   const context = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
   console.log("WebGL supported, showing globe animation...");
   if (!context) {
    console.log("WebGL not supported");
    setWebglSupported(false);
    return;
   }
   (context as WebGLRenderingContext).getSupportedExtensions();
  } catch (e) {
   console.log(`WebGL not supported: ${e}`);
   setWebglSupported(false);
   return;
  }
 }, []);

 return webglSupported && <GlobeAnimation />;
}
