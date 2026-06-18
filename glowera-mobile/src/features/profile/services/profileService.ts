import { supabase } from "../../../services/supabase/client";

export async function getMyProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;

  return data;
}

export async function createMyProfile(
  userId: string,
  email?: string
) {
  const { data, error } = await supabase
    .from("profiles")
    .insert({
      id: userId,
      email,
      onboarding_completed: false,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function completeOnboarding(
  userId: string,
  payload: {
    display_name?: string;
    planetary_glow?: string;
    goals?: string[];
  }
) {
  const { data, error } = await supabase
    .from("profiles")
    .update({
      ...payload,
      onboarding_completed: true,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;

  return data;
}