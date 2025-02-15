import { Slot } from "expo-router";
import "../../global.css";
import { HeroUIProvider } from "@heroui/react";
import { View, useWindowDimensions } from "react-native";

export default function Root() {
  const { height: windowHeight } = useWindowDimensions();
  return (
    <HeroUIProvider>
      <View style={{ minHeight: windowHeight }}>
        <Slot />
      </View>
    </HeroUIProvider>
  );
}
