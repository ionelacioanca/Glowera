import { Text, View } from "react-native";

export default function OnboardingWelcomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0B0714",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
      }}
    >
      <Text style={{ color: "white", fontSize: 28, textAlign: "center" }}>
        Welcome to your glow era 
      </Text>
    </View>
  );
}