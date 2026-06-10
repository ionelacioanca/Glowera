import { router } from "expo-router";
import { Text, Pressable, View } from "react-native";
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
            fontSize: 36,
            fontFamily: "serif",
            marginBottom: 12,
          }}
        >
          Glowera
        </Text>

        <Text
          style={{
            color: "rgba(255, 248, 251, 0.78)",
            fontSize: 15,
            textAlign: "center",
            marginBottom: 42,
            lineHeight: 23,
            maxWidth: 280,
          }}
        >
          Step into the universe where your glow begins.
        </Text>

        <Pressable
          onPress={() => router.push("/login")}
          style={{
            width: "100%",
            paddingVertical: 16,
            borderRadius: 999,
            backgroundColor: "rgba(255, 248, 251, 0.14)",
            borderWidth: 1,
            borderColor: "rgba(255, 248, 251, 0.42)",
            marginBottom: 14,
          }}
        >
          <Text
            style={{
              color: "#FFF8FB",
              fontSize: 16,
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            Log in
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/register")}
          style={{
            width: "100%",
            paddingVertical: 16,
            borderRadius: 999,
            backgroundColor: "rgba(255, 248, 251, 0.28)",
            borderWidth: 1,
            borderColor: "rgba(255, 248, 251, 0.56)",
          }}
        >
          <Text
            style={{
              color: "#FFF8FB",
              fontSize: 16,
              textAlign: "center",
              fontWeight: "700",
            }}
          >
            Create account
          </Text>
        </Pressable>
      </View>
    </GloweraNebula>
  );
}