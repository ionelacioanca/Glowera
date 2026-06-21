import { Pressable, Text, View } from "react-native";
import { useAuth } from "../../src/features/auth/context/AuthProvider";
import { signOut } from "../../src/features/auth/services/authService";
import { router } from "expo-router";

export default function HomeScreen() {
  const { user } = useAuth();

  async function handleLogout() {
  try {
    await signOut();

    router.replace("/enter");
  } catch (error) {
    console.error(error);
  }
}

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0B0714",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 28,
          marginBottom: 12,
        }}
      >
        Home
      </Text>

      <Text
        style={{
          color: "#F8DCE8",
          marginBottom: 32,
          textAlign: "center",
        }}
      >
        {user?.email ?? "No user"}
      </Text>

      <Pressable
        onPress={handleLogout}
        style={{
          backgroundColor: "#F8E3EC",
          paddingHorizontal: 24,
          paddingVertical: 16,
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            color: "#7A4D6D",
            fontWeight: "700",
          }}
        >
          Log out
        </Text>
      </Pressable>
    </View>
  );
}