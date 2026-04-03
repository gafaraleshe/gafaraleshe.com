import { useRef, useState, type ReactNode } from "react";

interface MagnetProps {
  children: ReactNode;
  padding?: number;
  magnetStrength?: number;
  className?: string;
}

export default function Magnet({
  children,
  padding = 60,
  magnetStrength = 2,
  className = "",
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("translate3d(0,0,0)");

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    const dist = Math.sqrt(distX * distX + distY * distY);
    const maxDist = Math.max(rect.width, rect.height) / 2 + padding;

    if (dist < maxDist) {
      const strength = (1 - dist / maxDist) * magnetStrength;
      setTransform(
        `translate3d(${distX * strength * 0.15}px, ${distY * strength * 0.15}px, 0)`
      );
    }
  };

  const handleMouseLeave = () => {
    setTransform("translate3d(0,0,0)");
  };

  return (
    <div
      ref={ref}
      className={`inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {children}
    </div>
  );
}
