import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native";

import { useAuth } from "../../src/features/auth/context/AuthProvider";
import { completeOnboarding } from "../../src/features/profile/services/profileService";

const REGIONS = [
  "Glowderma",
  "Glowmedula",
  "Glowvitalia",
  "Glowlunara",
  "Glowdiario",
];

export default function PlanetaryGlowScreen() {
  const { user } = useAuth();

  const { displayName, goals } = useLocalSearchParams();

  const [selectedRegion, setSelectedRegion] = useState("");

  async function handleFinish() {
    if (!user || !selectedRegion) return;

    await completeOnboarding(user.id, {
      display_name: String(displayName),
      planetary_glow: selectedRegion,
      goals: goals
        ? JSON.parse(String(goals))
        : [],
    });

    router.replace("/(tabs)");
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#0B0714",
        padding: 24,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 28,
          marginBottom: 12,
        }}
      >
        Your first destination ✨
      </Text>

      <Text
        style={{
          color: "#F8DCE8",
          marginBottom: 32,
        }}
      >
        Which region would you like to explore first?
      </Text>

      {REGIONS.map((region) => {
        const selected = selectedRegion === region;

        return (
          <Pressable
            key={region}
            onPress={() => setSelectedRegion(region)}
            style={{
              backgroundColor: selected
                ? "#F8E3EC"
                : "rgba(255,255,255,0.08)",
              padding: 16,
              borderRadius: 16,
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                color: selected ? "#7A4D6D" : "white",
                textAlign: "center",
              }}
            >
              {region}
            </Text>
          </Pressable>
        );
      })}

      <View style={{ flex: 1 }} />

      <Pressable
        disabled={!selectedRegion}
        onPress={handleFinish}
        style={{
          backgroundColor: "#F8E3EC",
          padding: 16,
          borderRadius: 20,
          opacity: selectedRegion ? 1 : 0.5,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "#7A4D6D",
            fontWeight: "700",
          }}
        >
          Begin Journey
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}