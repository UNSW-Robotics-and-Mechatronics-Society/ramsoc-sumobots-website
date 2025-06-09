import React from "react";

// Simple seeded pseudo-random generator
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function Spark({
  className = "",
  style = {},
  animation = "",
  animationDelay = "0s",
  angle = 0,
}) {
  return (
    <div
      className={`absolute ${className}`}
      style={{
        zIndex: 1000,
        transform: `rotate(${angle}deg)`,
        left: 0,
        top: 0,
        ...style,
      }}
    >
      <div
        className="h-0.5 w-6 rounded-full"
        style={{
          background: "#fff",
          animation,
          animationDelay,
          opacity: 0,
        }}
      />
    </div>
  );
}

export function SparkBurst({
  count = 20,
  origin = { left: "50%", top: "50%" },
  minAngle = 0,
  maxAngle = 360,
  baseAngle = 0,
  seed = 42, // Add a seed prop for deterministic output
}) {
  const animationDuration = 1.5;

  const sparks = Array.from({ length: count }).map((_, i) => {
    // Use seededRandom instead of Math.random
    const rand = seededRandom(seed + i);
    let angleDeg = baseAngle + minAngle + rand * (maxAngle - minAngle);
    angleDeg = Math.round(angleDeg * 100) / 100; // Round to 2 decimal places
    const distance = 100;
    const delay = (i / count) * animationDuration;

    const animName = `sparkLinear${i}`;
    const keyframes = `
      @keyframes ${animName} {
        0% {
          opacity: 0;
          background: #fff;
          transform: translateX(0px) scaleX(0.2) scaleY(1);
        }
        9% { opacity: 0; }
        10% { opacity: 1; }
        60% {
          background: #fff700;
          transform: translateX(${distance * 0.7}px) scaleX(0.6) scaleY(1);
        }
        100% {
          background: #ea580c;
          opacity: 0;
          transform: translateX(${distance}px) scaleX(1) scaleY(1);
        }
      }
    `;

    return {
      className: `spark-time-gradient spark-${i}`,
      style: {
        pointerEvents: "none",
        animationDelay: `${delay}s`,
        animationFillMode: "forwards",
      },
      animation: `${animName} ${animationDuration}s linear infinite`,
      keyframes,
      key: i,
      angle: angleDeg,
    };
  });

  const allKeyframes = sparks.map((s) => s.keyframes).join("\n");

  return (
    <div
      style={{
        position: "absolute",
        zIndex: -1,
        overflow: "visible",
        left:
          typeof origin.left === "number" ? `${origin.left}px` : origin.left,
        top: typeof origin.top === "number" ? `${origin.top}px` : origin.top,
      }}
    >
      {sparks.map((spark) => (
        <Spark
          key={spark.key}
          className={spark.className}
          style={spark.style}
          animation={spark.animation}
          animationDelay={spark.style.animationDelay}
          angle={spark.angle}
        />
      ))}
      <style jsx global>
        {allKeyframes}
      </style>
    </div>
  );
}

export default Spark;
