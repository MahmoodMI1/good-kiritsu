import { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://localhost:8080";

interface Subscription {
  id: number;
  name: string;
  cost: number;
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

      const subsData = await subsRes.json();
      const totalData = await totalRes.json();
      setSubscriptions(subsData);
      setTotal(totalData);
    } catch (error) {
      Alert.alert("Error", "Cannot connect to server");
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const handleDelete = async (id: number) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await fetch(`${API_URL}/api/subscriptions/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        fetchData();
      } else {
        Alert.alert("Error", "Failed to delete");
      }
    } catch (error) {
      Alert.alert("Error", "Cannot connect to server");
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("authToken");
    router.replace("/login");
  };

  const renderItem = ({ item }: { item: Subscription }) => (
    <View style={styles.card}>
      <View style={styles.cardInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.cost}/mo</Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Text style={styles.delete}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/about")}>
          <Text style={styles.headerLink}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.headerLink}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.total}>Monthly Total: ${total.toFixed(2)}</Text>

      <FlatList
        data={subscriptions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No subscriptions yet</Text>}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => router.push("/add")}>
        <Text style={styles.addButtonText}>+ Add Subscription</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 8 },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16 },
  headerLink: { color: "#007AFF", fontSize: 16 },
  total: { fontSize: 22, fontWeight: "bold", marginBottom: 16, textAlign: "center" },
  card: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, backgroundColor: "#f9f9f9", borderRadius: 8, marginBottom: 8 },
  cardInfo: { flex: 1 },
  name: { fontSize: 16, fontWeight: "600" },
  price: { fontSize: 14, color: "#666", marginTop: 4 },
  delete: { color: "#FF3B30", fontSize: 14, fontWeight: "600" },
  empty: { textAlign: "center", color: "#999", marginTop: 32, fontSize: 16 },
  addButton: { backgroundColor: "#007AFF", padding: 16, borderRadius: 8, alignItems: "center", marginTop: 16 },
  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});