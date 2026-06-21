import { Redirect } from "expo-router";
import { Text, View } from "react-native";
import { useAuth } from "../src/features/auth/context/AuthProvider";
import { useEffect, useState } from "react";
import { getMyProfile } from "../src/features/profile/services/profileService";

export default function IndexScreen() {
  const { user, isLoading } = useAuth();
  const [hasCompletedOnboarding, setHasCompletedOnboarding] =
  useState<boolean | null>(null);

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;

      try {
        const profile = await getMyProfile(user.id);

        setHasCompletedOnboarding(
          profile?.onboarding_completed ?? false
        );
      } catch {
        setHasCompletedOnboarding(false);
      }
    }

    loadProfile();
  }, [user]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#0B0714",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#FFF8FB" }}>
          Loading Glowera...
        </Text>
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/enter" />;
  }

  if (hasCompletedOnboarding === null) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#0B0714",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#FFF8FB" }}>
          Loading profile...
        </Text>
      </View>
    );
  }

  if (!hasCompletedOnboarding) {
    return <Redirect href="/welcome" />;
  }

  return <Redirect href="/(tabs)" />;
}