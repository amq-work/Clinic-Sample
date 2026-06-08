"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollGradient() {
  const { scrollYProgress } = useScroll();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Orb 1: Starts top-right, drifts to bottom-left
  const orb1X = useTransform(scrollYProgress, [0, 1], ["60vw", "-20vw"]);
  const orb1Y = useTransform(scrollYProgress, [0, 1], ["-10vh", "80vh"]);

  // Orb 2: Starts middle-left, drifts to bottom-right
  const orb2X = useTransform(scrollYProgress, [0, 1], ["-20vw", "70vw"]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], ["30vh", "90vh"]);

  // Orb 3: Starts bottom-right, drifts to top-left
  const orb3X = useTransform(scrollYProgress, [0, 1], ["80vw", "-10vw"]);
  const orb3Y = useTransform(scrollYProgress, [0, 1], ["70vh", "10vh"]);

  if (!isMounted) return null;

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          width: "700px",
          height: "700px",
          background: "radial-gradient(circle, rgba(96,165,250,0.5) 0%, rgba(255,255,255,0) 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          x: orb1X,
          y: orb1Y,
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(147,197,253,0.3) 0%, rgba(255,255,255,0) 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          x: orb2X,
          y: orb2Y,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(219,234,254,0.4) 0%, rgba(255,255,255,0) 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          x: orb3X,
          y: orb3Y,
        }}
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </div>
  );
}
