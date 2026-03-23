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
  is_unsw: boolean;
  university: string;
  zid: string;
  year_of_study: number | null;
  degree: string;
  faculty: string;
  gender: string;
  dietary_requirements: string;
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

  if (input.is_unsw && !input.zid.trim()) {
    return { success: false, error: "zID is required for UNSW students" };
  }

  if (!input.is_unsw && !input.university.trim()) {
    return { success: false, error: "University is required" };
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
    is_unsw: input.is_unsw,
    university: input.is_unsw ? "UNSW" : input.university.trim(),
    zid: input.is_unsw ? input.zid.trim() : "",
    year_of_study: input.year_of_study,
    degree: input.degree.trim(),
    faculty: input.faculty.trim(),
    gender: input.gender,
    dietary_requirements: input.dietary_requirements.trim(),
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
  is_unsw: boolean;
  university: string;
  zid: string;
  year_of_study: number | null;
  degree: string;
  faculty: string;
  gender: string;
  dietary_requirements: string;
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

  if (input.is_unsw && !input.zid.trim()) {
    return { success: false, error: "zID is required for UNSW students" };
  }

  if (!input.is_unsw && !input.university.trim()) {
    return { success: false, error: "University is required" };
  }

  const supabase = getSupabaseSecretClient();

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: input.full_name.trim(),
      is_unsw: input.is_unsw,
      university: input.is_unsw ? "UNSW" : input.university.trim(),
      zid: input.is_unsw ? input.zid.trim() : "",
      year_of_study: input.year_of_study,
      degree: input.degree.trim(),
      faculty: input.faculty.trim(),
      gender: input.gender,
      dietary_requirements: input.dietary_requirements.trim(),
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
