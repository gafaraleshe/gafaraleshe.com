'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  stepDuration?: number;
}

export default function BlurText({
  text,
  delay = 0,
  className = '',
  animateBy = 'words',
  direction = 'top',
  stepDuration = 0.35,
}: BlurTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const words = text.split(' ');
  const letters = text.split('');

  const container = {
    hidden: { opacity: 0 },
    visible: (custom: number) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: custom,
      },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: direction === 'top' ? 10 : -10,
      filter: 'blur(10px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: stepDuration,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
      },
    },
  };

  if (!mounted) return null;

  const items = animateBy === 'words' ? words : letters;

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={delay}
    >
      {items.map((item, index) => (
        <motion.span key={index} variants={child} className="inline-block">
          {item}
          {animateBy === 'words' && index < items.length - 1 && ' '}
        </motion.span>
      ))}
    </motion.div>
  );
}
