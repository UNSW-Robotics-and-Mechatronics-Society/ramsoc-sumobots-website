"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import StepIndicator from "./StepIndicator";
import StudentDetailsForm from "./StudentDetailsForm";
import TeamStep from "./TeamStep";
import Path from "@/app/path";

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

  function handleProfileComplete() {
    setStep(2);
  }

  function handleTeamComplete() {
    router.push(Path[2026].Dashboard);
  }

  return (
    <div>
      <StepIndicator currentStep={step} totalSteps={2} />
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            <StudentDetailsForm onComplete={handleProfileComplete} />
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
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
