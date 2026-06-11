import { Redirect } from "expo-router";
import { Text, View } from "react-native";
import { useAuth } from "../src/features/auth/context/AuthProvider";

export default function IndexScreen() {
  const { user, isLoading } = useAuth();

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
        <Text style={{ color: "#FFF8FB" }}>Loading Glowera...</Text>
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/enter" />;
  }

  return <Redirect href="/(tabs)" />;
}