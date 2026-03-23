"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/app/2026/_actions/profile";
import Input from "@/app/2026/_components/ui/Input";
import Select from "@/app/2026/_components/ui/Select";
import { Button } from "@/app/2026/_components/ui/Button";
import type { Profile } from "@/app/_types/registration";

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
        defaultValue={profile.year_of_study?.toString() ?? ""}
      />

      <Input
        label="Degree"
        name="degree"
        placeholder="e.g. B.Eng (Mechatronics)"
        defaultValue={profile.degree}
      />

      <Input
        label="Faculty"
        name="faculty"
        placeholder="e.g. Engineering"
        defaultValue={profile.faculty}
      />

      <Select
        label="Gender"
        name="gender"
        options={GENDER_OPTIONS}
        defaultValue={profile.gender}
      />

      <Input
        label="Dietary Requirements"
        name="dietary_requirements"
        placeholder="e.g. Vegetarian, Halal"
        defaultValue={profile.dietary_requirements}
      />

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
        <Button type="submit" size="full" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
