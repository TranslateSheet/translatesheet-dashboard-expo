import "../../global.css";

import { SessionProvider } from "@/providers/AuthContext";
import { Slot } from "expo-router";

export default function Root() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
