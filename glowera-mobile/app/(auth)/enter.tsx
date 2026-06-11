import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { GloweraNebula } from "../../src/shared/ui/GloweraNebula";

export default function EnterGloweraScreen() {
  return (
    <GloweraNebula>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 28,
        }}
      >
        <Text
          style={{
            color: "#FFF8FB",
            fontSize: 32,
            fontFamily: "serif",
            letterSpacing: 1,
            marginBottom: 18,
            textShadowColor: "rgba(255, 248, 251, 0.45)",
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 8,
          }}
        >
          Glowera
        </Text>

        <Text
          style={{
            color: "rgba(255, 248, 251, 0.72)",
            fontSize: 18,
            marginBottom: 16,
            letterSpacing: 6,
          }}
        >
          ✦
        </Text>

        <Text
          style={{
            color: "rgba(255, 248, 251, 0.74)",
            fontSize: 13,
            textAlign: "center",
            marginBottom: 46,
            letterSpacing: 2.6,
            textTransform: "lowercase",
          }}
        >
          enter into your glow era
        </Text>

        <Pressable
          onPress={() => router.push("/register")}
          style={{
            width: "100%",
            paddingVertical: 16,
            borderRadius: 24,
            backgroundColor: "rgba(250, 232, 241, 0.86)",
            borderWidth: 1,
            borderColor: "rgba(255, 248, 251, 0.68)",
            marginBottom: 14,
            shadowColor: "#FFF8FB",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.18,
            shadowRadius: 12,
            elevation: 3,
          }}
        >
          <Text
            style={{
              color: "#7A4D6D",
              fontSize: 15,
              textAlign: "center",
              fontWeight: "700",
              letterSpacing: 0.6,
            }}
          >
            Create account
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/login")}
          style={{
            width: "100%",
            paddingVertical: 16,
            borderRadius: 24,
            backgroundColor: "rgba(255, 248, 251, 0.1)",
            borderWidth: 1,
            borderColor: "rgba(255, 248, 251, 0.44)",
          }}
        >
          <Text
            style={{
              color: "#FFF8FB",
              fontSize: 15,
              textAlign: "center",
              fontWeight: "600",
              letterSpacing: 0.6,
            }}
          >
            Log in
          </Text>
        </Pressable>
      </View>
    </GloweraNebula>
  );
}