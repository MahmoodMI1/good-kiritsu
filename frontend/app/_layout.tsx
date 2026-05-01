import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{headerShown: false }}>
      <Stack.Screen name="login" options={{ headerTitle: "Subscriptions" }} />
      <Stack.Screen name="home" options={{ headerTitle: "About" }} />
    </Stack>
  );
}