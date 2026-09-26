"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AnimatedHeading from "./AnimatedHeading";

// Register the GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Icons
function Share2Icon({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.59 13.51 15.41 17.5" /><path d="M15.41 6.5 8.59 10.49" />
    </svg>
  );
}
function BarChart3Icon({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 3v18h18" /><path d="M7 15v-3" /><path d="M12 15V7" /><path d="M17 15v-6" />
    </svg>
  );
}
function PenToolIcon({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

export default function Services() {
  const container = useRef(null);

  useGSAP(() => {
    // Animate the Cards (Staggered)
    gsap.from(".service-card", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%", 
      },
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2, // Delays each card by 0.2s to create a wave effect
      ease: "power4.out",
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-32 px-6 max-w-7xl mx-auto relative z-10">
      <div className="mb-20">
        <div className="flex items-center gap-4 mb-4">
          <span className="w-12 h-[1px] bg-brand-blue"></span>
          <span className="text-brand-blue font-mono tracking-widest uppercase text-sm">Capabilities</span>
        </div>
        
        {/* INJECTED ANIMATED HEADING */}
        <AnimatedHeading 
          text="SYSTEM PROTOCOLS" 
          className="text-4xl md:text-6xl font-black tracking-tight" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="service-card group bg-neutral-900/50 backdrop-blur-sm border border-white/5 p-10 hover:border-brand-blue/50 transition-all hover:-translate-y-2 cursor-crosshair">
          <Share2Icon className="text-brand-blue mb-8 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" size={40} />
          <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Social Branding</h3>
          <p className="text-neutral-400 text-sm leading-relaxed font-mono">Building cohesive, striking identities across all platforms to capture your target audience.</p>
        </div>
        {/* Card 2 */}
        <div className="service-card group bg-neutral-900/50 backdrop-blur-sm border border-white/5 p-10 hover:border-brand-green/50 transition-all hover:-translate-y-2 cursor-crosshair">
          <BarChart3Icon className="text-brand-green mb-8 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" size={40} />
          <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Lead Generation</h3>
          <p className="text-neutral-400 text-sm leading-relaxed font-mono">Data-driven marketing campaigns designed specifically to convert traffic into paying customers.</p>
        </div>
        {/* Card 3 */}
        <div className="service-card group bg-neutral-900/50 backdrop-blur-sm border border-white/5 p-10 hover:border-brand-blue/50 transition-all hover:-translate-y-2 cursor-crosshair">
          <PenToolIcon className="text-brand-blue mb-8 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" size={40} />
          <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">UI/UX Redesigning</h3>
          <p className="text-neutral-400 text-sm leading-relaxed font-mono">Modernizing outdated websites into fast, responsive, and conversion-optimized digital experiences.</p>
        </div>
      </div>
    </section>
  );
}