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
    preferred_realm?: string;
    goals?: string[];
    email?: string;
  }
) {
  const { data, error } = await supabase
    .from("profiles")
    .upsert({
      id: userId,
      email: payload.email,
      display_name: payload.display_name,
      preferred_realm: payload.preferred_realm,
      goals: payload.goals ?? [],
      onboarding_completed: true,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}