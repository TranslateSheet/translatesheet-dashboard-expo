import "../../global.css";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { HeroUIProvider } from "@heroui/react";

import { useColorScheme } from "@/hooks/useColorScheme";
import { useWindowDimensions } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const dimensions = useWindowDimensions();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <HeroUIProvider style={{ flex: 1 }}>
          <Drawer
            screenOptions={{
              drawerType: dimensions.width >= 768 ? "permanent" : "front",
            }}
          >
            <Drawer.Screen
              name="index" // This is the name of the page and must match the url from root
              options={{
                drawerLabel: "Home",
                title: "overview",
              }}
            />
            <Drawer.Screen
              name="explore" // This is the name of the page and must match the url from root
              options={{
                drawerLabel: "Explore",
                title: "Explore",
              }}
            />
          </Drawer>
          <StatusBar style="auto" />
        </HeroUIProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
