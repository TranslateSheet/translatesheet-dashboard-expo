import { useSession } from "@/providers/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const useSubscriptionStatus = () => {
  const { session } = useSession();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user) return;

    const fetchStatus = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("subscription_status, current_period_end")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("Error fetching subscription status:", error);
      } else {
        const { subscription_status, current_period_end } = data;
        const currentDate = new Date();
        const periodEndDate = new Date(current_period_end ?? "");

        const active =
          subscription_status === "active" ||
          (subscription_status === "canceled" && periodEndDate >= currentDate);
        setIsActive(active);
        setSubscriptionStatus(subscription_status);
      }
      setLoading(false);
    };

    fetchStatus();
  }, [session?.user]);

  return { isActive, subscriptionStatus, loading };
};

export default useSubscriptionStatus;
