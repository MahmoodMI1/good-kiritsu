import { Stack } from "expo-router";
import { View, StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { theme } from "@/constants/theme";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <View style={styles.outer}>
          <View style={styles.inner}>
            <Stack screenOptions={{ headerShown: false }} />
          </View>
        </View>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  outer: { flex: 1, alignItems: "center", backgroundColor: "#0D0D0D" },
  inner: { flex: 1, width: "100%", maxWidth: 430 },
});
