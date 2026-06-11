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
import { Ionicons } from "@expo/vector-icons";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);

  const isPasswordValid =
    hasMinLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber;

  async function handleRegister() {
    if (!isPasswordValid) {
      Alert.alert(
        "Invalid password",
        "Please meet all password requirements."
      );
      return;
    }

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

      <View
        style={{
          backgroundColor: "rgba(255,255,255,0.08)",
          borderRadius: 16,
          marginBottom: 12,
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
        >
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={22}
            color="#F8E3EC"
          />
        </Pressable>
      </View>

      {password.length > 0 && (
        <View
          style={{
            marginBottom: 24,
            gap: 6,
          }}
        >
          <Text
            style={{
              color: hasMinLength ? "#F8DCE8" : "#AFA6B2",
              fontSize: 13,
            }}
          >
            {hasMinLength ? "✓" : "○"} 8+ characters
          </Text>

          <Text
            style={{
              color: hasUppercase ? "#F8DCE8" : "#AFA6B2",
              fontSize: 13,
            }}
          >
            {hasUppercase ? "✓" : "○"} 1 uppercase letter
          </Text>

          <Text
            style={{
              color: hasLowercase ? "#F8DCE8" : "#AFA6B2",
              fontSize: 13,
            }}
          >
            {hasLowercase ? "✓" : "○"} 1 lowercase letter
          </Text>

          <Text
            style={{
              color: hasNumber ? "#F8DCE8" : "#AFA6B2",
              fontSize: 13,
            }}
          >
            {hasNumber ? "✓" : "○"} 1 number
          </Text>

          {isPasswordValid && (
            <Text
              style={{
                color: "#F8DCE8",
                fontSize: 13,
                marginTop: 6,
                fontWeight: "600",
              }}
            >
              Password requirements met
            </Text>
          )}
        </View>
      )}

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