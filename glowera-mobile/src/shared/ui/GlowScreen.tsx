import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import React from "react";

type GlowScreenProps = {
  children: React.ReactNode;
};

export function GlowScreen({ children }: GlowScreenProps) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#0B0714",
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}