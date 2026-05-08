import { View, Text, StyleSheet } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Good-Kiritsu</Text>
      <Text style={styles.text}>Your subscription tracker.</Text>
      <Text style={styles.text}>Version 1.0 — More features coming soon.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 16 },
  text: { fontSize: 16, color: "#666", marginBottom: 8, textAlign: "center" },
});