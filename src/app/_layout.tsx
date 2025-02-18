import { Slot } from "expo-router";
import "../../global.css";
import { HeroUIProvider, Spinner } from "@heroui/react";
import { View, useWindowDimensions } from "react-native";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { initI18n } from "@/i18n/initI18n";

export default function Root() {
  const { height: windowHeight } = useWindowDimensions();
  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
    Urbanist: require("@/assets/fonts/Urbanist-VariableFont_wght.ttf"),
  });

  useEffect(() => {
    initI18n();
  }, []);

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (!loaded) {
    return <Spinner />;
  }

  return <Slot />;
}
