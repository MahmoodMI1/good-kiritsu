import { View, StyleSheet } from "react-native";
import { Text, Appbar } from "react-native-paper";
import { useRouter } from "expo-router";

export default function AboutScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={() => router.back()} iconColor="#F5F5F5" />
        <Appbar.Content title="About" titleStyle={styles.appbarTitle} />
      </Appbar.Header>

      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>Good-Kiritsu</Text>
        <Text style={styles.text}>Your subscription tracker.</Text>
        <Text style={styles.text}>Version 1.0 — More features coming soon.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0D0D" },
  appbar: { backgroundColor: "#0D0D0D" },
  appbarTitle: { color: "#F5F5F5", fontWeight: "bold" },
  content: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  title: { color: "#00C853", fontWeight: "bold", marginBottom: 16 },
  text: { color: "#888888", fontSize: 16, marginBottom: 8, textAlign: "center" },
});
