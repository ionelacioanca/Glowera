import { useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";
import { signInWithEmail } from "../../src/features/auth/services/authService";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    try {
      setIsLoading(true);

      await signInWithEmail(email.trim(), password);

      Alert.alert("Success", "Welcome back!");
    } catch (error: any) {
      Alert.alert("Login failed", error.message);
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
        Log in
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

      <View
        style={{
          backgroundColor: "rgba(255,255,255,0.08)",
          borderRadius: 16,
          marginBottom: 16,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={{
            flex: 1,
            color: "white",
            paddingVertical: 16,
          }}
        />

        <Pressable
          onPress={() => setShowPassword((prev) => !prev)}
          hitSlop={12}
        >
          <Text
            style={{
              color: "#F8E3EC",
              fontSize: 20,
            }}
          >
            {showPassword ? "✦" : "✧"}
          </Text>
        </Pressable>
      </View>

      <Pressable
        style={{
          marginBottom: 24,
        }}
      >
        <Text
          style={{
            color: "#F8DCE8",
            textAlign: "right",
            fontSize: 13,
          }}
        >
          Forgot password?
        </Text>
      </Pressable>

      <Pressable
        onPress={handleLogin}
        disabled={isLoading}
        style={{
          backgroundColor: "#F8E3EC",
          padding: 16,
          borderRadius: 20,
          marginBottom: 24,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "#7A4D6D",
            fontWeight: "700",
          }}
        >
          {isLoading ? "Signing in..." : "Log in"}
        </Text>
      </Pressable>

      <Pressable onPress={() => router.push("/register")}>
        <Text
          style={{
            color: "#F8DCE8",
            textAlign: "center",
          }}
        >
          Don't have an account? Create one
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}