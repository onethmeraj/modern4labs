"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedHeading({ 
  text, 
  className = "" 
}: { 
  text: string; 
  className?: string;
}) {
  const container = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    // 1. Target every individual word inside this specific heading
    gsap.from(".reveal-word", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 85%", // Fires when the text is 85% down the screen
      },
      yPercent: 120,      // Starts pushed down below the mask
      opacity: 0,
      duration: 1.2,
      ease: "expo.out",   // That heavy, premium Awwwards deceleration curve
      stagger: 0.04,      // 0.04s delay between each word popping up
    });
  }, { scope: container });

  return (
    <h2 
      ref={container} 
      className={`flex flex-wrap gap-x-[0.3em] gap-y-[0.1em] leading-[0.95] ${className}`}
    >
      {text.split(" ").map((word, i) => (
        // The Mask (Hides the text while it's pushed down)
        <span key={i} className="overflow-hidden inline-block pb-4 -mb-4 pt-2 -mt-2">
          {/* The Moving Text */}
          <span className="reveal-word inline-block will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </h2>
  );
}