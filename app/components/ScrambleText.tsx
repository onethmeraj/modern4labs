"use client";

/* Scramble / decode text.
   Each character resolves left-to-right at its own pace while the unresolved
   ones churn through random glyphs. One rAF loop, no re-render per frame —
   the DOM node's textContent is written directly. */

import { useEffect, useRef } from "react";

/* Glyphs chosen to read as "machine" without looking like noise.
   Mixing widths (I vs W) makes the line jitter, so keep it mostly narrow. */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\|<>_-=+*#%$&";

export default function ScrambleText({
  words,
  hold = 2200,
  speed = 34,
  align = "center",
  className = "",
}: {
  words: readonly string[];
  hold?: number;      /* ms a fully resolved word stays before the next */
  speed?: number;     /* ms per frame — lower churns faster */
  align?: "left" | "center" | "right";
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || words.length === 0) return;

    /* Reduced motion: no churn, just the word. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = words[0];
      return;
    }

    let index = 0;
    let frame = 0;
    let raf = 0;
    let timeout: ReturnType<typeof setTimeout>;
    let last = 0;

    const run = (from: string, to: string, done: () => void) => {
      const length = Math.max(from.length, to.length);

      /* Each character gets a start and end frame, staggered across the
         word, so it decodes in a wave rather than all at once. */
      const queue = Array.from({ length }, (_, i) => ({
        from: from[i] ?? "",
        to: to[i] ?? "",
        start: Math.floor(Math.random() * 12) + i * 2,
        end: Math.floor(Math.random() * 18) + i * 2 + 14,
        char: "",
      }));

      frame = 0;
      last = 0;

      const tick = (time: number) => {
        if (time - last < speed) {
          raf = requestAnimationFrame(tick);
          return;
        }
        last = time;

        let output = "";
        let complete = 0;

        for (const q of queue) {
          if (frame >= q.end) {
            complete++;
            output += q.to;
          } else if (frame >= q.start) {
            /* Re-roll occasionally, not every frame — constant churn reads
               as static, intermittent churn reads as decoding. */
            if (!q.char || Math.random() < 0.28) {
              q.char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            }
            output += q.char;
          } else {
            output += q.from;
          }
        }

        el.textContent = output;
        frame++;

        if (complete === queue.length) done();
        else raf = requestAnimationFrame(tick);
      };

      raf = requestAnimationFrame(tick);
    };

    const next = () => {
      const from = words[index];
      index = (index + 1) % words.length;
      const to = words[index];

      run(from, to, () => {
        timeout = setTimeout(next, hold);
      });
    };

    el.textContent = words[0];
    timeout = setTimeout(next, hold);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [words, hold, speed]);

  return (
    <span
      ref={ref}
      className={`inline-block tabular-nums ${className}`}
      style={{ textAlign: align }}
      /* Reserve width from the longest word so the line doesn't jump
         as characters change. */
      aria-label={words.join(", ")}
    >
      {words[0]}
    </span>
  );
}