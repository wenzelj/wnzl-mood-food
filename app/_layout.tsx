import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* <Stack.Screen name="welcome" options={{ headerShown: false }} /> */}
      <Stack.Screen name="index" options={{  headerShown: false }} />
      <Stack.Screen name="suggestions" options={{ title: "Suggestions" }} />
       <Stack.Screen name="home" options={{ title: "Home" }} />
         <Stack.Screen name="meal" options={{ title: 'Meals' }} />
      <Stack.Screen name="recipe" options={{ title: 'Recipe' }} />
    </Stack>
  );
}
