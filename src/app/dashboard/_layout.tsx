import { SessionProvider } from "@/providers/AuthContext";
import { Slot } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { View, useWindowDimensions } from "react-native";

const queryClient = new QueryClient();

export default function DashboardLayout() {
  const { height: windowHeight } = useWindowDimensions();
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <View style={{ minHeight: windowHeight }}>
          <Slot />
        </View>
      </SessionProvider>
    </QueryClientProvider>
  );
}
