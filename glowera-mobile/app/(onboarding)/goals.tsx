import { router, useLocalSearchParams } from "expo-router";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import { useState } from "react";

const GOALS = [
  "Skin",
  "Hair",
  "Health",
  "Cycle",
  "Habits",
];

export default function GoalsScreen() {
  const { displayName } = useLocalSearchParams();

  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  function toggleGoal(goal: string) {
    setSelectedGoals((current) =>
      current.includes(goal)
        ? current.filter((g) => g !== goal)
        : [...current, goal]
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#0B0714",
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
        Your goals ✨
      </Text>

      <Text
        style={{
          color: "#F8DCE8",
          marginBottom: 32,
        }}
      >
        Choose all that apply
      </Text>

      {GOALS.map((goal) => {
        const selected = selectedGoals.includes(goal);

        return (
          <Pressable
            key={goal}
            onPress={() => toggleGoal(goal)}
            style={{
              backgroundColor: selected
                ? "#F8E3EC"
                : "rgba(255,255,255,0.08)",
              padding: 16,
              borderRadius: 16,
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                color: selected ? "#7A4D6D" : "white",
                textAlign: "center",
              }}
            >
              {goal}
            </Text>
          </Pressable>
        );
      })}

      <View style={{ flex: 1 }} />

      <Pressable
        onPress={() =>
          router.push({
            pathname: "/preferred-realm",
            params: {
              displayName,
              goals: JSON.stringify(selectedGoals),
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