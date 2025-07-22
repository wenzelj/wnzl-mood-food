import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="suggestions" options={{ title: "Suggestions" }} />
      <Stack.Screen name="recipe" options={{ title: 'Recipe' }} />
    </Stack>
  );
}
