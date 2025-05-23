"user-client";

import React from "react";
import { animate, useMotionValue, useTransform, useInView } from "motion/react";

type AnimatedCounterProps = {
  target: number;
  duration?: number;
};

const AnimatedCounter = ({ target, duration = 2 }: AnimatedCounterProps) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true }); // run only when ref is visible on screen

  const count = useMotionValue(0);
  const rounded = useTransform(() => Math.round(count.get()));
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;

    const controls = animate(count, target, { duration: duration });
    const unsubscribe = rounded.on("change", (val) => {
      setDisplay(val);
    });
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [ref, inView]);

  return <span ref={ref}>{display}</span>;
};

export default AnimatedCounter;
