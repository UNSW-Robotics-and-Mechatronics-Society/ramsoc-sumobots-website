import React from "react";

// Simple seeded pseudo-random generator
function seededRandom(seed: number) {
  let x = Math.sin(seed) * 10000;
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
        className="w-6 h-0.5 rounded-full"
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
        left: typeof origin.left === "number" ? `${origin.left}px` : origin.left,
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
      <style jsx global>{allKeyframes}</style>
    </div>
  );
}

export default Spark;

{/* Place this style block ONCE in your page or layout (not in every Spark) */}
/*
<style jsx global>{`
  .spark-time-gradient {
    background: #fefce8;
  }
  @keyframes parabolaSpark {
    0% {
      opacity: 1;
      background: #fefce8;
      transform: translate(0, 0) scale(0.3, 0.3) rotate(0deg);
    }
    20% {
      background: #fef08a;
      opacity: 1;
      transform: translate(10px, -18px) scale(0.5, 0.5) rotate(20deg);
    }
    40% {
      background: #fde047;
      opacity: 0.9;
      transform: translate(22px, -32px) scale(0.7, 0.7) rotate(40deg);
    }
    60% {
      background: #fbbf24;
      opacity: 0.7;
      transform: translate(36px, -40px) scale(0.9, 1) rotate(60deg);
    }
    80% {
      background: #f59e42;
      opacity: 0.4;
      transform: translate(50px, -44px) scale(1.1, 1.2) rotate(80deg);
    }
    100% {
      background: #ea580c;
      opacity: 0;
      transform: translate(65px, -45px) scale(1.3, 1.5) rotate(100deg);
    }
  }
`}</style>
*/