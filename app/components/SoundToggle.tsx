"use client";

/* Sound toggle for the hero video.
   Browsers only autoplay muted video, so the video always STARTS muted and
   this is the user gesture that unmutes it. Never start unmuted. */

import { useEffect, useState, type RefObject } from "react";
import { T } from "./system";

export default function SoundToggle({
  videoRef,
  className = "",
}: {
  videoRef: RefObject<HTMLVideoElement | null>;
  className?: string;
}) {
  const [on, setOn] = useState(false);

  /* Keep the element in sync if state changes from anywhere. */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !on;
    if (on) video.play().catch(() => setOn(false));
  }, [on, videoRef]);

  return (
    <button
      type="button"
      onClick={() => setOn((v) => !v)}
      aria-pressed={on}
      aria-label={on ? "Mute background video" : "Unmute background video"}
      className={`group pointer-events-auto flex items-center gap-3 rounded-full border border-white/20 bg-black/40 px-4 py-2.5 backdrop-blur-xl transition-colors duration-500 hover:border-brand-green/50 ${className}`}
    >
      {/* Four bars that animate only when sound is on */}
      <span className="flex h-3 items-end gap-[2px]">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`w-[2px] rounded-full transition-all duration-300 ${
              on ? "bg-brand-green" : "bg-white/50"
            }`}
            style={
              on
                ? {
                    height: "100%",
                    animation: `sound-bar 0.9s ease-in-out ${i * 0.12}s infinite alternate`,
                  }
                : { height: i === 1 || i === 2 ? "40%" : "22%" }
            }
          />
        ))}
      </span>
      <span className={`${T.label} ${on ? "text-brand-green" : ""}`}>
        {on ? "Sound on" : "Sound off"}
      </span>
    </button>
  );
}