import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";

type GlowScreenProps = {
  children: React.ReactNode;
  className?: string;
};

export function GlowScreen({
  children,
  className = "",
}: GlowScreenProps) {
  return (
    <SafeAreaView className="flex-1 bg-[#0B0714]">
      <View className={`flex-1 ${className}`}>
        {children}
      </View>
    </SafeAreaView>
  );
}