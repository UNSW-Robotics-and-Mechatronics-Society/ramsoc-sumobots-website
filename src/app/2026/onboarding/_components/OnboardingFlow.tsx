"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import StepIndicator from "./StepIndicator";
import StudentDetailsForm from "./StudentDetailsForm";
import TeamStep from "./TeamStep";
import { Button } from "@/app/2026/_components/ui/Button";
import Path from "@/app/path";

const stepVariants = {
  enter: {
    opacity: 0,
    y: 30,
  },
  center: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
};

export default function OnboardingFlow({
  hasProfile,
  hasTeam,
}: {
  hasProfile: boolean;
  hasTeam: boolean;
}) {
  const router = useRouter();
  const initialStep = hasProfile ? 2 : 0;
  const [step, setStep] = useState(initialStep);
  function handleStart() {
    setStep(1);
  }

  function handleProfileComplete() {
    setStep(2);
  }

  function handleTeamComplete() {
    router.push(Path[2026].Dashboard);
  }

  return (
    <div>
      {step > 0 && <StepIndicator currentStep={step} totalSteps={2} />}
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col items-center py-4 text-center"
          >
            <motion.p
              className="font-main mb-2 text-sm tracking-widest text-rose-400 uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              RAMSoc UNSW presents
            </motion.p>
            <motion.h1
              className="mb-3 text-4xl sm:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Sumobots 2026
            </motion.h1>
            <motion.p
              className="font-main mb-10 max-w-xs text-sm text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Build a sumo robot and compete against other teams. Register below to get started.
            </motion.p>
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.4 }}
            >
              <Button size="full" onClick={handleStart}>
                Get Started
              </Button>
            </motion.div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step-1"
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
