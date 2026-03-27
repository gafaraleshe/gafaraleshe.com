"use client";

import { useEffect, useRef } from "react";

export default function DotBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SPACING = 40;
    let animationId: number;

    function draw() {
      if (!canvas || !ctx) return;
      
      const width = (canvas.width = window.innerWidth);
      const height = (canvas.height = document.documentElement.scrollHeight);

      ctx.clearRect(0, 0, width, height);

      // Draw stable grid of dots
      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * SPACING;
          const y = r * SPACING;

          const isLight = document.documentElement.getAttribute("data-theme") === "light";
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = isLight ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.15)";
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(draw);
    }

    function handleResize() {
      draw();
    }

    draw();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.7,
      }}
    />
  );
}
