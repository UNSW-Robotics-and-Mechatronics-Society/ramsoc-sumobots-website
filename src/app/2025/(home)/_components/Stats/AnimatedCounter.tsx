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

  // const count = useMotionValue(0);
  // const rounded = useTransform(() => Math.round(count.get()));
  // const [display, setDisplay] = React.useState(0);

  // React.useEffect(() => {
  //   const controls = animate(count, target, { duration: 2 });
  //   const unsubscribe = rounded.on("change", (val) => {
  //     setDisplay(val);
  //   });
  //   return () => {
  //     controls.stop();
  //     unsubscribe();
  //   };
  // }, []);

  // return <span>{display}</span>;
};

export default AnimatedCounter;
