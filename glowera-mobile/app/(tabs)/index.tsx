import { Platform, Text, View } from "react-native";
import { GloweraNebula } from "../../src/shared/ui/GloweraNebula";

export default function HomeScreen() {
  if (Platform.OS === "web") {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#0B0714",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 28 }}>Glowera Web Test</Text>
      </View>
    );
  }

  return (
    <GloweraNebula>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "white", fontSize: 28 }}>Glowera</Text>
      </View>
    </GloweraNebula>
  );
}