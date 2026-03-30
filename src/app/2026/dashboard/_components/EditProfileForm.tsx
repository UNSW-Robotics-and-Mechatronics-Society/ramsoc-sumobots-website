"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/app/2026/_actions/profile";
import Input from "@/app/2026/_components/ui/Input";
import Select from "@/app/2026/_components/ui/Select";
import { Button } from "@/app/2026/_components/ui/Button";
import type { Profile } from "@/app/_types/registration";

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

function CheckboxGroup({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
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
      <span className="font-main text-sm text-muted-foreground">{label}</span>
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
    </div>
  );
}

function RadioGroup({
  label,
  name,
  options,
  value,
  onChange,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-main text-sm text-muted-foreground">{label}</span>
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
    </div>
  );
}

export default function EditProfileForm({
  profile,
  onCancel,
}: {
  profile: Profile;
  onCancel: () => void;
}) {
  const router = useRouter();
  const userType = profile.user_type || (profile.is_unsw ? "unsw" : "other_uni");
  const isHighSchool = userType === "high_school";
  const isUnsw = userType === "unsw";
  const isOtherUni = userType === "other_uni";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState(profile.year_of_study || "");
  const [degreeStage, setDegreeStage] = useState(profile.degree_stage || "");
  const [undergradPostgrad, setUndergradPostgrad] = useState(profile.undergrad_postgrad || "");
  const [domesticIntl, setDomesticIntl] = useState(profile.domestic_international || "");
  const standardFacultyValues = FACULTY_OPTIONS.filter((f) => f.value !== "Other").map((f) => f.value);
  const existingFaculties = profile.faculty ? profile.faculty.split(", ").filter(Boolean) : [];
  const existingOtherFaculty = existingFaculties.find((f) => !standardFacultyValues.includes(f));
  const [selectedFaculties, setSelectedFaculties] = useState<string[]>(
    existingOtherFaculty
      ? [...existingFaculties.filter((f) => f !== existingOtherFaculty), "Other"]
      : existingFaculties,
  );
  const [facultyOther, setFacultyOther] = useState(existingOtherFaculty || "");
  const [gender, setGender] = useState(profile.gender);
  const [genderOther, setGenderOther] = useState(profile.gender_other || "");
  const [isRamsocMember, setIsRamsocMember] = useState(profile.is_ramsoc_member ?? false);
  const [isArcMember, setIsArcMember] = useState(profile.is_arc_member ?? false);
  const [heardFrom, setHeardFrom] = useState(profile.heard_from || "");
  const [heardFromOther, setHeardFromOther] = useState(profile.heard_from_other || "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);

    const result = await updateProfile({
      full_name: form.get("full_name") as string,
      user_type: userType,
      is_unsw: isUnsw,
      university: isUnsw ? "UNSW" : isOtherUni ? (form.get("university") as string) : "",
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
      router.refresh();
      onCancel();
    } else {
      setError(result.error || "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="font-main rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-muted-foreground">
        {isUnsw ? "UNSW Student" : isOtherUni ? "Other University" : "High School Student"}
      </div>

      <Input
        label="Full Name"
        name="full_name"
        required
        autoComplete="name"
        defaultValue={profile.full_name}
      />

      {isUnsw && (
        <Input
          label="zID"
          name="zid"
          placeholder="z1234567"
          required
          pattern="z\d{7}"
          title="zID must be in the format z1234567"
          defaultValue={profile.zid}
        />
      )}

      {isOtherUni && (
        <>
          <Input
            label="University"
            name="university"
            required
            placeholder="e.g. University of Sydney"
            defaultValue={profile.university}
          />
          <Input
            label="University ID"
            name="uni_id"
            required
            placeholder="e.g. 490123456"
            defaultValue={profile.uni_id}
          />
        </>
      )}

      {isHighSchool && (
        <Input
          label="High School"
          name="high_school"
          required
          placeholder="e.g. Sydney Grammar School"
          defaultValue={profile.high_school}
        />
      )}

      {!isHighSchool && (
        <>
          <Select
            label="Year of Study"
            name="year_of_study"
            options={YEAR_OPTIONS}
            placeholder="Select year"
            required
            value={yearOfStudy}
            onChange={(e) => setYearOfStudy(e.target.value)}
          />

          <Select
            label="Degree Stage"
            name="degree_stage"
            options={DEGREE_STAGE_OPTIONS}
            placeholder="Select degree stage"
            value={degreeStage}
            onChange={(e) => setDegreeStage(e.target.value)}
          />

          <RadioGroup
            label="Undergraduate or Postgraduate"
            name="undergrad_postgrad"
            options={UNDERGRAD_POSTGRAD_OPTIONS}
            value={undergradPostgrad}
            onChange={setUndergradPostgrad}
          />

          <RadioGroup
            label="Domestic or International"
            name="domestic_international"
            options={DOMESTIC_INTL_OPTIONS}
            value={domesticIntl}
            onChange={setDomesticIntl}
          />

          <Input
            label="Degree"
            name="degree"
            required
            placeholder="e.g. B.Eng (Mechatronics)"
            defaultValue={profile.degree}
          />

          <Input
            label="Majors (if applicable)"
            name="majors"
            placeholder="e.g. Mechanical Engineering"
            defaultValue={profile.majors}
          />

          <CheckboxGroup
            label="Faculty"
            options={FACULTY_OPTIONS}
            selected={selectedFaculties}
            onChange={(vals) => {
              setSelectedFaculties(vals);
              if (!vals.includes("Other")) setFacultyOther("");
            }}
          />

          {selectedFaculties.includes("Other") && (
            <Input
              label="Please specify your faculty"
              name="faculty_other"
              required
              value={facultyOther}
              onChange={(e) => setFacultyOther(e.target.value)}
            />
          )}
        </>
      )}

      <RadioGroup
        label="Gender"
        name="gender"
        options={GENDER_OPTIONS}
        value={gender}
        onChange={(val) => {
          setGender(val);
          if (val !== "other") setGenderOther("");
        }}
      />

      {gender === "other" && (
        <Input
          label="Please specify"
          name="gender_other"
          required
          value={genderOther}
          onChange={(e) => setGenderOther(e.target.value)}
        />
      )}

      {isUnsw && (
        <div className="flex flex-col gap-2">
          <span className="font-main text-sm text-muted-foreground">Memberships</span>
          <label className={`font-main flex min-h-[44px] cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition-all ${
            isRamsocMember
              ? "border-primary bg-primary/10 text-foreground"
              : "border-border bg-secondary text-muted-foreground hover:border-primary/30 hover:bg-secondary/80"
          }`}>
            <input
              type="checkbox"
              checked={isRamsocMember}
              onChange={(e) => setIsRamsocMember(e.target.checked)}
              className="h-5 w-5 rounded accent-primary"
            />
            I am a RAMSoc member
          </label>
          <label className={`font-main flex min-h-[44px] cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition-all ${
            isArcMember
              ? "border-primary bg-primary/10 text-foreground"
              : "border-border bg-secondary text-muted-foreground hover:border-primary/30 hover:bg-secondary/80"
          }`}>
            <input
              type="checkbox"
              checked={isArcMember}
              onChange={(e) => setIsArcMember(e.target.checked)}
              className="h-5 w-5 rounded accent-primary"
            />
            I am an Arc member
          </label>
        </div>
      )}

      <Select
        label="How did you hear about us?"
        name="heard_from"
        options={HEARD_FROM_OPTIONS}
        placeholder="Select an option"
        required
        value={heardFrom}
        onChange={(e) => {
          setHeardFrom(e.target.value);
          if (e.target.value !== "other") setHeardFromOther("");
        }}
      />

      {heardFrom === "other" && (
        <Input
          label="Please specify"
          name="heard_from_other"
          required
          value={heardFromOther}
          onChange={(e) => setHeardFromOther(e.target.value)}
        />
      )}

      <Input
        label="Phone Number"
        name="phone"
        type="tel"
        autoComplete="tel"
        placeholder="04XX XXX XXX"
        defaultValue={profile.phone}
      />

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="mt-2 flex gap-3">
        <Button
          type="button"
          variant="secondary"
          size="full"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" size="full" disabled={loading} loading={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
