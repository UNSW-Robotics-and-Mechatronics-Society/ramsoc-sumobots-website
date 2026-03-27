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
  const [selectedYears, setSelectedYears] = useState<string[]>(
    profile.year_of_study ? profile.year_of_study.split(", ").filter(Boolean) : [],
  );
  const [gender, setGender] = useState(profile.gender);
  const [genderOther, setGenderOther] = useState(profile.gender_other || "");

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

      <CheckboxGroup
        label="Year of Study"
        options={YEAR_OPTIONS}
        selected={selectedYears}
        onChange={setSelectedYears}
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

      <Select
        label="Faculty"
        name="faculty"
        options={FACULTY_OPTIONS}
        placeholder="Select faculty"
        required
        defaultValue={profile.faculty}
      />

      <Select
        label="Gender"
        name="gender"
        options={GENDER_OPTIONS}
        placeholder="Select gender"
        required
        value={gender}
        onChange={(e) => {
          setGender(e.target.value);
          if (e.target.value !== "other") setGenderOther("");
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
