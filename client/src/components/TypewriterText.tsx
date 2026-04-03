import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypewriterTextProps {
  words: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export default function TypewriterText({
  words,
  className = "",
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseDuration = 2000,
}: TypewriterTextProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const currentWord = words[wordIndex];

  const tick = useCallback(() => {
    if (!isDeleting) {
      if (text.length < currentWord.length) {
        setText(currentWord.slice(0, text.length + 1));
      } else {
        setTimeout(() => setIsDeleting(true), pauseDuration);
        return;
      }
    } else {
      if (text.length > 0) {
        setText(currentWord.slice(0, text.length - 1));
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }
  }, [text, isDeleting, currentWord, words.length, pauseDuration]);

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, typingSpeed, deletingSpeed]);

  return (
    <span className={className}>
      <AnimatePresence mode="wait">
        <motion.span
          key={text}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          className="inline"
        >
          {text}
        </motion.span>
      </AnimatePresence>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[2px] h-[1em] bg-sage ml-0.5 align-middle"
        style={{ backgroundColor: "oklch(0.55 0.06 155)" }}
      />
    </span>
  );
}
