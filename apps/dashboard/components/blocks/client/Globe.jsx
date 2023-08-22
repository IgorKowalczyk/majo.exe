"use client";

import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";
import { useSpring } from "react-spring";

export default function GlobeClient() {
 const [webglSupported, setWebglSupported] = useState(true);

 useEffect(() => {
  try {
   const canvas = window.document.createElement("canvas");
   const context = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
   console.log("WebGL supported, showing globe animation...");
   context.getSupportedExtensions();
  } catch (e) {
   setWebglSupported(false);
   console.log("WebGL not supported, hiding globe animation...");
   return;
  }
 }, []);

 return webglSupported && <GlobeAnimation />;
}

const GlobeAnimation = () => {
 const canvasRef = useRef();
 const pointerInteracting = useRef(null);
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
  const globe = createGlobe(canvasRef.current, {
   devicePixelRatio: 2,
   width: 500 * 2,
   height: 500 * 2,
   phi,
   theta: 0.15,
   dark: 1,
   diffuse: 1.2,
   scale: 1,
   mapSamples: 13000,
   mapBrightness: 6,
   baseColor: [0.5, 0.5, 0.5],
   markerColor: [1, 1, 1],
   glowColor: [0.063, 0.067, 0.063],
   opacity: 0.95,
   markers: [
    // Prettier
    { location: [52.22977, 21.01178], size: 0.06 },
    { location: [50.11552, 8.68417], size: 0.04 },
   ],
   onRender: (state) => {
    phi += 0.002;
    state.phi = phi + r.get();
   },
  });
  setTimeout(() => (canvasRef.current.style.opacity = "1"));
  return () => globe.destroy();
  /* eslint-disable-next-line react-hooks/exhaustive-deps */
 }, []);

 return (
  <canvas
   ref={canvasRef}
   onPointerDown={(e) => {
    pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
    canvasRef.current.style.cursor = "grabbing";
   }}
   onPointerUp={() => {
    pointerInteracting.current = null;
    canvasRef.current.style.cursor = "grab";
   }}
   onPointerOut={() => {
    pointerInteracting.current = null;
    canvasRef.current.style.cursor = "grab";
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
   style={{ width: 500, height: 500, maxWidth: "100%", aspectRatio: 1, opacity: 0, transition: "opacity 1s ease" }}
  />
 );
};
