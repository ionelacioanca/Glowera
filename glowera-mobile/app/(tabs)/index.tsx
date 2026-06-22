import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

import { useAuth } from "../../src/features/auth/context/AuthProvider";
import { signOut } from "../../src/features/auth/services/authService";
import { getMyProfile } from "../../src/features/profile/services/profileService";

type Profile = {
  display_name: string;
  preferred_realm: string;
};

export default function HomeScreen() {
  const { user } = useAuth();

  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      if (!user) return;

      try {
        const data = await getMyProfile(user.id);

        if (isMounted) {
          setProfile(data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [user]);

  async function handleLogout() {
    try {
      await signOut();
      router.replace("/enter");
    } catch (error) {
      console.error(error);
    }
  }

  const realms = [
    "Glowderma",
    "Glowvitalia",
    "Glowmedula",
    "Glowlunara",
    "Glowdiario",
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0B0714",
        paddingTop: 80,
        paddingHorizontal: 24,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 28,
          marginBottom: 8,
        }}
      >
        Welcome back
      </Text>

      <Text
        style={{
          color: "#F8DCE8",
          marginBottom: 24,
        }}
      >
        {profile?.display_name ?? "Traveler"}
      </Text>

      <Text
        style={{
          fontSize: 32,
          marginBottom: 12,
        }}
      >
        ⭐
      </Text>

      <View
        style={{
          width: 180,
          height: 180,
          borderRadius: 90,
          backgroundColor: "#E7B9D0",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <Text
          style={{
            color: "#4B2940",
            fontWeight: "700",
          }}
        >
          GLOWERA
        </Text>
      </View>

      <Text
        style={{
          color: "#F8DCE8",
          marginBottom: 24,
        }}
      >
        Preferred Realm: {profile?.preferred_realm ?? "-"}
      </Text>

      {realms.map((realm) => (
        <Pressable
          key={realm}
          onPress={() =>
            router.push({
              pathname: "/realm",
              params: { realm },
            })
          }
          style={{
            width: "100%",
            backgroundColor: "rgba(255,255,255,0.08)",
            padding: 14,
            borderRadius: 16,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
            }}
          >
            {realm}
          </Text>
        </Pressable>
      ))}

      <Pressable
        onPress={handleLogout}
        style={{
          position: "absolute",
          top: 60,
          right: 24,
          backgroundColor: "rgba(255,255,255,0.08)",
          paddingHorizontal: 16,
          paddingVertical: 10,
          borderRadius: 16,
          zIndex: 100,
        }}
      >
        <Text
          style={{
            color: "#F8DCE8",
            fontWeight: "600",
          }}
        >
          Logout
        </Text>
      </Pressable>
    </View>
  );
}