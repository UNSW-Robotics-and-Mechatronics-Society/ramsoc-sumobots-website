"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { createProfile } from "@/app/2026/_actions/profile";
import Input from "@/app/2026/_components/ui/Input";
import Select from "@/app/2026/_components/ui/Select";
import { Button } from "@/app/2026/_components/ui/Button";

const YEAR_OPTIONS = [
  { value: "1", label: "1st Year" },
  { value: "2", label: "2nd Year" },
  { value: "3", label: "3rd Year" },
  { value: "4", label: "4th Year" },
  { value: "5", label: "5th Year+" },
  { value: "0", label: "Postgraduate" },
];

const GENDER_OPTIONS = [
  { value: "", label: "Prefer not to say" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non-binary", label: "Non-binary" },
  { value: "other", label: "Other" },
];

function Field({ delay, children }: { delay: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

export default function StudentDetailsForm({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [isUnsw, setIsUnsw] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);

    const result = await createProfile({
      full_name: form.get("full_name") as string,
      is_unsw: isUnsw,
      university: isUnsw ? "UNSW" : (form.get("university") as string),
      zid: isUnsw ? (form.get("zid") as string) : "",
      year_of_study: form.get("year_of_study")
        ? Number(form.get("year_of_study"))
        : null,
      degree: (form.get("degree") as string) || "",
      faculty: (form.get("faculty") as string) || "",
      gender: (form.get("gender") as string) || "",
      dietary_requirements:
        (form.get("dietary_requirements") as string) || "",
      phone: (form.get("phone") as string) || "",
    });

    setLoading(false);

    if (result.success) {
      onComplete();
    } else {
      setError(result.error || "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field delay={0.1}>
        <Input label="Full Name" name="full_name" required autoComplete="name" />
      </Field>

      <Field delay={0.2}>
        <div className="flex items-center gap-3">
          <label className="font-main flex min-h-[44px] cursor-pointer items-center gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={isUnsw}
              onChange={(e) => setIsUnsw(e.target.checked)}
              className="h-5 w-5 rounded accent-rose-600"
            />
            I am a UNSW student
          </label>
        </div>
      </Field>

      <Field delay={0.3}>
        {isUnsw ? (
          <Input
            label="zID"
            name="zid"
            placeholder="z1234567"
            required
            pattern="z\d{7}"
            title="zID must be in the format z1234567"
          />
        ) : (
          <Input
            label="University"
            name="university"
            required
            placeholder="e.g. University of Sydney"
          />
        )}
      </Field>

      <Field delay={0.4}>
        <Select
          label="Year of Study"
          name="year_of_study"
          options={YEAR_OPTIONS}
          placeholder="Select year"
          defaultValue=""
        />
      </Field>

      <Field delay={0.5}>
        <Input label="Degree" name="degree" placeholder="e.g. B.Eng (Mechatronics)" />
      </Field>

      <Field delay={0.6}>
        <Input label="Faculty" name="faculty" placeholder="e.g. Engineering" />
      </Field>

      <Field delay={0.7}>
        <Select
          label="Gender"
          name="gender"
          options={GENDER_OPTIONS}
          defaultValue=""
        />
      </Field>

      <Field delay={0.8}>
        <Input
          label="Dietary Requirements"
          name="dietary_requirements"
          placeholder="e.g. Vegetarian, Halal"
        />
      </Field>

      <Field delay={0.9}>
        <Input
          label="Phone Number"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="04XX XXX XXX"
        />
      </Field>

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      <Field delay={1.0}>
        <div className="sticky bottom-4 mt-4 pt-4">
          <Button type="submit" size="full" disabled={loading}>
            {loading ? "Saving..." : "Continue"}
          </Button>
        </div>
      </Field>
    </form>
  );
}
