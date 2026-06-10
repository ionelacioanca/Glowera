import { Text, View } from "react-native";
import { useAuth } from "../../src/features/auth/context/AuthProvider";

export default function HomeScreen() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>User:</Text>
      <Text>{user?.email ?? "Not logged in"}</Text>
    </View>
  );
}