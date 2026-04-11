"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import StepIndicator from "./StepIndicator";
import AccountBar from "./AccountBar";
import UserTypeStep from "./UserTypeStep";
import type { UserType } from "./UserTypeStep";
import DivisionStep from "./DivisionStep";
import StudentDetailsForm from "./StudentDetailsForm";
import TeamStep from "./TeamStep";
import { Button } from "@/app/2026/_components/ui/Button";
import Path from "@/app/path";
import type { TeamCategory } from "@/app/2026/_data/teamConfig";

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
  const initialStep = hasProfile ? 3 : 0;
  const [step, setStep] = useState(initialStep);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [division, setDivision] = useState<TeamCategory | null>(null);

  function handleStart() {
    setStep(1);
  }

  function handleUserTypeSelect(type: UserType) {
    setUserType(type);
    if (type === "unsw") {
      // UNSW students pick their division before continuing
      setDivision(null);
    } else {
      // Non-UNSW are always Open
      setDivision("open");
      setStep(2);
    }
  }

  function handleDivisionSelect(div: TeamCategory) {
    setDivision(div);
    setStep(2);
  }

  function handleDivisionBack() {
    setUserType(null);
    setDivision(null);
  }

  function handleProfileComplete() {
    setStep(3);
  }

  function handleTeamComplete() {
    router.push(Path[2026].Dashboard);
  }

  // Within step 1, UNSW users who haven't picked a division yet see DivisionStep
  const showDivisionPicker = step === 1 && userType === "unsw" && !division;

  return (
    <div>
      <AccountBar />
      {step > 0 && <StepIndicator currentStep={step} totalSteps={3} />}
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

        {step === 1 && !showDivisionPicker && (
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
            <UserTypeStep onSelect={handleUserTypeSelect} />
          </motion.div>
        )}

        {showDivisionPicker && (
          <motion.div
            key="step-1-division"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.35,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <DivisionStep
              onSelect={handleDivisionSelect}
              onBack={handleDivisionBack}
            />
          </motion.div>
        )}

        {step === 2 && userType && (
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
            <StudentDetailsForm onComplete={handleProfileComplete} userType={userType} />
          </motion.div>
        )}
        {step === 3 && (
          <motion.div
            key="step-3"
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
              userType={userType ?? "unsw"}
              division={division ?? "open"}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
