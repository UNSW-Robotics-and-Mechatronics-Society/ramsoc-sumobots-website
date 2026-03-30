"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { getSupabaseSecretClient } from "@/app/_utils/supabase";
import type { Profile } from "@/app/_types/registration";

export async function getProfile(): Promise<Profile | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const supabase = getSupabaseSecretClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("clerk_user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Failed to fetch profile:", error);
    return null;
  }

  return data as Profile | null;
}

type CreateProfileInput = {
  full_name: string;
  user_type: "unsw" | "other_uni" | "high_school";
  is_unsw: boolean;
  university: string;
  zid: string;
  uni_id: string;
  high_school: string;
  year_of_study: string;
  degree_stage: string;
  undergrad_postgrad: string;
  domestic_international: string;
  degree: string;
  majors: string;
  faculty: string;
  gender: string;
  gender_other: string;
  is_ramsoc_member: boolean;
  is_arc_member: boolean;
  heard_from: string;
  heard_from_other: string;
  phone: string;
};

export async function createProfile(
  input: CreateProfileInput,
): Promise<{ success: boolean; error?: string }> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Not authenticated" };

  const user = await currentUser();
  if (!user?.emailAddresses[0]?.emailAddress) {
    return { success: false, error: "No email found" };
  }

  if (!input.full_name.trim()) {
    return { success: false, error: "Full name is required" };
  }

  if (!["unsw", "other_uni", "high_school"].includes(input.user_type)) {
    return { success: false, error: "Invalid user type" };
  }

  if (input.user_type === "unsw" && !input.zid.trim()) {
    return { success: false, error: "zID is required for UNSW students" };
  }

  if (input.user_type === "other_uni" && !input.university.trim()) {
    return { success: false, error: "University is required" };
  }

  if (input.user_type === "other_uni" && !input.uni_id.trim()) {
    return { success: false, error: "University ID is required" };
  }

  if (input.user_type === "high_school" && !input.high_school.trim()) {
    return { success: false, error: "High school is required" };
  }

  // University-specific validations (not required for high school students)
  if (input.user_type !== "high_school") {
    if (!input.year_of_study) {
      return { success: false, error: "Year of study is required" };
    }

    if (!input.degree_stage) {
      return { success: false, error: "Degree stage is required" };
    }

    if (!input.undergrad_postgrad) {
      return { success: false, error: "Please select undergraduate or postgraduate" };
    }

    if (!input.domestic_international) {
      return { success: false, error: "Please select domestic or international" };
    }

    if (!input.degree.trim()) {
      return { success: false, error: "Degree is required" };
    }

    if (!input.faculty.trim()) {
      return { success: false, error: "Faculty is required" };
    }
  }

  if (!input.gender) {
    return { success: false, error: "Gender is required" };
  }

  if (input.gender === "other" && !input.gender_other.trim()) {
    return { success: false, error: "Please specify your gender" };
  }

  if (!input.heard_from) {
    return { success: false, error: "Please tell us how you heard about us" };
  }

  if (input.heard_from === "other" && !input.heard_from_other.trim()) {
    return { success: false, error: "Please specify how you heard about us" };
  }

  if (!input.phone.trim()) {
    return { success: false, error: "Phone number is required" };
  }

  const supabase = getSupabaseSecretClient();

  // Check if profile already exists
  const { data: existing } = await supabase
    .from("profiles")
    .select("id")
    .eq("clerk_user_id", userId)
    .single();

  if (existing) {
    return { success: false, error: "Profile already exists" };
  }

  const { error } = await supabase.from("profiles").insert({
    clerk_user_id: userId,
    email: user.emailAddresses[0].emailAddress,
    full_name: input.full_name.trim(),
    user_type: input.user_type,
    is_unsw: input.user_type === "unsw",
    university: input.user_type === "unsw" ? "UNSW" : input.user_type === "other_uni" ? input.university.trim() : "",
    zid: input.user_type === "unsw" ? input.zid.trim() : "",
    uni_id: input.user_type === "other_uni" ? input.uni_id.trim() : "",
    high_school: input.user_type === "high_school" ? input.high_school.trim() : "",
    year_of_study: input.year_of_study,
    degree_stage: input.degree_stage,
    undergrad_postgrad: input.undergrad_postgrad,
    domestic_international: input.domestic_international,
    degree: input.degree.trim(),
    majors: input.majors.trim(),
    faculty: input.faculty.trim(),
    gender: input.gender,
    gender_other: input.gender === "other" ? input.gender_other.trim() : "",
    is_ramsoc_member: input.is_ramsoc_member,
    is_arc_member: input.is_arc_member,
    heard_from: input.heard_from,
    heard_from_other: input.heard_from === "other" ? input.heard_from_other.trim() : "",
    phone: input.phone.trim(),
    onboarded: false,
  });

  if (error) {
    console.error("Failed to create profile:", error);
    return { success: false, error: "Failed to create profile" };
  }

  return { success: true };
}

type UpdateProfileInput = {
  full_name: string;
  user_type: "unsw" | "other_uni" | "high_school";
  is_unsw: boolean;
  university: string;
  zid: string;
  uni_id: string;
  high_school: string;
  year_of_study: string;
  degree_stage: string;
  undergrad_postgrad: string;
  domestic_international: string;
  degree: string;
  majors: string;
  faculty: string;
  gender: string;
  gender_other: string;
  is_ramsoc_member: boolean;
  is_arc_member: boolean;
  heard_from: string;
  heard_from_other: string;
  phone: string;
};

export async function updateProfile(
  input: UpdateProfileInput,
): Promise<{ success: boolean; error?: string }> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Not authenticated" };

  if (!input.full_name.trim()) {
    return { success: false, error: "Full name is required" };
  }

  if (input.user_type === "unsw" && !input.zid.trim()) {
    return { success: false, error: "zID is required for UNSW students" };
  }

  if (input.user_type === "other_uni" && !input.university.trim()) {
    return { success: false, error: "University is required" };
  }

  if (input.user_type === "other_uni" && !input.uni_id.trim()) {
    return { success: false, error: "University ID is required" };
  }

  if (input.user_type === "high_school" && !input.high_school.trim()) {
    return { success: false, error: "High school is required" };
  }

  const supabase = getSupabaseSecretClient();

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: input.full_name.trim(),
      user_type: input.user_type,
      is_unsw: input.user_type === "unsw",
      university: input.user_type === "unsw" ? "UNSW" : input.user_type === "other_uni" ? input.university.trim() : "",
      zid: input.user_type === "unsw" ? input.zid.trim() : "",
      uni_id: input.user_type === "other_uni" ? input.uni_id.trim() : "",
      high_school: input.user_type === "high_school" ? input.high_school.trim() : "",
      year_of_study: input.year_of_study,
      degree_stage: input.degree_stage,
      undergrad_postgrad: input.undergrad_postgrad,
      domestic_international: input.domestic_international,
      degree: input.degree.trim(),
      majors: input.majors.trim(),
      faculty: input.faculty.trim(),
      gender: input.gender,
      gender_other: input.gender === "other" ? input.gender_other.trim() : "",
      is_ramsoc_member: input.is_ramsoc_member,
      is_arc_member: input.is_arc_member,
      heard_from: input.heard_from,
      heard_from_other: input.heard_from === "other" ? input.heard_from_other.trim() : "",
      phone: input.phone.trim(),
      updated_at: new Date().toISOString(),
    })
    .eq("clerk_user_id", userId);

  if (error) {
    console.error("Failed to update profile:", error);
    return { success: false, error: "Failed to update profile" };
  }

  return { success: true };
}

export async function markOnboarded(): Promise<{
  success: boolean;
  error?: string;
}> {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Not authenticated" };

  const supabase = getSupabaseSecretClient();
  const { error } = await supabase
    .from("profiles")
    .update({ onboarded: true, updated_at: new Date().toISOString() })
    .eq("clerk_user_id", userId);

  if (error) {
    return { success: false, error: "Failed to update profile" };
  }

  return { success: true };
}
