"use client";

/* Cursor-reactive particle constellation.
   Fixed behind all content, pointer-events-none. Nodes drift on their own and
   lean toward the cursor; nearby nodes link with lines whose opacity falls off
   with distance. Canvas, not DOM — 90 nodes as divs would stall the scroll. */

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number };

const COUNT_DESKTOP = 80;
const COUNT_MOBILE = 28;
const LINK_DIST = 130;    /* px between nodes before a line is drawn */
const CURSOR_DIST = 190;  /* px of cursor influence */

export default function CursorField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let raf = 0;

    /* Cursor lives off-canvas until first move, so nothing reacts on load. */
    const pointer = { x: -9999, y: -9999 };

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = width < 768 ? COUNT_MOBILE : COUNT_DESKTOP;
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.5 + 0.7,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        /* Wrap rather than bounce — bouncing makes edges look like walls. */
        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;

        const dx = pointer.x - node.x;
        const dy = pointer.y - node.y;
        const dist = Math.hypot(dx, dy);
        const near = dist < CURSOR_DIST;

        /* Gentle lean toward the cursor, capped so it never swarms. */
        if (near) {
          const pull = (1 - dist / CURSOR_DIST) * 0.35;
          node.x += (dx / dist) * pull;
          node.y += (dy / dist) * pull;
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r + (near ? 0.8 : 0), 0, Math.PI * 2);
        ctx.fillStyle = near
          ? `rgba(36,210,56,${0.35 + (1 - dist / CURSOR_DIST) * 0.55})`
          : "rgba(255,255,255,0.28)";
        ctx.fill();
      }

      /* Links. j = i + 1 so each pair is considered once. */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > LINK_DIST) continue;

          const fade = 1 - d / LINK_DIST;
          const midX = (a.x + b.x) / 2;
          const midY = (a.y + b.y) / 2;
          const lit = Math.hypot(pointer.x - midX, pointer.y - midY) < CURSOR_DIST;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = lit
            ? `rgba(36,210,56,${fade * 0.45})`
            : `rgba(255,255,255,${fade * 0.13})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    const onPointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    build();
    draw();

    window.addEventListener("resize", build);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 hidden opacity-70 md:block"
    />
  );
}