import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
} from "react-native";
import { router } from "expo-router";

export default function OnboardingScreen() {
  const [displayName, setDisplayName] = useState("");

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#0B0714",
        justifyContent: "center",
        paddingHorizontal: 24,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 28,
          marginBottom: 12,
          textAlign: "center",
        }}
      >
        Welcome to Glowera ✨
      </Text>

      <Text
        style={{
          color: "#F8DCE8",
          textAlign: "center",
          marginBottom: 32,
        }}
      >
        What should Glowria call you?
      </Text>

      <TextInput
        value={displayName}
        onChangeText={setDisplayName}
        placeholder="Your name"
        placeholderTextColor="#999"
        style={{
          backgroundColor: "rgba(255,255,255,0.08)",
          color: "white",
          padding: 16,
          borderRadius: 16,
          marginBottom: 24,
        }}
      />

      <Pressable
        onPress={() =>
          router.push({
            pathname: "/goals",
            params: {
              displayName,
            },
          })
        }
        style={{
          backgroundColor: "#F8E3EC",
          padding: 16,
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "#7A4D6D",
            fontWeight: "700",
          }}
        >
          Continue
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}