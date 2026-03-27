"use client";

import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { createProfile } from "@/app/2026/_actions/profile";
import Input from "@/app/2026/_components/ui/Input";
import Select from "@/app/2026/_components/ui/Select";
import { Button } from "@/app/2026/_components/ui/Button";

const YEAR_OPTIONS = [
  { value: "1st Year", label: "1st Year" },
  { value: "2nd Year", label: "2nd Year" },
  { value: "3rd Year", label: "3rd Year" },
  { value: "4th Year", label: "4th Year" },
  { value: "5th Year+", label: "5th Year+" },
  { value: "Postgraduate", label: "Postgraduate" },
  { value: "Penultimate", label: "Penultimate" },
  { value: "Pre-penultimate", label: "Pre-penultimate" },
  { value: "Final Year", label: "Final Year" },
];

const FACULTY_OPTIONS = [
  { value: "Arts, Design & Architecture", label: "Arts, Design & Architecture" },
  { value: "Business", label: "Business" },
  { value: "Engineering", label: "Engineering" },
  { value: "Law & Justice", label: "Law & Justice" },
  { value: "Medicine & Health", label: "Medicine & Health" },
  { value: "Science", label: "Science" },
  { value: "Other", label: "Other" },
];

const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non-binary", label: "Non-binary" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
  { value: "other", label: "Other" },
];

type FieldErrors = Record<string, string>;

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

function CheckboxGroup({
  label,
  options,
  selected,
  onChange,
  error,
}: {
  label: string;
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
  error?: string;
}) {
  function toggle(value: string) {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-main text-sm text-gray-300">{label} <span className="text-rose-400">*</span></span>
      <div className="grid grid-cols-2 gap-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`font-main flex min-h-[44px] cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm transition-colors ${
              selected.includes(opt.value)
                ? "border-rose-500 bg-rose-500/10 text-white"
                : "border-white/10 bg-white/5 text-gray-300 hover:border-white/20"
            }`}
          >
            <input
              type="checkbox"
              checked={selected.includes(opt.value)}
              onChange={() => toggle(opt.value)}
              className="h-4 w-4 rounded accent-rose-600"
            />
            {opt.label}
          </label>
        ))}
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
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
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [gender, setGender] = useState("");
  const [genderOther, setGenderOther] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const markTouched = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const validateField = useCallback(
    (name: string, value: string) => {
      setFieldErrors((prev) => {
        const next = { ...prev };
        switch (name) {
          case "full_name":
            if (!value.trim()) next.full_name = "Full name is required";
            else delete next.full_name;
            break;
          case "zid":
            if (!value.trim()) next.zid = "zID is required";
            else if (!/^z\d{7}$/.test(value)) next.zid = "Format: z1234567";
            else delete next.zid;
            break;
          case "university":
            if (!value.trim()) next.university = "University is required";
            else delete next.university;
            break;
          case "degree":
            if (!value.trim()) next.degree = "Degree is required";
            else delete next.degree;
            break;
          case "majors":
            delete next.majors;
            break;
          case "faculty":
            if (!value) next.faculty = "Faculty is required";
            else delete next.faculty;
            break;
          case "gender":
            if (!value) next.gender = "Gender is required";
            else delete next.gender;
            break;
          case "gender_other":
            if (gender === "other" && !value.trim())
              next.gender_other = "Please specify";
            else delete next.gender_other;
            break;
          case "phone":
            if (!value.trim()) next.phone = "Phone number is required";
            else delete next.phone;
            break;
        }
        return next;
      });
    },
    [gender],
  );

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    markTouched(name);
    validateField(name, value);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    if (touched[name]) {
      validateField(name, value);
    }
  }

  function validateAll(form: FormData): boolean {
    const errors: FieldErrors = {};

    const fullName = (form.get("full_name") as string) || "";
    if (!fullName.trim()) errors.full_name = "Full name is required";

    if (isUnsw) {
      const zid = (form.get("zid") as string) || "";
      if (!zid.trim()) errors.zid = "zID is required";
      else if (!/^z\d{7}$/.test(zid)) errors.zid = "Format: z1234567";
    } else {
      const uni = (form.get("university") as string) || "";
      if (!uni.trim()) errors.university = "University is required";
    }

    if (selectedYears.length === 0) errors.year_of_study = "Select at least one";

    const degree = (form.get("degree") as string) || "";
    if (!degree.trim()) errors.degree = "Degree is required";

    const faculty = (form.get("faculty") as string) || "";
    if (!faculty) errors.faculty = "Faculty is required";

    if (!gender) errors.gender = "Gender is required";
    if (gender === "other" && !genderOther.trim())
      errors.gender_other = "Please specify";

    const phone = (form.get("phone") as string) || "";
    if (!phone.trim()) errors.phone = "Phone number is required";

    setFieldErrors(errors);
    // Mark all as touched
    setTouched({
      full_name: true,
      zid: true,
      university: true,
      degree: true,
      faculty: true,
      gender: true,
      gender_other: true,
      phone: true,
      year_of_study: true,
    });

    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    if (!validateAll(form)) return;

    setLoading(true);
    setError("");

    const result = await createProfile({
      full_name: form.get("full_name") as string,
      is_unsw: isUnsw,
      university: isUnsw ? "UNSW" : (form.get("university") as string),
      zid: isUnsw ? (form.get("zid") as string) : "",
      year_of_study: selectedYears.join(", "),
      degree: (form.get("degree") as string) || "",
      majors: (form.get("majors") as string) || "",
      faculty: (form.get("faculty") as string) || "",
      gender: gender,
      gender_other: gender === "other" ? genderOther : "",
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
        <Input
          label="Full Name"
          name="full_name"
          required
          autoComplete="name"
          onBlur={handleBlur}
          onChange={handleChange}
          error={touched.full_name ? fieldErrors.full_name : undefined}
        />
      </Field>

      <Field delay={0.15}>
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

      <Field delay={0.2}>
        {isUnsw ? (
          <Input
            label="zID"
            name="zid"
            placeholder="z1234567"
            required
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.zid ? fieldErrors.zid : undefined}
          />
        ) : (
          <Input
            label="University"
            name="university"
            required
            placeholder="e.g. University of Sydney"
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.university ? fieldErrors.university : undefined}
          />
        )}
      </Field>

      <Field delay={0.25}>
        <CheckboxGroup
          label="Year of Study"
          options={YEAR_OPTIONS}
          selected={selectedYears}
          onChange={(vals) => {
            setSelectedYears(vals);
            if (touched.year_of_study) {
              setFieldErrors((prev) => {
                const next = { ...prev };
                if (vals.length === 0) next.year_of_study = "Select at least one";
                else delete next.year_of_study;
                return next;
              });
            }
          }}
          error={touched.year_of_study ? fieldErrors.year_of_study : undefined}
        />
      </Field>

      <Field delay={0.3}>
        <Input
          label="Degree"
          name="degree"
          required
          placeholder="e.g. B.Eng (Mechatronics)"
          onBlur={handleBlur}
          onChange={handleChange}
          error={touched.degree ? fieldErrors.degree : undefined}
        />
      </Field>

      <Field delay={0.35}>
        <Input
          label="Majors (if applicable)"
          name="majors"
          placeholder="e.g. Mechanical Engineering"
        />
      </Field>

      <Field delay={0.4}>
        <Select
          label="Faculty"
          name="faculty"
          options={FACULTY_OPTIONS}
          placeholder="Select faculty"
          required
          defaultValue=""
          onBlur={handleBlur}
          onChange={(e) => {
            handleChange(e);
            markTouched("faculty");
            validateField("faculty", e.target.value);
          }}
          error={touched.faculty ? fieldErrors.faculty : undefined}
        />
      </Field>

      <Field delay={0.45}>
        <Select
          label="Gender"
          name="gender"
          options={GENDER_OPTIONS}
          placeholder="Select gender"
          required
          value={gender}
          onChange={(e) => {
            setGender(e.target.value);
            markTouched("gender");
            validateField("gender", e.target.value);
            if (e.target.value !== "other") {
              setGenderOther("");
              setFieldErrors((prev) => {
                const next = { ...prev };
                delete next.gender_other;
                return next;
              });
            }
          }}
          error={touched.gender ? fieldErrors.gender : undefined}
        />
      </Field>

      {gender === "other" && (
        <Field delay={0}>
          <Input
            label="Please specify"
            name="gender_other"
            required
            value={genderOther}
            onChange={(e) => {
              setGenderOther(e.target.value);
              if (touched.gender_other) {
                validateField("gender_other", e.target.value);
              }
            }}
            onBlur={(e) => {
              markTouched("gender_other");
              validateField("gender_other", e.target.value);
            }}
            error={touched.gender_other ? fieldErrors.gender_other : undefined}
          />
        </Field>
      )}

      <Field delay={0.5}>
        <Input
          label="Phone Number"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="04XX XXX XXX"
          onBlur={handleBlur}
          onChange={handleChange}
          error={touched.phone ? fieldErrors.phone : undefined}
        />
      </Field>

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      <div className="sticky bottom-4 mt-4 pt-4">
        <Button type="submit" size="full" disabled={loading} loading={loading}>
          Continue
        </Button>
      </div>
    </form>
  );
}
