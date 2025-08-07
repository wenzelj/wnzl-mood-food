import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HeaderRight = () => {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push("/search")}>
      <Ionicons
        name="search"
        size={24}
        color="black"
        style={{ marginRight: 15 }}
      />
    </TouchableOpacity>
  );
};

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerRight: () => <HeaderRight />,
        }}
      />
      <Stack.Screen name="suggestions" options={{ title: "Suggestions" }} />
      <Stack.Screen name="meal" options={{ title: "Meals" }} />
      <Stack.Screen name="recipe" options={{ title: "Recipe" }} />
      <Stack.Screen name="search" options={{ title: "Search" }} />
    </Stack>
  );
}
