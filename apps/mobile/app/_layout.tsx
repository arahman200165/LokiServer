import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#111827" },
        headerTintColor: "#fff",
        contentStyle: { backgroundColor: "#0f172a" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Loki" }} />
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="chat" options={{ title: "Chats" }} />
    </Stack>
  );
}
