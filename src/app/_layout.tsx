import { Slot } from "expo-router";
import "../../global.css";
import { HeroUIProvider } from "@heroui/react";

export default function Root() {
  return (
    <HeroUIProvider>
      <Slot />
    </HeroUIProvider>
  );
}
