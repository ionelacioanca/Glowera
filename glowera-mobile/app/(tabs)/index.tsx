import { Text } from "react-native";
import { GlowScreen } from "../src/shared/ui/GlowScreen";
export default function HomeScreen() {
  return (
    <GlowScreen>
      <Text
        style={{
          color: "white",
          fontSize: 24,
          textAlign: "center",
          marginTop: 100,
        }}
      >
        Glowera 🌸
      </Text>
    </GlowScreen>
  );
}