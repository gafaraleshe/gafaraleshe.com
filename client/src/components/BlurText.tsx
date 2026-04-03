import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "up" | "down";
  stepDuration?: number;
}

export default function BlurText({
  text,
  className = "",
  delay = 0.05,
  animateBy = "words",
  direction = "up",
  stepDuration = 0.4,
}: BlurTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const tokens =
    animateBy === "words" ? text.split(" ") : text.split("");

  const yFrom = direction === "up" ? 20 : -20;

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {tokens.map((token, i) => (
        <motion.span
          key={`${token}-${i}`}
          initial={{ opacity: 0, y: yFrom, filter: "blur(8px)" }}
          animate={
            isInView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: yFrom, filter: "blur(8px)" }
          }
          transition={{
            duration: stepDuration,
            delay: i * delay,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
          style={{ marginRight: animateBy === "words" ? "0.3em" : undefined }}
        >
          {token}
        </motion.span>
      ))}
    </span>
  );
}
