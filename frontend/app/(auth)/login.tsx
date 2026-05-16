import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: trimmedUsername, password: trimmedPassword }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setError(errorText || "Invalid credentials");
        return;
      }

      const data = await response.json();
      await AsyncStorage.setItem("authToken", data.token);
      router.replace("/(home)");
    } catch {
      setError("Cannot connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>Good-Kiritsu</Text>
      <Text style={styles.subtitle}>Track your subscriptions</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        mode="outlined"
        label="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleLogin}
        loading={loading}
        disabled={loading}
        style={styles.button}
        contentStyle={styles.buttonContent}
      >
        Login
      </Button>
      <Button mode="text" onPress={() => router.push("/register")}>
        Don't have an account? Register
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#0D0D0D" },
  title: { textAlign: "center", color: "#F5F5F5", fontWeight: "bold" },
  subtitle: { textAlign: "center", color: "#888888", marginBottom: 40, marginTop: 6 },
  error: { color: "#FF453A", textAlign: "center", marginBottom: 12 },
  input: { marginBottom: 16, backgroundColor: "#1A1A1A" },
  button: { marginBottom: 8 },
  buttonContent: { paddingVertical: 6 },
});
