import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { UserProfileRow } from "./types";
import { useSession } from "@/providers/AuthContext";

const useGetUserProfile = () => {
  const { session } = useSession();
  const [userProfile, setUserProfile] = useState<UserProfileRow | null>(null);

  useEffect(() => {
    const getUserProfile = async () => {
      if (!session) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user?.id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      setUserProfile(data);
    };
    getUserProfile();
  }, [session]);

  return userProfile;
};

export default useGetUserProfile;
