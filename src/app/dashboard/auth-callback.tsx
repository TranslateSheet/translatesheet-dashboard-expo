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

      // Extract parameters from URL hash
      const url = new URL(window.location.href);
      const hashParams = new URLSearchParams(url.hash.substring(1));

      const accessToken = hashParams.get("access_token");
      const refreshToken = hashParams.get("refresh_token");

      if (!accessToken) {
        console.error("No access token found in URL!");
        return router.push("/dashboard/sign-in");
      }

      // 🔥 Manually set the Supabase session
      const { data, error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken ?? "", // May be null
      });

      if (error) {
        console.error("Error setting session:", error);
      } else {
        router.push("/dashboard");
      }
    };

    handleAuthRedirect();
  }, []);

  // TODO: Add a loading spinner
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Spinner color="primary" label="Loading" labelColor="primary" />
    </View>
  );
}
