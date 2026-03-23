"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import StepIndicator from "./StepIndicator";
import StudentDetailsForm from "./StudentDetailsForm";
import TeamStep from "./TeamStep";
import Path from "@/app/path";

const stepVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 40 : -40,
    scale: 0.98,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -40 : 40,
    scale: 0.98,
  }),
};

export default function OnboardingFlow({
  hasProfile,
  hasTeam,
}: {
  hasProfile: boolean;
  hasTeam: boolean;
}) {
  const router = useRouter();
  const initialStep = hasProfile ? 2 : 1;
  const [step, setStep] = useState(initialStep);
  const [direction, setDirection] = useState(1);

  function handleProfileComplete() {
    setDirection(1);
    setStep(2);
  }

  function handleTeamComplete() {
    router.push(Path[2026].Dashboard);
  }

  return (
    <div>
      <StepIndicator currentStep={step} totalSteps={2} />
      <AnimatePresence mode="wait" custom={direction}>
        {step === 1 && (
          <motion.div
            key="step-1"
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.35,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <StudentDetailsForm onComplete={handleProfileComplete} />
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key="step-2"
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.35,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <TeamStep
              onComplete={handleTeamComplete}
              hasTeam={hasTeam}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
