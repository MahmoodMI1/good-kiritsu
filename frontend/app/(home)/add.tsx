import { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button, Text, SegmentedButtons, Appbar } from "react-native-paper";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://localhost:8080";

export default function AddSubscriptionScreen() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleAdd = async () => {
    if (!name || !price) {
      setError("Name and price are required");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await fetch(`${API_URL}/api/subscriptions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          cost: parseFloat(price),
          category: category || null,
          billingCycle,
        }),
      });

      if (response.ok) {
        router.replace("/(home)");
      } else {
        setError("Failed to add subscription");
      }
    } catch {
      setError("Cannot connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={() => router.back()} iconColor="#F5F5F5" />
        <Appbar.Content title="New Subscription" titleStyle={styles.appbarTitle} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.form}>
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TextInput
          mode="outlined"
          label="Service name"
          placeholder="e.g. Netflix"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          style={styles.input}
        />

        <TextInput
          mode="outlined"
          label="Monthly price"
          value={price}
          onChangeText={setPrice}
          keyboardType="decimal-pad"
          style={styles.input}
          left={<TextInput.Affix text="$" />}
        />

        <TextInput
          mode="outlined"
          label="Category (optional)"
          placeholder="e.g. Entertainment"
          value={category}
          onChangeText={setCategory}
          autoCapitalize="words"
          style={styles.input}
        />

        <Text style={styles.label}>Billing Cycle</Text>
        <SegmentedButtons
          value={billingCycle}
          onValueChange={setBillingCycle}
          buttons={[
            { value: "monthly", label: "Monthly" },
            { value: "yearly", label: "Yearly" },
          ]}
          style={styles.segmented}
        />

        <Button
          mode="contained"
          onPress={handleAdd}
          loading={loading}
          disabled={loading}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          Add Subscription
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0D0D" },
  appbar: { backgroundColor: "#0D0D0D" },
  appbarTitle: { color: "#F5F5F5", fontWeight: "bold" },
  form: { padding: 24 },
  error: { color: "#FF453A", marginBottom: 16, textAlign: "center" },
  input: { marginBottom: 16, backgroundColor: "#1A1A1A" },
  label: { color: "#888888", fontSize: 12, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 },
  segmented: { marginBottom: 32 },
  button: { marginTop: 8 },
  buttonContent: { paddingVertical: 6 },
});
