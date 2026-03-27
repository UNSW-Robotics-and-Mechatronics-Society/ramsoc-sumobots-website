"use client";

import { motion } from "motion/react";
import type { HTMLMotionProps } from "motion/react";

type FadeInProps = {
  /** Delay before this element starts animating (seconds). Use for stagger. */
  delay?: number;
  /** Animation direction. Default: "up" */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Distance to travel in px. Default: 16 */
  distance?: number;
  /** Duration in seconds. Default: 0.4 */
  duration?: number;
  children: React.ReactNode;
} & Omit<HTMLMotionProps<"div">, "initial" | "animate" | "transition">;

const directionMap = {
  up: { y: 1, x: 0 },
  down: { y: -1, x: 0 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
  none: { x: 0, y: 0 },
};

export default function FadeIn({
  delay = 0,
  direction = "up",
  distance = 16,
  duration = 0.4,
  children,
  ...rest
}: FadeInProps) {
  const d = directionMap[direction];

  return (
    <motion.div
      initial={{ opacity: 0, x: d.x * distance, y: d.y * distance }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
