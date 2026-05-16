import { useCallback, useState } from "react";
import { View, FlatList, StyleSheet, Alert } from "react-native";
import { Text, Card, IconButton, FAB, Appbar, Surface } from "react-native-paper";
import { useRouter, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@/constants/api";

interface Subscription {
  id: number;
  name: string;
  cost: number;
  category?: string;
  billingCycle?: string;
}

export default function HomeScreen() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const [subsRes, totalRes] = await Promise.all([
        fetch(`${API_URL}/api/subscriptions`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_URL}/api/subscriptions/total`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (!subsRes.ok || !totalRes.ok) {
        Alert.alert("Error", "Failed to load data");
        return;
      }

      setSubscriptions(await subsRes.json());
      setTotal(await totalRes.json());
    } catch {
      Alert.alert("Error", "Cannot connect to server");
    }
  };

  useFocusEffect(useCallback(() => { fetchData(); }, []));

  const handleDelete = async (id: number) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await fetch(`${API_URL}/api/subscriptions/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) fetchData();
      else Alert.alert("Error", "Failed to delete");
    } catch {
      Alert.alert("Error", "Cannot connect to server");
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("authToken");
    router.replace("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content title="My Subscriptions" titleStyle={styles.appbarTitle} />
        <Appbar.Action icon="information-outline" onPress={() => router.push("/about")} iconColor="#F5F5F5" />
        <Appbar.Action icon="logout" onPress={handleLogout} iconColor="#F5F5F5" />
      </Appbar.Header>

      <Surface style={styles.totalCard} elevation={0}>
        <Text style={styles.totalLabel}>Monthly Total</Text>
        <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
      </Surface>

      <FlatList
        data={subscriptions}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.cardLeft}>
                <Text style={styles.cardName}>{item.name}</Text>
                {item.category ? (
                  <Text style={styles.cardCategory}>{item.category}</Text>
                ) : null}
              </View>
              <View style={styles.cardRight}>
                <Text style={styles.cardPrice}>${item.cost.toFixed(2)}/mo</Text>
                <IconButton
                  icon="trash-can-outline"
                  iconColor="#FF453A"
                  size={20}
                  onPress={() => handleDelete(item.id)}
                  style={styles.deleteButton}
                />
              </View>
            </Card.Content>
          </Card>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No subscriptions yet. Tap + to add one.</Text>
        }
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push("/add")}
        color="#000000"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0D0D" },
  appbar: { backgroundColor: "#0D0D0D" },
  appbarTitle: { color: "#F5F5F5", fontWeight: "bold" },
  totalCard: {
    margin: 16,
    padding: 24,
    borderRadius: 16,
    backgroundColor: "#1A1A1A",
    alignItems: "center",
  },
  totalLabel: { color: "#888888", fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 },
  totalAmount: { color: "#00C853", fontSize: 40, fontWeight: "bold" },
  list: { paddingHorizontal: 16, paddingBottom: 100 },
  card: { marginBottom: 10, backgroundColor: "#1A1A1A" },
  cardContent: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 4 },
  cardLeft: { flex: 1 },
  cardName: { color: "#F5F5F5", fontSize: 16, fontWeight: "600" },
  cardCategory: { color: "#888888", fontSize: 13, marginTop: 2, textTransform: "capitalize" },
  cardRight: { flexDirection: "row", alignItems: "center" },
  cardPrice: { color: "#00C853", fontSize: 15, fontWeight: "600" },
  deleteButton: { margin: 0, marginLeft: 4 },
  empty: { color: "#888888", textAlign: "center", marginTop: 48, fontSize: 15 },
  fab: { position: "absolute", right: 20, bottom: 28, backgroundColor: "#00C853" },
});
