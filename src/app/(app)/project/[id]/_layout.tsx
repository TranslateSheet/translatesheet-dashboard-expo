import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { Drawer } from "expo-router/drawer";
// import { HeroUIProvider } from "@heroui/react";
import { Text } from "react-native";

import { useColorScheme } from "@/hooks/useColorScheme";
import { CustomDrawerContent } from "@/components/navigation/CustomDrawerContent";
import { useSession } from "@/providers/AuthContext";
import { Redirect } from "expo-router";
import { useIsDesktop } from "@/hooks/useIsDesktop";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function ProjectLayout() {
  const colorScheme = useColorScheme();
  const isDesktop = useIsDesktop();
  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });
  const { session, isLoading: isSessionLoading } = useSession();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isSessionLoading || !loaded) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Drawer
        screenOptions={{
          drawerType: isDesktop ? "permanent" : "front",
          headerShown: false,
          drawerStyle: {
            width: 290,
            padding: 16,
          },
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name='index'
          options={{
            drawerLabel: "Translations",
          }}
        />
        <Drawer.Screen
          name="api-keys"
          options={{
            drawerLabel: "API Keys",
          }}
        />
        <Drawer.Screen
          name="project-members"
          options={{
            drawerLabel: "Project Members",
          }}
        />
      </Drawer>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
