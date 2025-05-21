"user-client";

import { useIsomorphicLayoutEffect, animate, useInView } from "framer-motion";
import React from "react";
import { motion, useMotionValue, useTransform } from "motion/react";

type AnimatedCounterProps = {
  target: number;
  duration?: number;
};

const AnimatedCounter = ({ target, duration = 2 }: AnimatedCounterProps) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true }); // run only when ref is visible on screen

  useIsomorphicLayoutEffect(() => {
    const elemt = ref.current;
    if (!elemt || !inView) return;

    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate(value) {
        // Ensure integers
        elemt.textContent = value.toFixed(0);
      },
    });

    return () => {
      controls.stop();
    };
  }, [ref, target, inView]);

  return <span ref={ref} />;
};

export default AnimatedCounter;
