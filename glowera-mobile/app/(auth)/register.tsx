import { useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import { signUpWithEmail } from "../../src/features/auth/services/authService";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister() {
    try {
      setIsLoading(true);

      await signUpWithEmail(email.trim(), password);

      Alert.alert(
        "Account created",
        "Please check your email for confirmation."
      );
    } catch (error: any) {
      Alert.alert("Registration failed", error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#0B0714",
        justifyContent: "center",
        paddingHorizontal: 24,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 28,
          marginBottom: 32,
          textAlign: "center",
        }}
      >
        Create account
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{
          backgroundColor: "rgba(255,255,255,0.08)",
          color: "white",
          padding: 16,
          borderRadius: 16,
          marginBottom: 16,
        }}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          backgroundColor: "rgba(255,255,255,0.08)",
          color: "white",
          padding: 16,
          borderRadius: 16,
          marginBottom: 24,
        }}
      />

      <Pressable
        onPress={handleRegister}
        disabled={isLoading}
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
          {isLoading ? "Creating..." : "Create account"}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}