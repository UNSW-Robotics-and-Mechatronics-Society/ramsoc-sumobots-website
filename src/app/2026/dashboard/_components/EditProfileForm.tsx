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
];

const GENDER_OPTIONS = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "non-binary", label: "Non-binary" },
  { value: "other", label: "Other" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
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
      <span className="font-main text-sm text-gray-300">{label}</span>
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
      <span className="font-main text-sm text-gray-300">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`font-main flex min-h-[44px] cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm transition-colors ${
              value === opt.value
                ? "border-rose-500 bg-rose-500/10 text-white"
                : "border-white/10 bg-white/5 text-gray-300 hover:border-white/20"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="h-4 w-4 accent-rose-600"
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
  const [isUnsw, setIsUnsw] = useState(profile.is_unsw);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState(profile.year_of_study || "");
  const [degreeStage, setDegreeStage] = useState(profile.degree_stage || "");
  const [undergradPostgrad, setUndergradPostgrad] = useState(profile.undergrad_postgrad || "");
  const [domesticIntl, setDomesticIntl] = useState(profile.domestic_international || "");
  const [selectedFaculties, setSelectedFaculties] = useState<string[]>(
    profile.faculty ? profile.faculty.split(", ").filter(Boolean) : [],
  );
  const [gender, setGender] = useState(profile.gender);
  const [genderOther, setGenderOther] = useState(profile.gender_other || "");
  const [isRamsocMember, setIsRamsocMember] = useState(profile.is_ramsoc_member ?? false);
  const [isArcMember, setIsArcMember] = useState(profile.is_arc_member ?? false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);

    const result = await updateProfile({
      full_name: form.get("full_name") as string,
      is_unsw: isUnsw,
      university: isUnsw ? "UNSW" : (form.get("university") as string),
      zid: isUnsw ? (form.get("zid") as string) : "",
      year_of_study: yearOfStudy,
      degree_stage: degreeStage,
      undergrad_postgrad: undergradPostgrad,
      domestic_international: domesticIntl,
      degree: (form.get("degree") as string) || "",
      majors: (form.get("majors") as string) || "",
      faculty: selectedFaculties.join(", "),
      gender: gender,
      gender_other: gender === "other" ? genderOther : "",
      is_ramsoc_member: isRamsocMember,
      is_arc_member: isArcMember,
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
      <Input
        label="Full Name"
        name="full_name"
        required
        autoComplete="name"
        defaultValue={profile.full_name}
      />

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

      {isUnsw ? (
        <Input
          label="zID"
          name="zid"
          placeholder="z1234567"
          required
          pattern="z\d{7}"
          title="zID must be in the format z1234567"
          defaultValue={profile.zid}
        />
      ) : (
        <Input
          label="University"
          name="university"
          required
          placeholder="e.g. University of Sydney"
          defaultValue={profile.university}
        />
      )}

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
        onChange={setSelectedFaculties}
      />

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

      <div className="flex flex-col gap-2">
        <span className="font-main text-sm text-gray-300">Memberships</span>
        <label className="font-main flex min-h-[44px] cursor-pointer items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-gray-300 transition-colors hover:border-white/20">
          <input
            type="checkbox"
            checked={isRamsocMember}
            onChange={(e) => setIsRamsocMember(e.target.checked)}
            className="h-5 w-5 rounded accent-rose-600"
          />
          I am a RAMSoc member
        </label>
        <label className="font-main flex min-h-[44px] cursor-pointer items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-gray-300 transition-colors hover:border-white/20">
          <input
            type="checkbox"
            checked={isArcMember}
            onChange={(e) => setIsArcMember(e.target.checked)}
            className="h-5 w-5 rounded accent-rose-600"
          />
          I am an Arc member
        </label>
      </div>

      <Input
        label="Phone Number"
        name="phone"
        type="tel"
        autoComplete="tel"
        placeholder="04XX XXX XXX"
        defaultValue={profile.phone}
      />

      {error && <p className="text-sm text-red-400">{error}</p>}

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
