import { useEffect } from "react";
import { useRouter } from "expo-router";
import { supabase } from "../../../lib/supabase";
import { View } from "react-native";
import { Spinner } from "@heroui/react";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthRedirect = async () => {
      console.log("Processing auth callback...");

      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");

      if (!code) {
        console.error("No code found in URL!");
        return router.push("/dashboard/sign-in");
      }

      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("Error exchanging code for session:", error);
        router.push("/dashboard/sign-in");
      } else {
        console.log("Session established", data);
        router.push("/dashboard");
      }
    };

    handleAuthRedirect();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Spinner color="primary" label="Loading" labelColor="primary" />
    </View>
  );
}
