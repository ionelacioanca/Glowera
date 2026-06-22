import { router, useLocalSearchParams } from "expo-router";
import { Pressable, SafeAreaView, Text } from "react-native";

export default function RealmScreen() {
  const { realm } = useLocalSearchParams();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#0B0714",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 28,
          marginBottom: 12,
        }}
      >
        ✨ {realm}
      </Text>

      <Text
        style={{
          color: "#F8DCE8",
          marginBottom: 32,
        }}
      >
        Realm placeholder screen
      </Text>

      <Pressable
        onPress={() => router.back()}
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
          Back
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}