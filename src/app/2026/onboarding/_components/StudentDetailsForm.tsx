"use client";

import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { createProfile } from "@/app/2026/_actions/profile";
import Input from "@/app/2026/_components/ui/Input";
import Select from "@/app/2026/_components/ui/Select";
import { Button } from "@/app/2026/_components/ui/Button";
import type { UserType } from "./UserTypeStep";

const YEAR_OPTIONS = [
  { value: "1st Year", label: "1st Year" },
  { value: "2nd Year", label: "2nd Year" },
  { value: "3rd Year", label: "3rd Year" },
  { value: "4th Year", label: "4th Year" },
  { value: "5th Year+", label: "5th Year+" },
];

const DEGREE_STAGE_OPTIONS = [
  { value: "Pre-penultimate", label: "Pre-penultimate (3rd-last year or earlier)" },
  { value: "Penultimate", label: "Penultimate (2nd-last year)" },
  { value: "Final Year", label: "Final year" },
];

const UNDERGRAD_POSTGRAD_OPTIONS = [
  { value: "Undergraduate", label: "Undergraduate" },
  { value: "Postgraduate", label: "Postgraduate" },
];

const DOMESTIC_INTL_OPTIONS = [
  { value: "Domestic", label: "Domestic" },
  { value: "International", label: "International" },
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
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "non-binary", label: "Non-binary" },
  { value: "other", label: "Other" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
];

const HEARD_FROM_OPTIONS = [
  { value: "discord", label: "Discord" },
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "poster", label: "Poster" },
  { value: "friend", label: "Friend" },
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

function RadioGroup({
  label,
  name,
  options,
  value,
  onChange,
  error,
  required,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-main text-sm text-muted-foreground">
        {label}{required && <span className="text-destructive"> *</span>}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`font-main flex min-h-[44px] cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm transition-all ${
              value === opt.value
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-secondary text-muted-foreground hover:border-primary/30 hover:bg-secondary/80"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="h-4 w-4 accent-primary"
            />
            {opt.label}
          </label>
        ))}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function CheckboxGroup({
  label,
  options,
  selected,
  onChange,
  error,
  required,
}: {
  label: string;
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
  error?: string;
  required?: boolean;
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
      <span className="font-main text-sm text-muted-foreground">
        {label}{required && <span className="text-destructive"> *</span>}
      </span>
      <div className="grid grid-cols-2 gap-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`font-main flex min-h-[44px] cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm transition-all ${
              selected.includes(opt.value)
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-secondary text-muted-foreground hover:border-primary/30 hover:bg-secondary/80"
            }`}
          >
            <input
              type="checkbox"
              checked={selected.includes(opt.value)}
              onChange={() => toggle(opt.value)}
              className="h-4 w-4 rounded accent-primary"
            />
            {opt.label}
          </label>
        ))}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function YesNoToggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className={`font-main flex min-h-[44px] cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition-all ${
      value
        ? "border-primary bg-primary/10 text-foreground"
        : "border-border bg-secondary text-muted-foreground hover:border-primary/30 hover:bg-secondary/80"
    }`}>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 rounded accent-primary"
      />
      {label}
    </label>
  );
}

export default function StudentDetailsForm({
  onComplete,
  userType,
}: {
  onComplete: () => void;
  userType: UserType;
}) {
  const isUnsw = userType === "unsw";
  const isHighSchool = userType === "high_school";
  const isOtherUni = userType === "other_uni";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [degreeStage, setDegreeStage] = useState("");
  const [undergradPostgrad, setUndergradPostgrad] = useState("");
  const [domesticIntl, setDomesticIntl] = useState("");
  const [selectedFaculties, setSelectedFaculties] = useState<string[]>([]);
  const [facultyOther, setFacultyOther] = useState("");
  const [gender, setGender] = useState("");
  const [genderOther, setGenderOther] = useState("");
  const [isRamsocMember, setIsRamsocMember] = useState(false);
  const [isArcMember, setIsArcMember] = useState(false);
  const [heardFrom, setHeardFrom] = useState("");
  const [heardFromOther, setHeardFromOther] = useState("");
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
          case "uni_id":
            if (!value.trim()) next.uni_id = "University ID is required";
            else delete next.uni_id;
            break;
          case "high_school":
            if (!value.trim()) next.high_school = "High school is required";
            else delete next.high_school;
            break;
          case "year_of_study":
            if (!value) next.year_of_study = "Year of study is required";
            else delete next.year_of_study;
            break;
          case "degree_stage":
            if (!value) next.degree_stage = "Degree stage is required";
            else delete next.degree_stage;
            break;
          case "undergrad_postgrad":
            if (!value) next.undergrad_postgrad = "This field is required";
            else delete next.undergrad_postgrad;
            break;
          case "domestic_international":
            if (!value) next.domestic_international = "This field is required";
            else delete next.domestic_international;
            break;
          case "degree":
            if (!value.trim()) next.degree = "Degree is required";
            else delete next.degree;
            break;
          case "faculty":
            break;
          case "faculty_other":
            if (selectedFaculties.includes("Other") && !value.trim())
              next.faculty_other = "Please specify your faculty";
            else delete next.faculty_other;
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
          case "heard_from":
            if (!value) next.heard_from = "This field is required";
            else delete next.heard_from;
            break;
          case "heard_from_other":
            if (heardFrom === "other" && !value.trim())
              next.heard_from_other = "Please specify";
            else delete next.heard_from_other;
            break;
          case "phone":
            if (!value.trim()) next.phone = "Phone number is required";
            else delete next.phone;
            break;
        }
        return next;
      });
    },
    [gender, selectedFaculties, heardFrom],
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
    } else if (isOtherUni) {
      const uni = (form.get("university") as string) || "";
      if (!uni.trim()) errors.university = "University is required";
      const uniId = (form.get("uni_id") as string) || "";
      if (!uniId.trim()) errors.uni_id = "University ID is required";
    } else if (isHighSchool) {
      const hs = (form.get("high_school") as string) || "";
      if (!hs.trim()) errors.high_school = "High school is required";
    }

    // University-specific fields only required for uni students
    if (!isHighSchool) {
      if (!yearOfStudy) errors.year_of_study = "Year of study is required";
      if (!degreeStage) errors.degree_stage = "Degree stage is required";
      if (!undergradPostgrad) errors.undergrad_postgrad = "This field is required";
      if (!domesticIntl) errors.domestic_international = "This field is required";

      const degree = (form.get("degree") as string) || "";
      if (!degree.trim()) errors.degree = "Degree is required";

      if (selectedFaculties.length === 0) errors.faculty = "Select at least one faculty";
      if (selectedFaculties.includes("Other") && !facultyOther.trim())
        errors.faculty_other = "Please specify your faculty";
    }

    if (!gender) errors.gender = "Gender is required";
    if (gender === "other" && !genderOther.trim())
      errors.gender_other = "Please specify";

    if (!heardFrom) errors.heard_from = "This field is required";
    if (heardFrom === "other" && !heardFromOther.trim())
      errors.heard_from_other = "Please specify";

    const phone = (form.get("phone") as string) || "";
    if (!phone.trim()) errors.phone = "Phone number is required";

    setFieldErrors(errors);
    setTouched({
      full_name: true,
      zid: true,
      university: true,
      uni_id: true,
      high_school: true,
      year_of_study: true,
      degree_stage: true,
      undergrad_postgrad: true,
      domestic_international: true,
      degree: true,
      faculty: true,
      faculty_other: true,
      gender: true,
      gender_other: true,
      heard_from: true,
      heard_from_other: true,
      phone: true,
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
      user_type: userType,
      is_unsw: isUnsw,
      university: isUnsw
        ? "UNSW"
        : isOtherUni
          ? (form.get("university") as string)
          : "",
      zid: isUnsw ? (form.get("zid") as string) : "",
      uni_id: isOtherUni ? (form.get("uni_id") as string) : "",
      high_school: isHighSchool ? (form.get("high_school") as string) : "",
      year_of_study: isHighSchool ? "" : yearOfStudy,
      degree_stage: isHighSchool ? "" : degreeStage,
      undergrad_postgrad: isHighSchool ? "" : undergradPostgrad,
      domestic_international: isHighSchool ? "" : domesticIntl,
      degree: isHighSchool ? "" : ((form.get("degree") as string) || ""),
      majors: isHighSchool ? "" : ((form.get("majors") as string) || ""),
      faculty: isHighSchool
        ? ""
        : selectedFaculties
            .map((f) => (f === "Other" ? facultyOther.trim() : f))
            .join(", "),
      gender: gender,
      gender_other: gender === "other" ? genderOther : "",
      is_ramsoc_member: isUnsw && isRamsocMember,
      is_arc_member: isUnsw && isArcMember,
      heard_from: heardFrom,
      heard_from_other: heardFrom === "other" ? heardFromOther : "",
      phone: (form.get("phone") as string) || "",
    });

    setLoading(false);

    if (result.success) {
      onComplete();
    } else {
      setError(result.error || "Something went wrong");
    }
  }

  let delay = 0.1;
  function nextDelay() {
    const d = delay;
    delay += 0.05;
    return d;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field delay={nextDelay()}>
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

      {isUnsw && (
        <Field delay={nextDelay()}>
          <Input
            label="zID"
            name="zid"
            placeholder="z1234567"
            required
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.zid ? fieldErrors.zid : undefined}
          />
        </Field>
      )}

      {isOtherUni && (
        <>
          <Field delay={nextDelay()}>
            <Input
              label="University"
              name="university"
              required
              placeholder="e.g. University of Sydney"
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.university ? fieldErrors.university : undefined}
            />
          </Field>
          <Field delay={nextDelay()}>
            <Input
              label="University ID"
              name="uni_id"
              required
              placeholder="e.g. 490123456"
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.uni_id ? fieldErrors.uni_id : undefined}
            />
          </Field>
        </>
      )}

      {isHighSchool && (
        <Field delay={nextDelay()}>
          <Input
            label="High School"
            name="high_school"
            required
            placeholder="e.g. Sydney Grammar School"
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.high_school ? fieldErrors.high_school : undefined}
          />
        </Field>
      )}

      {!isHighSchool && (
        <>
          <Field delay={nextDelay()}>
            <Select
              label="Year of Study"
              name="year_of_study"
              options={YEAR_OPTIONS}
              placeholder="Select year"
              required
              value={yearOfStudy}
              onChange={(e) => {
                setYearOfStudy(e.target.value);
                markTouched("year_of_study");
                validateField("year_of_study", e.target.value);
              }}
              error={touched.year_of_study ? fieldErrors.year_of_study : undefined}
            />
          </Field>

          <Field delay={nextDelay()}>
            <Select
              label="Degree Stage"
              name="degree_stage"
              options={DEGREE_STAGE_OPTIONS}
              placeholder="Select degree stage"
              required
              value={degreeStage}
              onChange={(e) => {
                setDegreeStage(e.target.value);
                markTouched("degree_stage");
                validateField("degree_stage", e.target.value);
              }}
              error={touched.degree_stage ? fieldErrors.degree_stage : undefined}
            />
          </Field>

          <Field delay={nextDelay()}>
            <RadioGroup
              label="Undergraduate or Postgraduate"
              name="undergrad_postgrad"
              options={UNDERGRAD_POSTGRAD_OPTIONS}
              value={undergradPostgrad}
              onChange={(val) => {
                setUndergradPostgrad(val);
                markTouched("undergrad_postgrad");
                validateField("undergrad_postgrad", val);
              }}
              error={touched.undergrad_postgrad ? fieldErrors.undergrad_postgrad : undefined}
              required
            />
          </Field>

          <Field delay={nextDelay()}>
            <RadioGroup
              label="Domestic or International"
              name="domestic_international"
              options={DOMESTIC_INTL_OPTIONS}
              value={domesticIntl}
              onChange={(val) => {
                setDomesticIntl(val);
                markTouched("domestic_international");
                validateField("domestic_international", val);
              }}
              error={touched.domestic_international ? fieldErrors.domestic_international : undefined}
              required
            />
          </Field>

          <Field delay={nextDelay()}>
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

          <Field delay={nextDelay()}>
            <Input
              label="Majors (if applicable)"
              name="majors"
              placeholder="e.g. Mechanical Engineering"
            />
          </Field>

          <Field delay={nextDelay()}>
            <CheckboxGroup
              label="Faculty"
              options={FACULTY_OPTIONS}
              selected={selectedFaculties}
              onChange={(vals) => {
                setSelectedFaculties(vals);
                markTouched("faculty");
                setFieldErrors((prev) => {
                  const next = { ...prev };
                  if (vals.length === 0) next.faculty = "Select at least one faculty";
                  else delete next.faculty;
                  if (!vals.includes("Other")) {
                    setFacultyOther("");
                    delete next.faculty_other;
                  }
                  return next;
                });
              }}
              error={touched.faculty ? fieldErrors.faculty : undefined}
              required
            />
          </Field>

          {selectedFaculties.includes("Other") && (
            <Field delay={0}>
              <Input
                label="Please specify your faculty"
                name="faculty_other"
                required
                value={facultyOther}
                onChange={(e) => {
                  setFacultyOther(e.target.value);
                  if (touched.faculty_other) {
                    validateField("faculty_other", e.target.value);
                  }
                }}
                onBlur={(e) => {
                  markTouched("faculty_other");
                  validateField("faculty_other", e.target.value);
                }}
                error={touched.faculty_other ? fieldErrors.faculty_other : undefined}
              />
            </Field>
          )}
        </>
      )}

      <Field delay={nextDelay()}>
        <RadioGroup
          label="Gender"
          name="gender"
          options={GENDER_OPTIONS}
          value={gender}
          onChange={(val) => {
            setGender(val);
            markTouched("gender");
            validateField("gender", val);
            if (val !== "other") {
              setGenderOther("");
              setFieldErrors((prev) => {
                const next = { ...prev };
                delete next.gender_other;
                return next;
              });
            }
          }}
          error={touched.gender ? fieldErrors.gender : undefined}
          required
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

      {isUnsw && (
        <Field delay={nextDelay()}>
          <div className="flex flex-col gap-2">
            <span className="font-main text-sm text-muted-foreground">Memberships</span>
            <YesNoToggle
              label="I am a RAMSoc member"
              value={isRamsocMember}
              onChange={setIsRamsocMember}
            />
            <YesNoToggle
              label="I am an Arc member"
              value={isArcMember}
              onChange={setIsArcMember}
            />
          </div>
        </Field>
      )}

      <Field delay={nextDelay()}>
        <Select
          label="How did you hear about us?"
          name="heard_from"
          options={HEARD_FROM_OPTIONS}
          placeholder="Select an option"
          required
          value={heardFrom}
          onChange={(e) => {
            setHeardFrom(e.target.value);
            markTouched("heard_from");
            validateField("heard_from", e.target.value);
            if (e.target.value !== "other") {
              setHeardFromOther("");
              setFieldErrors((prev) => {
                const next = { ...prev };
                delete next.heard_from_other;
                return next;
              });
            }
          }}
          error={touched.heard_from ? fieldErrors.heard_from : undefined}
        />
      </Field>

      {heardFrom === "other" && (
        <Field delay={0}>
          <Input
            label="Please specify"
            name="heard_from_other"
            required
            value={heardFromOther}
            onChange={(e) => {
              setHeardFromOther(e.target.value);
              if (touched.heard_from_other) {
                validateField("heard_from_other", e.target.value);
              }
            }}
            onBlur={(e) => {
              markTouched("heard_from_other");
              validateField("heard_from_other", e.target.value);
            }}
            error={touched.heard_from_other ? fieldErrors.heard_from_other : undefined}
          />
        </Field>
      )}

      <Field delay={nextDelay()}>
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
        <p className="text-sm text-destructive">{error}</p>
      )}

      <div className="sticky bottom-4 mt-4 pt-4">
        <Button type="submit" size="full" disabled={loading} loading={loading}>
          Continue
        </Button>
      </div>
    </form>
  );
}
