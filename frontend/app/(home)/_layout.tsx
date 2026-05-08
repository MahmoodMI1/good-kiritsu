import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "My Subscriptions" }} />
      <Stack.Screen name="add" options={{ title: "Add Subscription" }} />
      <Stack.Screen name="about" options={{ title: "About" }} />
    </Stack>
  );
}