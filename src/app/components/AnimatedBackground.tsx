"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  baseY: number;
  speed: number;
  amplitude: number;
  phase: number;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    const NUM_LINES = 6;
    const POINTS_PER_LINE = 80;
    let lines: Point[][] = [];
    let width = 0;
    let height = 0;

function resize() {
  if (!canvas) return;
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  initLines();
}
    function initLines() {
      lines = [];
      for (let l = 0; l < NUM_LINES; l++) {
        const points: Point[] = [];
        const baseY = (height / (NUM_LINES + 1)) * (l + 1);
        for (let i = 0; i <= POINTS_PER_LINE; i++) {
          points.push({
            x: (width / POINTS_PER_LINE) * i,
            y: baseY,
            baseY,
            speed: 0.3 + Math.random() * 0.4,
            amplitude: 18 + Math.random() * 28,
            phase: Math.random() * Math.PI * 2,
          });
        }
        lines.push(points);
      }
    }

    function getLineColor(index: number, isDark: boolean): string {
      const opacity = 0.04 + (index / NUM_LINES) * 0.05;
      return isDark
        ? `rgba(255, 255, 255, ${opacity})`
        : `rgba(0, 0, 0, ${opacity})`;
    }

    function getGlowColor(isDark: boolean): string {
      return isDark
        ? `rgba(200, 200, 200, 0.12)`
        : `rgba(80, 80, 80, 0.08)`;
    }

    function isDarkMode(): boolean {
      return document.documentElement.getAttribute("data-theme") !== "light";
    }

    function draw() {
      timeRef.current += 0.008;
      const t = timeRef.current;
      const scroll = scrollRef.current;
      const mouse = mouseRef.current;
      const dark = isDarkMode();

      ctx.clearRect(0, 0, width, height);

      lines.forEach((points, li) => {
        // Update points
        points.forEach((p, i) => {
          const scrollInfluence = (scroll * 0.0008) * (li % 2 === 0 ? 1 : -1);
          const mouseInfluence =
            ((mouse.x / width - 0.5) * 12) * Math.sin((i / POINTS_PER_LINE) * Math.PI);
          const mouseYInfluence =
            ((mouse.y / height - 0.5) * 8) * Math.cos((i / POINTS_PER_LINE) * Math.PI * 2);

          p.y =
            p.baseY +
            Math.sin(t * p.speed + p.phase + i * 0.15) * p.amplitude +
            scrollInfluence * p.amplitude +
            mouseInfluence +
            mouseYInfluence;
        });

        // Draw line
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length - 2; i++) {
          const cpx = (points[i].x + points[i + 1].x) / 2;
          const cpy = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, cpx, cpy);
        }
        ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);

        // Glow pass
        ctx.strokeStyle = getGlowColor(dark);
        ctx.lineWidth = 3;
        ctx.filter = "blur(4px)";
        ctx.stroke();

        // Clean pass
        ctx.filter = "none";
        ctx.strokeStyle = getLineColor(li, dark);
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      frameRef.current = requestAnimationFrame(draw);
    }

    function onScroll() {
      scrollRef.current = window.scrollY;
    }

    function onMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove);
    frameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
