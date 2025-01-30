import { useSession } from "@/providers/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const useSubscriptionStatus = () => {
  const { session } = useSession();
  const [status, setStatus] = useState<string | null>(null);
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
        setStatus(data.subscription_status);
      }
      setLoading(false);
    };

    fetchStatus();
  }, [session?.user]);

  return { status, loading };
};

export default useSubscriptionStatus;
